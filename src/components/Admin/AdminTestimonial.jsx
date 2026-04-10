import React, { useCallback, useEffect, useState } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import ReusableModal from "../Modal/Modal";
import DeleteForm from "./DeleteForm";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useServices from "../../hooks/useServices";
import commonApis from "../../services/commonApis";

function AdminTestimonial() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("addTestimonial");
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [testimonials, setTestimonials] = useState([]);

    const getAllTestimonialsApi = useServices(commonApis.getAllTestimonials);
    const createTestimonialApi = useServices(commonApis.createTestimonial);
    const getOneTestimonialApi = useServices(commonApis.getOneTestimonial);
    const updateTestimonialApi = useServices(commonApis.updateTestimonial);
    const deleteTestimonialApi = useServices(commonApis.deleteTestimonial);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditingTestimonial(null);
        setImagePreview(null);
        setImageFile(null);
        reset();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const fetchAllTestimonials = async () => {
        const queryParams = {
            page: page || 1,
        };
        const response = await getAllTestimonialsApi.callApi(queryParams);
        // The API returns { testimonials: [...], currentPage: 1, totalPages: 1, totalCount: 2 }
        setTestimonials(response ? response.testimonials : []);
        setTotalPages(response ? response.totalPages : 1);
    };

    useEffect(() => {
        fetchAllTestimonials();
    }, [page]);

    const handleEditClick = useCallback(async (row) => {
        const response = await getOneTestimonialApi.callApi(row._id);
        const data = response?.data || response;
        setEditingTestimonial(data);
        setValue("name", data.name);
        setValue("title", data.title);
        setValue("testimonial", data.testimonial);
        setValue("status", String(data.status));
        if (data.image) {
            setImagePreview(
                data.image.startsWith("http")
                    ? data.image
                    : process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + data.image
            );
        }
        setModalType("editTestimonial");
        handleOpen();
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("title", data.title);
        formData.append("testimonial", data.testimonial);
        formData.append("status", data.status);
        if (imageFile) {
            formData.append("testimonial", imageFile);
        }

        if (modalType === "editTestimonial" && editingTestimonial) {
            const response = await updateTestimonialApi.callApi(
                editingTestimonial._id,
                formData
            );
            if (response) {
                toast.success(response?.message || "Testimonial updated successfully!");
                fetchAllTestimonials();
            }
        } else {
            const response = await createTestimonialApi.callApi(formData);
            if (response) {
                toast.success(response?.message || "Testimonial added successfully!");
                fetchAllTestimonials();
            }
        }
        handleClose();
    };

    const deleteTestimonialHandle = async () => {
        const response = await deleteTestimonialApi.callApi(deleteId);
        if (response) {
            toast.success(response?.message || "Testimonial deleted successfully!");
            fetchAllTestimonials();
        }
        handleClose();
        setDeleteId(null);
    };

    const columns = [
        { label: "No", key: "index", render: (_, i) => (page - 1) * 10 + i + 1 },
        {
            label: "Image",
            key: "image",
            render: (row) =>
                row.image ? (
                    <img
                        src={
                            row.image.startsWith("http")
                                ? row.image
                                : process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + row.image
                        }
                        alt={row.name}
                        className="h-[3rem] w-[3rem] object-cover rounded-full mx-auto"
                    />
                ) : (
                    "N/A"
                ),
        },
        { label: "Name", key: "name" },
        { label: "Title", key: "title" },
        {
            label: "Testimonial",
            key: "testimonial",
            render: (row) => (
                <p className="truncate max-w-[250px]" title={row.testimonial}>
                    {row.testimonial}
                </p>
            ),
        },
        {
            label: "Status",
            key: "status",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded text-sm font-medium ${row.status === true
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {row.status === true ? "Published" : "Unpublished"}
                </span>
            ),
        },
        {
            label: "Action",
            key: "action",
            render: (row) => (
                <div className="flex items-center justify-center gap-2">
                    <CiEdit
                        className="text-3xl font-semibold cursor-pointer text-textGray"
                        onClick={() => handleEditClick(row)}
                    />
                    <MdOutlineDelete
                        className="text-3xl font-semibold cursor-pointer text-textGray"
                        onClick={() => [
                            handleOpen(),
                            setModalType("deleteTestimonial"),
                            setDeleteId(row._id),
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Testimonials</h2>
                <button
                    onClick={() => [
                        handleOpen(),
                        setModalType("addTestimonial"),
                        reset(),
                        setImagePreview(null),
                        setImageFile(null),
                    ]}
                    className="btn-primary w-fit px-2"
                >
                    Add Testimonial
                </button>
            </div>
            <TableComponetWithApi
                columns={columns}
                data={testimonials}
                page={page}
                itemsPerPage={10}
                onPageChange={handlePageChange}
                totalPages={totalPages}
            />
            <ReusableModal
                open={open}
                onClose={handleClose}
                title={
                    modalType === "addTestimonial"
                        ? "Add Testimonial"
                        : modalType === "editTestimonial"
                            ? "Edit Testimonial"
                            : modalType === "deleteTestimonial"
                                ? "Delete Testimonial"
                                : "Testimonial"
                }
                width={"50%"}
            >
                {(modalType === "addTestimonial" ||
                    modalType === "editTestimonial") && (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview?.src || imagePreview}
                                        alt="Preview"
                                        className="mt-2 h-20 w-20 object-cover rounded-full border border-gray-300"
                                    />
                                )}
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Enter customer name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Title is required" })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="E.g. Event Planner, Corporate Client"
                                />
                                {errors.title && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Testimonial Text */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Testimonial
                                </label>
                                <textarea
                                    rows={4}
                                    {...register("testimonial", {
                                        required: "Testimonial text is required",
                                    })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                                    placeholder="Enter the testimonial"
                                />
                                {errors.testimonial && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.testimonial.message}
                                    </p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    {...register("status", { required: "Status is required" })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                >
                                    <option value="">Select status</option>
                                    <option value="true">Publish</option>
                                    <option value="false">Unpublish</option>
                                </select>
                                {errors.status && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.status.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={createTestimonialApi.loading || updateTestimonialApi.loading}
                                className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all ${createTestimonialApi.loading || updateTestimonialApi.loading
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:bg-purple-700"
                                    }`}
                            >
                                {createTestimonialApi.loading || updateTestimonialApi.loading
                                    ? "Saving..."
                                    : modalType === "editTestimonial"
                                        ? "Update Testimonial"
                                        : "Add Testimonial"}
                            </button>
                        </form>
                    )}
                {modalType === "deleteTestimonial" && (
                    <DeleteForm
                        onDelete={deleteTestimonialHandle}
                        deleteText="Testimonial"
                    />
                )}
            </ReusableModal>
        </div>
    );
}

export default AdminTestimonial;
