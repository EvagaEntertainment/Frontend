import React, { useState, useEffect } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import ReusableModal from "../Modal/Modal";
import { toast } from "react-toastify";
import DeleteForm from "./DeleteForm";
import CategoryForm from "./CategoryForm";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [attributesList, setAttributesList] = useState([
    { id: "1", name: "Color" },
    { id: "2", name: "Size" },
    { id: "3", name: "Material" },
    { id: "4", name: "Occasion" }
  ]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data fetching for now
  const fetchCategories = async () => {
    const mockData = [
      { 
        _id: "c1", 
        name: "Birthday Packages", 
        slug: "birthday-packages", 
        usedIn: ["celebration", "studio"],
        attributes: ["1", "2"],
        steps: [
          { attributeId: "1", isRequired: true, order: 1 },
          { attributeId: "2", isRequired: false, order: 2 }
        ]
      },
      { 
        _id: "c2", 
        name: "Wedding Special", 
        slug: "wedding-special", 
        usedIn: ["celebration"],
        attributes: ["3"],
        steps: []
      },
    ];
    setCategories(mockData);
    setTotalPages(1);
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const handleOpenModal = (type, data = null) => {
    setModalType(type);
    setSelectedCategory(data);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedCategory(null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (modalType === "create") {
        console.log("FINAL CATEGORY CREATE PAYLOAD (JSON):", JSON.stringify(data, null, 2));
        toast.success("Category created successfully (Mock Check Console)");
      } else if (modalType === "edit") {
        console.log("FINAL CATEGORY UPDATE PAYLOAD (JSON):", JSON.stringify({id: selectedCategory._id, ...data}, null, 2));
        toast.success("Category updated successfully (Mock Check Console)");
      }
      handleCloseModal();
      fetchCategories();
    } catch (error) {
      toast.error("Process failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    console.log("DELETING CATEGORY ID:", selectedCategory._id);
    toast.success("Category deleted successfully (Mock)");
    handleCloseModal();
    fetchCategories();
  };

  const handleAddNewAttribute = (newAttr) => {
    console.log("New Attribute Created Inline:", newAttr);
    const mockNewAttr = { id: Date.now().toString(), name: newAttr.name };
    setAttributesList(prev => [...prev, mockNewAttr]);
    toast.info(`Attribute "${newAttr.name}" added to list for selection.`);
  };

  const columns = [
    { label: "S.No", render: (_, index) => (page - 1) * 10 + index + 1 },
    { label: "Name", key: "name" },
    { label: "Slug", key: "slug" },
    { label: "Used In", render: (row) => row.usedIn.join(", ") },
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
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Catalog: Categories</h2>
        <button
          onClick={() => handleOpenModal("create")}
          className="btn-primary !w-auto px-6"
        >
          + Create Category
        </button>
      </div>

      <TableComponetWithApi
        columns={columns}
        data={categories}
        page={page}
        totalPages={totalPages}
        onPageChange={(_, value) => setPage(value)}
      />

      <ReusableModal open={!!modalType} onClose={handleCloseModal} width={modalType === "delete" ? "30%" : "60%"}>
        <div className="p-6">
          {modalType === "delete" ? (
            <DeleteForm onDelete={handleDelete} deleteText="Category" />
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-primary uppercase tracking-tighter">
                {modalType} Category
              </h2>
              <CategoryForm 
                initialData={selectedCategory} 
                attributesList={attributesList}
                onSubmit={onSubmit} 
                onCancel={handleCloseModal}
                onAddNewAttribute={handleAddNewAttribute}
              />
            </>
          )}
        </div>
      </ReusableModal>
    </div>
  );
};

export default AdminCategories;
