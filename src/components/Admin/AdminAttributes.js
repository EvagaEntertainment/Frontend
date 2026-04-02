import React, { useState, useEffect } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import ReusableModal from "../Modal/Modal";
import { toast } from "react-toastify";
import DeleteForm from "./DeleteForm";
import AttributeForm from "./AttributeForm";

const AdminAttributes = () => {
  const [attributes, setAttributes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data fetching for now
  const fetchAttributes = async () => {
    // Replace with real API call later
    const mockData = [
      {
        _id: "1",
        name: "Color",
        slug: "color",
        type: "select",
        values: [{ label: "Red", value: "red" }, { label: "Blue", value: "blue" }],
        isFilterable: true,
        isStudio: false,
        isActive: true
      },
      {
        _id: "2",
        name: "Size",
        slug: "size",
        type: "radio",
        values: [{ label: "S", value: "s" }, { label: "M", value: "m" }],
        isFilterable: false,
        isStudio: true,
        isActive: true
      },
    ];
    setAttributes(mockData);
    setTotalPages(1);
  };

  useEffect(() => {
    fetchAttributes();
  }, [page]);

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setSelectedAttribute(data);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedAttribute(null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (modalType === "create") {
        console.log("FINAL CREATE PAYLOAD (JSON):", JSON.stringify(data, null, 2));
        toast.success("Attribute created successfully (Mock Check Console)");
      } else if (modalType === "edit") {
        console.log("FINAL UPDATE PAYLOAD (JSON):", JSON.stringify({ id: selectedAttribute._id, ...data }, null, 2));
        toast.success("Attribute updated successfully (Mock Check Console)");
      }
      handleCloseModal();
      fetchAttributes();
    } catch (error) {
      toast.error("Process failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    console.log("DELETING ATTRIBUTE ID:", selectedAttribute._id);
    toast.success("Attribute deleted successfully (Mock)");
    handleCloseModal();
    fetchAttributes();
  };

  const columns = [
    { label: "S.No", render: (_, index) => (page - 1) * 10 + index + 1 },
    { label: "Attribute Name", key: "name" },
    { label: "Slug", key: "slug" },
    { label: "Type", key: "type" },
    { label: "Status", render: (row) => row.isActive ? "Active" : "Inactive" },
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
        <h2 className="text-2xl font-bold text-primary tracking-tight">Catalog: Attributes</h2>
        <button
          onClick={() => handleOpenModal("create")}
          className="btn-primary !w-auto px-6"
        >
          + Create Attribute
        </button>
      </div>

      <TableComponetWithApi
        columns={columns}
        data={attributes}
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
      />

      <ReusableModal open={!!modalType} onClose={handleCloseModal} width={modalType === "delete" ? "30%" : "60%"}>
        <div className="p-6">
          {modalType === "delete" ? (
            <DeleteForm onDelete={handleDelete} deleteText="Attribute" />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-primary">
                {modalType} Attribute
              </h2>
              <AttributeForm
                initialData={selectedAttribute}
                onSubmit={onSubmit}
                onCancel={handleCloseModal}
                isViewOnly={modalType === "view"}
              />
            </>
          )}
        </div>
      </ReusableModal>
    </div>
  );
};

export default AdminAttributes;
