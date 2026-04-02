import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FiPlus, FiTrash2, FiPlusSquare } from 'react-icons/fi';
import ReusableModal from "../Modal/Modal";
import AttributeForm from "./AttributeForm";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  usedIn: z.array(z.string()).min(1, "Select at least one usage type"),
  attributes: z.array(z.string()).optional().default([]),
  steps: z.array(z.object({
    attributeId: z.string().min(1, "Attribute is required"),
    isRequired: z.boolean().default(false),
    order: z.number().min(1, "Order must be at least 1")
  })).optional().default([])
}).refine((data) => {
  if (data.usedIn.includes("studio") && (!data.steps || data.steps.length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Studio configuration requires at least one step",
  path: ["steps"]
});

const CategoryForm = ({ initialData, attributesList = [], onSubmit, onCancel, onAddNewAttribute }) => {
  const [isAttrModalOpen, setIsAttrModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      usedIn: ['celebration'],
      attributes: [],
      steps: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps"
  });

  const nameValue = watch("name");
  const usedInValue = watch("usedIn") || [];
  const selectedAttributes = watch("attributes") || [];
  const isStudioSelected = usedInValue.includes("studio");

  // Slug generation
  useEffect(() => {
    if (nameValue && !initialData) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-0]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [nameValue, setValue, initialData]);

  // Filter attributes for steps based on selected attributes
  const availableAttrForSteps = attributesList.filter(attr => selectedAttributes.includes(attr._id || attr.id));

  const handleCreateAttributeInline = (newAttr) => {
    onAddNewAttribute(newAttr);
    setIsAttrModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name*</label>
            <input
              {...register("name")}
              className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
              placeholder="e.g. Birthday"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug*</label>
            <input
              {...register("slug")}
              className={`mt-1 block w-full border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
              placeholder="e.g. birthday"
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Used In*</label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="celebration" {...register("usedIn")} className="rounded text-blue-600 shadow-sm" />
              <span>Celebration</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="studio" {...register("usedIn")} className="rounded text-blue-600 shadow-sm" />
              <span>Studio</span>
            </label>
          </div>
          {errors.usedIn && <p className="text-red-500 text-xs mt-1">{errors.usedIn.message}</p>}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">Assign Attributes</label>
            <button
              type="button"
              onClick={() => setIsAttrModalOpen(true)}
              className="flex items-center text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100"
            >
              <FiPlusSquare className="mr-1" /> Create New Attribute
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded border border-gray-200 h-32 overflow-y-auto">
            {attributesList.map(attr => (
              <label key={attr._id || attr.id} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  value={attr._id || attr.id}
                  {...register("attributes")}
                  className="rounded text-blue-600"
                />
                <span className="truncate">{attr.name}</span>
              </label>
            ))}
            {attributesList.length === 0 && <p className="text-gray-400 text-xs italic">No attributes found</p>}
          </div>
        </div>

        {/* Studio Configuration (Conditional) */}
        {isStudioSelected && (
          <div className="p-4 bg-blue-50/50 rounded-lg border-2 border-blue-100 space-y-4">
            <div className="flex justify-between items-center border-b border-blue-200 pb-2">
              <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider">Studio Config: Steps</h3>
              <button
                type="button"
                onClick={() => append({ attributeId: '', isRequired: false, order: fields.length + 1 })}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center shadow-sm"
              >
                <FiPlus className="mr-1" /> Add Step
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-wrap items-end gap-3 bg-white p-3 rounded border border-blue-200 shadow-sm">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Attribute</label>
                    <select
                      {...register(`steps.${index}.attributeId`)}
                      className="w-full text-sm border-gray-200 rounded p-2 focus:ring-blue-500"
                    >
                      <option value="">Select Attribute</option>
                      {availableAttrForSteps.map(attr => (
                        <option key={attr._id || attr.id} value={attr._id || attr.id}>
                          {attr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-16">
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Order</label>
                    <input
                      type="number"
                      {...register(`steps.${index}.order`, { valueAsNumber: true })}
                      className="w-full text-sm border-gray-200 rounded p-2 focus:ring-blue-500"
                    />
                  </div>
                  <label className="flex items-center space-x-1 py-3">
                    <input
                      type="checkbox"
                      {...register(`steps.${index}.isRequired`)}
                      className="rounded text-blue-600 shadow-sm h-4 w-4"
                    />
                    <span className="text-xs font-medium text-gray-600 italic">Required</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-400 hover:text-red-600 p-2 mb-1"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
              {fields.length === 0 && <p className="text-center text-xs text-blue-400 italic">No studio steps defined yet.</p>}
            </div>
            {errors.steps && <p className="text-red-500 text-xs font-bold">{errors.steps.message}</p>}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary !w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary !w-auto px-10"
          >
            {initialData ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </form>

      {/* Inline Attribute Creation Modal */}
      <ReusableModal open={isAttrModalOpen} onClose={() => setIsAttrModalOpen(false)} width="50%">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-primary">Create New Attribute</h2>
          <AttributeForm 
            onSubmit={handleCreateAttributeInline} 
            onCancel={() => setIsAttrModalOpen(false)} 
          />
        </div>
      </ReusableModal>
    </div>
  );
};

export default CategoryForm;
