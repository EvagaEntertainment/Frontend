import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete, MdOutlineVisibility, MdDownload } from "react-icons/md";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { toast } from "react-toastify";
import DeleteForm from "./DeleteForm";

function AdminGenerateQR() {
  const [page, setPage] = useState(1);
  const [allQR, setAllQR] = useState([]);
  const [oneQRId, setOneQRId] = useState(null);
  const [selectedQR, setSelectedQR] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [modalType, setModalType] = useState("addqr");
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const getAllQRApi = useServices(adminActionsApi.getAllQRs);
  const getOneQRApi = useServices(adminActionsApi.getOneQR);
  const createQRApi = useServices(adminActionsApi.createQR);
  const updateQRApi = useServices(adminActionsApi.updateQR);
  const deleteQRApi = useServices(adminActionsApi.deleteQR);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
    setOneQRId(null);
    setSelectedQR(null);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchQRs = async () => {
    try {
      const response = await getAllQRApi.callApi({ page });
      // Adjust according to actual backend response structure
      setAllQR(response?.data || response?.qrs || []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching QRs:", error);
      toast.error("Failed to fetch QR codes");
    }
  };

  useEffect(() => {
    fetchQRs();
  }, [page]);

  const handleAddQR = async (data) => {
    try {
      await createQRApi.callApi(data);
      toast.success("QR Code generated successfully!");
      handleClose();
      fetchQRs();
    } catch (error) {
      console.error("Error creating QR:", error);
      toast.error("Failed to generate QR code");
    }
  };

  const handleUpdateQR = async (data) => {
    try {
      await updateQRApi.callApi(oneQRId, data);
      toast.success("QR Code updated successfully!");
      handleClose();
      fetchQRs();
    } catch (error) {
      console.error("Error updating QR:", error);
      toast.error("Failed to update QR code");
    }
  };

  const handleDeleteQR = async () => {
    try {
      await deleteQRApi.callApi(oneQRId);
      toast.success("QR Code deleted successfully!");
      handleClose();
      fetchQRs();
    } catch (error) {
      console.error("Error deleting QR:", error);
      toast.error("Failed to delete QR code");
    }
  };

  const handleView = async (id) => {
    try {
      const response = await getOneQRApi.callApi(id);
      // Backend might return {qr: {...}} or {data: {...}} or the object itself
      const qrData = response?.qr || response?.data || response;
      setSelectedQR(qrData);
      setModalType("viewqr");
      handleOpen();
    } catch (error) {
      console.error("Error fetching QR details:", error);
      toast.error("Failed to fetch QR details");
    }
  };

  const handleEditClick = async (id) => {
    try {
      const response = await getOneQRApi.callApi(id);
      const qrData = response?.qr || response?.data || response;
      setOneQRId(id);
      setValue("title", qrData?.title);
      setValue("link", qrData?.link);
      setValue("color", qrData?.color || "#000000");
      setModalType("editqr");
      handleOpen();
    } catch (error) {
      console.error("Error fetching QR details:", error);
      toast.error("Failed to fetch QR details");
    }
  };

  const downloadQR = (url, filename) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { label: "No", key: "index", render: (_, i) => (page - 1) * 10 + i + 1 },
    { label: "Title", key: "title" },
    { label: "Link", key: "link", render: (row) => <span className="text-blue-500 underline truncate max-w-xs block">{row.link}</span> },
    {
      label: "Action",
      key: "actions",
      render: (row) => (
        <div className="flex items-center justify-center gap-3">
          <MdOutlineVisibility
            className="text-2xl cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={() => handleView(row._id || row.id)}
          />
          <CiEdit
            className="text-2xl cursor-pointer text-green-500 hover:text-green-700"
            onClick={() => handleEditClick(row._id || row.id)}
          />
          <MdOutlineDelete
            className="text-2xl cursor-pointer text-red-500 hover:text-red-700"
            onClick={() => {
              setOneQRId(row._id || row.id);
              setModalType("deleteqr");
              handleOpen();
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">QR Code Management</h2>
        <button
          onClick={() => {
            setModalType("addqr");
            handleOpen();
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all font-medium flex items-center gap-2"
        >
          Generate QR
        </button>
      </div>

      <TableComponetWithApi
        columns={columns}
        data={allQR}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      <ReusableModal open={open} onClose={handleClose} width={"50%"}>
        {(modalType === "addqr" || modalType === "editqr") && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {modalType === "addqr" ? "Generate New QR Code" : "Edit QR Code"}
            </h2>
            <form onSubmit={handleSubmit(modalType === "addqr" ? handleAddQR : handleUpdateQR)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                  placeholder="Enter QR title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Link / URL</label>
                <input
                  type="url"
                  {...register("link", { 
                    required: "URL is required",
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Please enter a valid URL"
                    }
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none"
                  placeholder="https://example.com"
                />
                {errors.link && <p className="text-red-500 text-xs mt-1">{errors.link.message}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">QR Code Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    {...register("color")}
                    defaultValue="#000000"
                    className="w-12 h-10 border-none cursor-pointer rounded-md overflow-hidden bg-transparent"
                  />
                  <span className="text-sm text-gray-500 italic">Select the color for your QR code</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-all font-bold"
              >
                {modalType === "addqr" ? "Generate" : "Update"}
              </button>
            </form>
          </div>
        )}

        {modalType === "viewqr" && selectedQR && (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">{selectedQR.title}</h2>
            <div className="bg-gray-100 p-8 rounded-lg mb-6 inline-block">
              {selectedQR.qrCode ? (
                <img 
                  src={selectedQR.qrCode} 
                  alt="QR Code" 
                  className="w-64 h-64 mx-auto shadow-md bg-white p-2"
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center text-gray-400 italic">
                  QR image will be generated by backend
                </div>
              )}
            </div>
            <div className="mb-6 flex justify-center items-center gap-4">
              <div className="text-left">
                <p className="text-gray-600 text-sm mb-1">Target Link:</p>
                <a 
                  href={selectedQR.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline break-all block max-w-xs"
                >
                  {selectedQR.link}
                </a>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm mb-1">Color:</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: selectedQR.color || "#000000" }}
                  ></div>
                  <span className="text-sm font-mono text-gray-700">{selectedQR.color || "#000000"}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => downloadQR(selectedQR.qrCode, `${selectedQR.title}-QR.png`)}
              className="flex items-center justify-center gap-2 mx-auto bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-all font-bold"
              disabled={!selectedQR.qrCode}
            >
              <MdDownload className="text-xl" />
              Download QR
            </button>
          </div>
        )}

        {modalType === "deleteqr" && (
          <DeleteForm onDelete={handleDeleteQR} deleteText={"QR Code"} />
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminGenerateQR;
