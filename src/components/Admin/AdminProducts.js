import React, { useState, useEffect } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import ReusableModal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DeleteForm from "./DeleteForm";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Mock data fetching for now
  const fetchProducts = async () => {
    // Replace with real API call later
    const mockData = [
      { _id: "1", name: "Premium Drone", price: "45000", category: "Electronics", status: "Active" },
      { _id: "2", name: "Silk Dress", price: "2500", category: "Clothing", status: "Active" },
    ];
    setProducts(mockData);
    setTotalPages(1);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setSelectedProduct(data);
    if (data) {
      setValue("name", data.name);
      setValue("price", data.price);
      setValue("category", data.category);
      setValue("status", data.status);
    } else {
      reset();
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    reset();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (modalType === "create") {
        console.log("Creating product:", data);
        toast.success("Product created successfully (Mock)");
      } else if (modalType === "edit") {
        console.log("Updating product:", selectedProduct._id, data);
        toast.success("Product updated successfully (Mock)");
      }
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      toast.error("Process failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    toast.success("Product deleted successfully (Mock)");
    handleCloseModal();
    fetchProducts();
  };

  const columns = [
    { label: "S.No", render: (_, index) => (page - 1) * 10 + index + 1 },
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Price", key: "price" },
    { label: "Status", key: "status" },
    {
      label: "Actions",
      render: (row) => (
        <div className="flex justify-center items-center gap-2">
          <CiViewBoard
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => handleOpenModal("view", row)}
          />
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => handleOpenModal("edit", row)}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-textGray"
            onClick={() => handleOpenModal("delete", row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary">Products</h2>
        <button
          onClick={() => handleOpenModal("create")}
          className="btn-primary !w-auto px-6"
        >
          + Add Product
        </button>
      </div>

      <TableComponetWithApi
        columns={columns}
        data={products}
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
      />

      <ReusableModal open={!!modalType} onClose={handleCloseModal} width={modalType === "delete" ? "30%" : "60%"}>
        <div className="p-6">
          {modalType === "delete" ? (
            <DeleteForm onDelete={handleDelete} deleteText="Product" />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-primary capitalize">
                {modalType} Product
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                    placeholder="Product Name"
                  />
                  {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <input
                    type="text"
                    {...register("category", { required: "Category is required" })}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                    placeholder="Category Name"
                  />
                  {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                  <input
                    type="number"
                    {...register("price", { required: "Price is required" })}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                    placeholder="Product Price"
                  />
                  {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price.message}</p>}
                </div>
                {modalType !== "view" && (
                  <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary !w-auto px-8 disabled:opacity-50"
                    >
                      {isSubmitting ? "Processing..." : modalType === "create" ? "Create" : "Save Changes"}
                    </button>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </ReusableModal>
    </div>
  );
};

export default AdminProducts;
