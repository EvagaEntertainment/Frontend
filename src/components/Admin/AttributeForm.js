import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const attributeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.enum(["select", "multi-select", "radio", "checkbox"], {
    errorMap: () => ({ message: "Please select a type" }),
  }),
  values: z.array(z.object({
    label: z.string().min(1, "Label is required"),
    value: z.string().min(1, "Value is required"),
  })).min(1, "At least one value is required"),
  isFilterable: z.boolean().default(false),
  isStudio: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

const AttributeForm = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(attributeSchema),
    defaultValues: initialData || {
      name: '',
      slug: '',
      type: 'select',
      values: [{ label: '', value: '' }],
      isFilterable: false,
      isStudio: false,
      isActive: true,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values"
  });

  const nameValue = watch("name");
  const valuesArray = watch("values");

  // Slug auto-generation from name
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

  // Handle value generation from label for each item in the array
  const handleLabelChange = (index, label) => {
    const value = label
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');
    setValue(`values.${index}.value`, value, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name*</label>
          <input
            {...register("name")}
            className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g. Size"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug*</label>
          <input
            {...register("slug")}
            className={`mt-1 block w-full border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="e.g. size"
          />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Type*</label>
          <select
            {...register("type")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="select">Select</option>
            <option value="multi-select">Multi-Select</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
          </select>
          {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Attribute Values*</label>
          <button
            type="button"
            onClick={() => append({ label: '', value: '' })}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <FiPlus className="mr-1" /> Add Value
          </button>
        </div>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3">
            <div className="flex-1">
              <input
                {...register(`values.${index}.label`)}
                onChange={(e) => {
                  register(`values.${index}.label`).onChange(e);
                  handleLabelChange(index, e.target.value);
                }}
                className={`block w-full border ${errors.values?.[index]?.label ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
                placeholder="Label (e.g. Small)"
              />
            </div>
            <div className="flex-1">
              <input
                {...register(`values.${index}.value`)}
                className={`block w-full border ${errors.values?.[index]?.value ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
                placeholder="Value (e.g. small)"
              />
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        ))}
        {errors.values && <p className="text-red-500 text-xs">{errors.values.message}</p>}
      </div>

      <div className="flex flex-wrap gap-6 border-t pt-4">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input type="checkbox" {...register("isFilterable")} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
          <span>Is Filterable?</span>
        </label>

        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input type="checkbox" {...register("isStudio")} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
          <span>Is Studio?</span>
        </label>

        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
          <input type="checkbox" {...register("isActive")} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" />
          <span>Is Active?</span>
        </label>
      </div>

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
          className="btn-primary !w-auto px-8"
        >
          {initialData ? 'Update Attribute' : 'Create Attribute'}
        </button>
      </div>
    </form>
  );
};

export default AttributeForm;
