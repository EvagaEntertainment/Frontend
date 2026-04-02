import React, { forwardRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const ModernFileUpload = forwardRef(({ 
  label, 
  id, 
  accept, 
  multiple, 
  error, 
  helperText, 
  onChange, 
  onBlur, 
  name 
}, ref) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div className="relative group w-full">
        <label
          htmlFor={id}
          className={`flex flex-col items-center justify-center w-full min-h-[140px] px-4 py-6 bg-gray-50/50 text-center rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ease-in-out
            ${error 
              ? 'border-red-400 bg-red-50/20 hover:border-red-500 hover:bg-red-50/50' 
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-sm'
            }`}
        >
          <div className="flex flex-col items-center transition-transform duration-200 group-hover:-translate-y-1">
            <div className={`p-3 rounded-full mb-3 ${error ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-600'}`}>
              <FiUploadCloud className="w-6 h-6" />
            </div>
            
            <p className="text-sm text-gray-600 font-medium">
              <span className="text-primary hover:text-primary-dark underline underline-offset-2">Click to browse</span> or drag and drop
            </p>
            
            {helperText && (
              <p className="text-xs text-gray-500 mt-2">
                {helperText}
              </p>
            )}
          </div>

          <input
            id={id}
            name={name}
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
          />
        </label>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1.5 font-medium animate-pulse">
          {error.message || "File upload error"}
        </p>
      )}
    </div>
  );
});

// Set display name for DevTools when using forwardRef
ModernFileUpload.displayName = 'ModernFileUpload';

export default ModernFileUpload;
