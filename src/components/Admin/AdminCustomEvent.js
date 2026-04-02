import React, { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import customEventsApi from "../../services/customEventsApi";
import { formatDateTime } from "../../utils/formatDateTime";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import DeleteForm from "./DeleteForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReusableModal from "../Modal/Modal";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import commonApis from "../../services/commonApis";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";
import ModernFileUpload from "../Forms/ModernFileUpload";
import { FiX } from "react-icons/fi";

function AdminCustomEvent() {
  const [allCustomEvents, setAllCustomEvents] = useState();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [oneCustomEvent, setOneCustomEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState("addCustomEvent");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [eventFormFields, setEventFormFields] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [editFormFields, setEditFormFields] = useState([]);

  // Managed Event Types State (Mock)
  const [eventTypes, setEventTypes] = useState([
    { _id: '1', name: 'Birthday Party' },
    { _id: '2', name: 'Wedding' },
    { _id: '3', name: 'Corporate Event' },
    { _id: '4', name: 'Private Party' }
  ]);
  const [newEventTypeName, setNewEventTypeName] = useState("");
  const [editingEventType, setEditingEventType] = useState(null);
  const [isEditingType, setIsEditingType] = useState(false);

  // Available field types for admin to choose from when adding custom fields
  const availableFieldTypes = [
    { value: "text", label: "Text Field", icon: "📝" },
    { value: "number", label: "Number Field", icon: "🔢" },
    { value: "email", label: "Email Field", icon: "📧" },
    { value: "phone", label: "Phone Field", icon: "📱" },
    { value: "date", label: "Date Picker", icon: "📅" },
    { value: "time", label: "Time Picker", icon: "⏰" },
    { value: "select", label: "Dropdown", icon: "📋" },
    { value: "radio", label: "Radio Buttons", icon: "🔘" },
    { value: "checkbox", label: "Checkbox", icon: "☑️" },
    { value: "textarea", label: "Text Area", icon: "📄" },
    { value: "file", label: "File Upload", icon: "📎" },
    { value: "url", label: "URL Field", icon: "🔗" },
    { value: "themeCards", label: "Theme Cards", icon: "🎨" },
    { value: "foodMenu", label: "Food Menu", icon: "🍽️" }
  ];

  // Event template types with field structures (empty data for admin to fill)
  const eventTemplates = {
    birthday: {
      name: "Birthday Party",
      icon: "🎂",
      description: "Birthday party form with age groups, themes, and preferences - customize the data",
      fields: [
        {
          id: "ageGroup",
          name: "ageGroup",
          label: "Age Group",
          type: "select",
          required: true,
          placeholder: "Select age group",
          options: [], // Admin will fill this
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "birthdayDate",
          name: "birthdayDate",
          label: "Birthday Date",
          type: "date",
          required: true,
          placeholder: "Select birthday date",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "guestCount",
          name: "guestCount",
          label: "Expected Guest Count",
          type: "number",
          required: true,
          placeholder: "Enter number of guests",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "mobileNumber",
          name: "mobileNumber",
          label: "Mobile Number",
          type: "phone",
          required: true,
          placeholder: "Enter your mobile number",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "email",
          name: "email",
          label: "Email Address",
          type: "email",
          required: true,
          placeholder: "Enter your email address",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "themeCards",
          name: "themeCards",
          label: "Theme Cards",
          type: "themeCards",
          required: true,
          placeholder: "Add theme cards with images, titles, and descriptions",
          options: [], // Admin will add theme cards
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "budget",
          name: "budget",
          label: "Budget (₹)",
          type: "select",
          required: true,
          placeholder: "Select your budget range",
          options: [], // Admin will fill budget options
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "foodMenu",
          name: "foodMenu",
          label: "Food & Beverage Menu",
          type: "foodMenu",
          required: false,
          placeholder: "Create your food menu with categories and items",
          options: [], // Admin will add food categories and items
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "specialRequirements",
          name: "specialRequirements",
          label: "Special Requirements",
          type: "textarea",
          required: false,
          placeholder: "Any special requests or requirements",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        }
      ]
    },
    // wedding: {
    //   name: "Wedding",
    //   icon: "💒",
    //   description: "Wedding planning form with ceremony types and preferences - customize the data",
    //   fields: [
    //     {
    //       id: "weddingDate",
    //       name: "weddingDate",
    //       label: "Wedding Date",
    //       type: "date",
    //       required: true,
    //       placeholder: "Select wedding date",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "ceremonyType",
    //       name: "ceremonyType",
    //       label: "Ceremony Type",
    //       type: "select",
    //       required: true,
    //       placeholder: "Select ceremony type",
    //       options: [], // Admin will fill this
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "guestCount",
    //       name: "guestCount",
    //       label: "Expected Guest Count",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter number of guests",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "budget",
    //       name: "budget",
    //       label: "Budget (₹)",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter your budget amount",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "venue",
    //       name: "venue",
    //       label: "Preferred Venue",
    //       type: "text",
    //       required: false,
    //       placeholder: "e.g., Hotel, Garden, Beach",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "specialRequirements",
    //       name: "specialRequirements",
    //       label: "Special Requirements",
    //       type: "textarea",
    //       required: false,
    //       placeholder: "Any special requests or requirements",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     }
    //   ]
    // },
    // corporate: {
    //   name: "Corporate Event",
    //   icon: "🏢",
    //   description: "Corporate event booking with business requirements - customize the data",
    //   fields: [
    //     {
    //       id: "eventDate",
    //       name: "eventDate",
    //       label: "Event Date",
    //       type: "date",
    //       required: true,
    //       placeholder: "Select event date",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "eventType",
    //       name: "eventType",
    //       label: "Event Type",
    //       type: "select",
    //       required: true,
    //       placeholder: "Select event type",
    //       options: [], // Admin will fill this
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "attendeeCount",
    //       name: "attendeeCount",
    //       label: "Expected Attendees",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter number of attendees",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "duration",
    //       name: "duration",
    //       label: "Event Duration (hours)",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter duration in hours",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "budget",
    //       name: "budget",
    //       label: "Budget (₹)",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter your budget amount",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "venue",
    //       name: "venue",
    //       label: "Preferred Venue",
    //       type: "text",
    //       required: false,
    //       placeholder: "e.g., Conference Center, Hotel, Office",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "specialRequirements",
    //       name: "specialRequirements",
    //       label: "Special Requirements",
    //       type: "textarea",
    //       required: false,
    //       placeholder: "Any special requests or requirements",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     }
    //   ]
    // },
    // party: {
    //   name: "Private Party",
    //   icon: "🎉",
    //   description: "Private party booking with flexible options - customize the data",
    //   fields: [
    //     {
    //       id: "partyDate",
    //       name: "partyDate",
    //       label: "Party Date",
    //       type: "date",
    //       required: true,
    //       placeholder: "Select party date",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "partyType",
    //       name: "partyType",
    //       label: "Party Type",
    //       type: "select",
    //       required: true,
    //       placeholder: "Select party type",
    //       options: [], // Admin will fill this
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "ageGroup",
    //       name: "ageGroup",
    //       label: "Age Group",
    //       type: "select",
    //       required: true,
    //       placeholder: "Select age group",
    //       options: [], // Admin will fill this
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "guestCount",
    //       name: "guestCount",
    //       label: "Expected Guest Count",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter number of guests",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "theme",
    //       name: "theme",
    //       label: "Party Theme",
    //       type: "text",
    //       required: false,
    //       placeholder: "e.g., Tropical, Vintage, Modern",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "budget",
    //       name: "budget",
    //       label: "Budget (₹)",
    //       type: "number",
    //       required: true,
    //       placeholder: "Enter your budget amount",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "venue",
    //       name: "venue",
    //       label: "Preferred Venue",
    //       type: "text",
    //       required: false,
    //       placeholder: "e.g., Home, Restaurant, Event Space",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     },
    //     {
    //       id: "specialRequirements",
    //       name: "specialRequirements",
    //       label: "Special Requirements",
    //       type: "textarea",
    //       required: false,
    //       placeholder: "Any special requests or requirements",
    //       options: [],
    //       validation: { min: "", max: "", pattern: "" }
    //     }
    //   ]
    // }
  };

  // API hooks for custom events
  const getCustomEventsApi = useServices(customEventsApi.getCustomEvents);
  const createCustomEventApi = useServices(customEventsApi.createCustomEvent);
  const updateCustomEventApi = useServices(customEventsApi.updateCustomEvent);
  const deleteCustomEventApi = useServices(customEventsApi.deleteCustomEvent);

  const getCustomEventsHandle = async () => {
    try {
      const queryParams = { page: page || 1 };
      const response = await getCustomEventsApi.callApi(queryParams);

      if (response && response.success && response.data) {
        // Handle the nested structure: response.data.customEvents
        const customEvents = response.data.customEvents || response.data;
        const pagination = response.data.pagination || response.pagination;

        setAllCustomEvents(customEvents);
        setTotalPages(pagination?.totalPages || 1);
      } else {
        // Handle API error responses
        const errorMessage = response?.message || response?.error || "API response structure unexpected";
        const statusCode = response?.status || response?.statusCode || "Unknown";

        if (statusCode >= 400 && statusCode < 500) {
          toast.error(`Client Error (${statusCode}): ${errorMessage}`);
        } else if (statusCode >= 500) {
          toast.error(`Server Error (${statusCode}): ${errorMessage}`);
        } else {
          toast.warning(`API Warning: ${errorMessage}`);
        }

        // Fallback to mock data if API structure is unexpected
        const mockData = [
          {
            _id: '1',
            eventType: 'Birthday Party',
            selectedTemplate: 'birthday',
            templateName: 'Birthday Party',
            eventFormFields: eventTemplates.birthday.fields,
            isActive: true,
            createdAt: new Date().toISOString()
          }
        ];
        setAllCustomEvents(mockData);
        setTotalPages(1);
      }
    } catch (error) {
      // Check if it's a network error or server error
      if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
        toast.warning('Network error - using mock data for demonstration');
      } else {
        toast.error('Failed to fetch custom events');
      }

      // Fallback to mock data on error
      const mockData = [
        {
          _id: '1',
          eventType: 'Birthday Party',
          selectedTemplate: 'birthday',
          templateName: 'Birthday Party',
          eventFormFields: eventTemplates.birthday.fields,
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      setAllCustomEvents(mockData);
      setTotalPages(1);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    setValue: setContent,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { detail: "", contents: "", delivery: "" }
  });

  const {
    register: editRegister,
    handleSubmit: handleEdit,
    setValue,
    control: editControl,
    watch: editWatch,
    reset,
    formState: { errors: editErrors },
  } = useForm({
    defaultValues: { detail: "", contents: "", delivery: "", addons: [] }
  });

  const { fields: createAddonFields, append: createAddonAppend, remove: createAddonRemove } = useFieldArray({
    control,
    name: "addons"
  });

  const { fields: editAddonFields, append: editAddonAppend, remove: editAddonRemove } = useFieldArray({
    control: editControl,
    name: "addons"
  });

  const createImages = watch("images");
  const createVideo = watch("video");
  const editImages = editWatch("images");
  const editVideo = editWatch("video");

  const handleRemoveFile = (fieldName, indexToRemove, isEdit = false) => {
    const dt = new DataTransfer();
    const currentFiles = isEdit ? editWatch(fieldName) : watch(fieldName);

    if (currentFiles && currentFiles.length > 0) {
      Array.from(currentFiles).forEach((file, idx) => {
        if (idx !== indexToRemove) {
          dt.items.add(file);
        }
      });

      if (isEdit) {
        setValue(fieldName, dt.files, { shouldValidate: true });
      } else {
        setContent(fieldName, dt.files, { shouldValidate: true });
      }
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
    setSelectedEventType("");
    setFormStep(1);
    setSelectedTemplate("");
    setEventFormFields([]);
    setEditFormFields([]);
    setNewEventTypeName("");
    setEditingEventType(null);
    setIsEditingType(false);
  };

  const handleEventTypeSelect = (eventType) => {
    setSelectedEventType(eventType);
    setFormStep(2);
  };

  const goBackToEventType = () => {
    setSelectedEventType("");
    setFormStep(1);
  };

  // Form builder functions
  const addFormField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      name: "",
      label: "",
      type: "text",
      required: false,
      placeholder: "",
      options: [],
      validation: {
        min: "",
        max: "",
        pattern: ""
      }
    };

    // Initialize theme cards with empty options if type is themeCards
    if (newField.type === "themeCards") {
      newField.options = [];
    }

    setEventFormFields([...eventFormFields, newField]);
  };

  const selectTemplate = (templateKey) => {
    const template = eventTemplates[templateKey];
    if (template) {
      setSelectedTemplate(templateKey);
      // Clone the template fields so we can modify them
      const clonedFields = template.fields.map(field => ({
        ...field,
        id: `${field.id}_${Date.now()}` // Make IDs unique
      }));
      setEventFormFields(clonedFields);
    }
  };



  const updateFormField = (id, updates) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeFormField = (id) => {
    setEventFormFields(prev => prev.filter(field => field.id !== id));
  };

  const addOptionToField = (fieldId) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? { ...field, options: [...field.options, ""] }
          : field
      )
    );
  };

  const updateOptionInField = (fieldId, optionIndex, value) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((opt, idx) =>
              idx === optionIndex ? value : opt
            )
          }
          : field
      )
    );
  };

  const removeOptionFromField = (fieldId, optionIndex) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.filter((_, idx) => idx !== optionIndex)
          }
          : field
      )
    );
  };

  // Theme Cards specific functions
  const addThemeCard = (fieldId) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: [...field.options, {
              name: "",
              image: "",
              description: ""
            }]
          }
          : field
      )
    );
  };

  const updateThemeCard = (fieldId, cardIndex, updates) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((card, idx) =>
              idx === cardIndex ? { ...card, ...updates } : card
            )
          }
          : field
      )
    );
  };

  const removeThemeCard = (fieldId, cardIndex) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.filter((_, idx) => idx !== cardIndex)
          }
          : field
      )
    );
  };

  // Food Menu specific functions
  const addFoodCategory = (fieldId) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: [...field.options, {
              categoryName: "",
              items: []
            }]
          }
          : field
      )
    );
  };

  const updateFoodCategory = (fieldId, categoryIndex, updates) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((category, idx) =>
              idx === categoryIndex ? { ...category, ...updates } : category
            )
          }
          : field
      )
    );
  };

  const removeFoodCategory = (fieldId, categoryIndex) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.filter((_, idx) => idx !== categoryIndex)
          }
          : field
      )
    );
  };

  const addFoodItem = (fieldId, categoryIndex) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((category, idx) =>
              idx === categoryIndex
                ? {
                  ...category, items: [...category.items, {
                    name: "",
                    dietaryType: "veg",
                    isPopular: false
                  }]
                }
                : category
            )
          }
          : field
      )
    );
  };

  const updateFoodItem = (fieldId, categoryIndex, itemIndex, updates) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((category, idx) =>
              idx === categoryIndex
                ? {
                  ...category,
                  items: category.items.map((item, itemIdx) =>
                    itemIdx === itemIndex ? { ...item, ...updates } : item
                  )
                }
                : category
            )
          }
          : field
      )
    );
  };

  const removeFoodItem = (fieldId, categoryIndex, itemIndex) => {
    setEventFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((category, idx) =>
              idx === categoryIndex
                ? {
                  ...category,
                  items: category.items.filter((_, itemIdx) => itemIdx !== itemIndex)
                }
                : category
            )
          }
          : field
      )
    );
  };

  const renderFormFieldBuilder = (field, isEditMode = false) => {
    const { id, name, label, type, required, placeholder, options, validation } = field;

    // Use edit functions if in edit mode, otherwise use create functions
    const updateField = isEditMode ? updateFieldInEdit : updateFormField;
    const addOption = isEditMode ? addOptionToEditField : addOptionToField;
    const updateOption = isEditMode ? updateOptionInEditField : updateOptionInField;
    const removeOption = isEditMode ? removeOptionFromEditField : removeOptionFromField;
    const addThemeCardFunc = isEditMode ? addThemeCardToEdit : addThemeCard;
    const updateThemeCardFunc = isEditMode ? updateThemeCardInEdit : updateThemeCard;
    const removeThemeCardFunc = isEditMode ? removeThemeCardFromEdit : removeThemeCard;
    const addFoodCategoryFunc = isEditMode ? addFoodCategoryToEdit : addFoodCategory;
    const updateFoodCategoryFunc = isEditMode ? updateFoodCategoryInEdit : updateFoodCategory;
    const removeFoodCategoryFunc = isEditMode ? removeFoodCategoryFromEdit : removeFoodCategory;
    const addFoodItemFunc = isEditMode ? addFoodItemToEdit : addFoodItem;
    const updateFoodItemFunc = isEditMode ? updateFoodItemInEdit : updateFoodItem;
    const removeFoodItemFunc = isEditMode ? removeFoodItemFromEdit : removeFoodItem;

    return (
      <div key={id} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-800">
            📋 {label || `Field #${id}`}
            {type === "themeCards" && (
              <span className="ml-2 text-sm text-purple-600">
                ({options.length} theme{options.length !== 1 ? 's' : ''})
              </span>
            )}
          </h4>
          <button
            type="button"
            onClick={() => removeFormField(id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            🗑️
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Field Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Label *
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => updateFormField(id, { label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Guest Count"
            />
          </div>

          {/* Field Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Type *
            </label>
            <select
              value={type}
              onChange={(e) => {
                const newType = e.target.value;
                updateFormField(id, {
                  type: newType,
                  // Reset options when switching to themeCards
                  options: newType === "themeCards" ? [] : options
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {availableFieldTypes.map(fieldType => (
                <option key={fieldType.value} value={fieldType.value}>
                  {fieldType.icon} {fieldType.label}
                </option>
              ))}
            </select>
            {type === "themeCards" && (
              <p className="text-xs text-blue-600 mt-1">
                🎨 Creates multiple theme cards with images, titles, and descriptions
              </p>
            )}
          </div>

          {/* Field Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Field Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => updateFormField(id, { name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., guestCount"
            />
          </div>

          {/* Placeholder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => updateFormField(id, { placeholder: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Enter guest count"
            />
          </div>
        </div>

        {/* Required Field */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={`required-${id}`}
            checked={required}
            onChange={(e) => updateFormField(id, { required: e.target.checked })}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor={`required-${id}`} className="text-sm font-medium text-gray-700">
            This field is required
          </label>
        </div>

        {/* Options for select, radio, checkbox */}
        {(type === "select" || type === "radio" || type === "checkbox") && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Options *
              </label>
              <button
                type="button"
                onClick={() => addOptionToField(id)}
                className="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200"
              >
                + Add Option
              </button>
            </div>

            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOptionInField(id, index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeOptionFromField(id, index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* File Upload Configuration */}
        {type === "file" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                File Upload Settings
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accepted File Types
                </label>
                <select
                  value={validation.fileTypes || "all"}
                  onChange={(e) => updateFormField(id, {
                    validation: { ...validation, fileTypes: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Files</option>
                  <option value="image">Images Only</option>
                  <option value="document">Documents Only</option>
                  <option value="video">Videos Only</option>
                  <option value="audio">Audio Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max File Size (MB)
                </label>
                <input
                  type="number"
                  value={validation.maxFileSize || "10"}
                  onChange={(e) => updateFormField(id, {
                    validation: { ...validation, maxFileSize: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., 10"
                />
              </div>
            </div>
          </div>
        )}

        {/* Food Menu Configuration */}
        {type === "foodMenu" && (
          <div className="space-y-4">
            {/* Dietary Preferences Summary */}
            {options.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-3">🍽️ Dietary Preferences Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {(() => {
                    const counts = {
                      veg: 0, nonVeg: 0, vegan: 0, egg: 0, seafood: 0, jain: 0
                    };

                    options.forEach(category => {
                      category.items.forEach(item => {
                        if (item.dietaryType === 'veg') counts.veg++;
                        else if (item.dietaryType === 'non-veg') counts.nonVeg++;
                        else if (item.dietaryType === 'vegan') counts.vegan++;
                        else if (item.dietaryType === 'egg') counts.egg++;
                        else if (item.dietaryType === 'seafood') counts.seafood++;
                        else if (item.dietaryType === 'jain') counts.jain++;
                      });
                    });

                    return [
                      { label: '🥬 Veg', count: counts.veg, color: 'bg-green-100 text-green-800' },
                      { label: '🍗 Non-Veg', count: counts.nonVeg, color: 'bg-red-100 text-red-800' },
                      { label: '🌱 Vegan', count: counts.vegan, color: 'bg-emerald-100 text-emerald-800' },
                      { label: '🥚 Egg', count: counts.egg, color: 'bg-yellow-100 text-yellow-800' },
                      { label: '🐟 Seafood', count: counts.seafood, color: 'bg-blue-100 text-blue-800' },
                      { label: '🕉️ Jain', count: counts.jain, color: 'bg-purple-100 text-purple-800' }
                    ].map((item, index) => (
                      <div key={index} className={`text-center p-2 rounded-md ${item.color}`}>
                        <div className="text-xs font-medium">{item.label}</div>
                        <div className="text-lg font-bold">{item.count}</div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Food Menu Categories *
              </label>
              <button
                type="button"
                onClick={() => addFoodCategoryFunc(id)}
                className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
              >
                <span>🍽️</span>
                <span>Add Food Category</span>
              </button>
            </div>

            <div className="space-y-4">
              {options.length === 0 ? (
                <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm">No food categories added yet</p>
                  <p className="text-xs">Click "Add Food Category" to start building your menu</p>
                </div>
              ) : (
                options.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-medium text-gray-800">Food Category #{categoryIndex + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeFoodCategoryFunc(id, categoryIndex)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Category Name */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name *
                      </label>
                      <input
                        type="text"
                        value={category.categoryName}
                        onChange={(e) => updateFoodCategoryFunc(id, categoryIndex, { categoryName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., Starters, Main Course, Desserts"
                      />
                    </div>

                    {/* Food Items */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium text-gray-700">
                          Food Items
                        </label>
                        <button
                          type="button"
                          onClick={() => addFoodItemFunc(id, categoryIndex)}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition-colors duration-200 flex items-center space-x-2"
                        >
                          <span>➕</span>
                          <span>Add Item</span>
                        </button>
                      </div>

                      {category.items.length === 0 ? (
                        <div className="text-center py-4 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                          <p className="text-xs">No food items in this category</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {category.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <h6 className="font-medium text-gray-700">Food Item #{itemIndex + 1}</h6>
                                  {/* Dietary Type Icon */}
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                    {item.dietaryType === 'veg' && '🥬'}
                                    {item.dietaryType === 'non-veg' && '🍗'}
                                    {item.dietaryType === 'vegan' && '🌱'}
                                    {item.dietaryType === 'egg' && '🥚'}
                                    {item.dietaryType === 'seafood' && '🐟'}
                                    {item.dietaryType === 'jain' && '🕉️'}
                                  </span>
                                  {/* Popular Badge */}
                                  {item.isPopular && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                      ⭐ Popular
                                    </span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFoodItemFunc(id, categoryIndex, itemIndex)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  ✕
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                {/* Item Name */}
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Item Name *
                                  </label>
                                  <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => updateFoodItemFunc(id, categoryIndex, itemIndex, { name: e.target.value })}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="e.g., Butter Chicken"
                                  />
                                </div>

                                {/* Dietary Type */}
                                <div>
                                  <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Dietary Type *
                                  </label>
                                  <select
                                    value={item.dietaryType}
                                    onChange={(e) => updateFoodItemFunc(id, categoryIndex, itemIndex, { dietaryType: e.target.value })}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  >
                                    <option value="veg">🥬 Vegetarian</option>
                                    <option value="non-veg">🍗 Non-Vegetarian</option>
                                    <option value="vegan">🌱 Vegan</option>
                                    <option value="egg">🥚 Egg</option>
                                    <option value="seafood">🐟 Seafood</option>
                                    <option value="jain">🕉️ Jain</option>
                                  </select>
                                </div>
                              </div>

                              {/* Popular Item */}
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={item.isPopular}
                                  onChange={(e) => updateFoodItemFunc(id, categoryIndex, itemIndex, { isPopular: e.target.checked })}
                                  className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <span className="text-xs text-gray-600">Mark as popular</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Theme Cards Configuration */}
        {type === "themeCards" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Theme Cards *
              </label>
              <button
                type="button"
                onClick={() => addThemeCardFunc(id)}
                className="px-4 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-2"
              >
                <span>🎨</span>
                <span>Add Theme Card</span>
              </button>
            </div>

            <div className="space-y-4">
              {options.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-lg mb-2">No theme cards added yet</p>
                  <p className="text-sm">Click "Add Theme Card" to start building your theme collection</p>
                </div>
              ) : (
                options.map((card, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium text-gray-800">Theme Card #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => removeThemeCardFunc(id, index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Theme Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Theme Name *
                        </label>
                        <input
                          type="text"
                          value={card.name}
                          onChange={(e) => updateThemeCardFunc(id, index, { name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="e.g., Princess & Prince"
                        />
                      </div>

                      {/* Theme Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Theme Image *
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                // For now, we'll store the file name and create a preview
                                // In production, you'd upload to server and get URL
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  updateThemeCardFunc(id, index, {
                                    image: e.target.result,
                                    fileName: file.name
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          {card.fileName && (
                            <p className="text-xs text-green-600">
                              ✓ {card.fileName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Theme Description */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        value={card.description}
                        onChange={(e) => updateThemeCardFunc(id, index, { description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., Royal elegance with crowns and castles"
                        rows="2"
                      />
                    </div>

                    {/* Preview */}
                    {card.image && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preview:
                        </label>
                        <div className="flex items-center space-x-3">
                          <img
                            src={card.image}
                            alt={card.name || "Theme"}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="flex-1">
                            <h6 className="font-medium text-gray-800">{card.name || "Theme Name"}</h6>
                            <p className="text-sm text-gray-600">{card.description || "Description"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Validation Rules - Only show for relevant field types */}
        {(type === "number" || type === "text" || type === "email" || type === "phone" || type === "url") && (
          <div className="space-y-4">
            <h5 className="text-sm font-medium text-gray-700">Validation Rules</h5>

            {/* Min/Max for numbers */}
            {type === "number" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Value
                  </label>
                  <input
                    type="number"
                    value={validation.min}
                    onChange={(e) => updateFormField(id, { validation: { ...validation, min: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Value
                  </label>
                  <input
                    type="number"
                    value={validation.max}
                    onChange={(e) => updateFormField(id, { validation: { ...validation, max: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., 1000"
                  />
                </div>
              </div>
            )}

            {/* Pattern for text-based fields */}
            {(type === "text" || type === "email" || type === "phone" || type === "url") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pattern (Regex)
                </label>
                <input
                  type="text"
                  value={validation.pattern}
                  onChange={(e) => updateFormField(id, { validation: { ...validation, pattern: e.target.value } })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., [A-Za-z]+ for letters only"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty for no pattern validation
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Edit form functions
  const addNewFieldToEdit = () => {
    const newField = {
      id: `edit_field_${Date.now()}`,
      name: "",
      label: "",
      type: "text",
      required: false,
      placeholder: "",
      options: [],
      validation: {
        min: "",
        max: "",
        pattern: ""
      }
    };
    setEditFormFields([...editFormFields, newField]);
  };

  const updateFieldInEdit = (fieldId, field, value) => {
    setEditFormFields(prev =>
      prev.map(f =>
        f.id === fieldId ? { ...f, [field]: value } : f
      )
    );
  };

  const removeFieldFromEdit = (fieldId) => {
    setEditFormFields(prev => prev.filter(field => field.id !== fieldId));
  };

  const addOptionToEditField = (fieldId) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? { ...field, options: [...field.options, ""] }
          : field
      )
    );
  };

  const updateOptionInEditField = (fieldId, optionIndex, value) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: field.options.map((opt, idx) =>
              idx === optionIndex ? value : opt
            )
          }
          : field
      )
    );
  };

  const removeOptionFromEditField = (fieldId, optionIndex) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? { ...field, options: field.options.filter((_, idx) => idx !== optionIndex) }
          : field
      )
    );
  };

  const updateFieldValidation = (fieldId, validationField, value) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            validation: {
              ...field.validation,
              [validationField]: value
            }
          }
          : field
      )
    );
  };

  // Theme Cards functions for edit
  const addThemeCardToEdit = (fieldId) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: [...(field.options || []), {
              name: "",
              image: "",
              description: ""
            }]
          }
          : field
      )
    );
  };

  const updateThemeCardInEdit = (fieldId, cardIndex, updates) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).map((card, idx) =>
              idx === cardIndex ? { ...card, ...updates } : card
            )
          }
          : field
      )
    );
  };

  const removeThemeCardFromEdit = (fieldId, cardIndex) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).filter((_, idx) => idx !== cardIndex)
          }
          : field
      )
    );
  };

  // Food Menu functions for edit
  const addFoodCategoryToEdit = (fieldId) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: [...(field.options || []), {
              categoryName: "",
              items: []
            }]
          }
          : field
      )
    );
  };

  const updateFoodCategoryInEdit = (fieldId, categoryIndex, updates) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).map((category, idx) =>
              idx === categoryIndex ? { ...category, ...updates } : category
            )
          }
          : field
      )
    );
  };

  const removeFoodCategoryFromEdit = (fieldId, categoryIndex) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).filter((_, idx) => idx !== categoryIndex)
          }
          : field
      )
    );
  };

  const addFoodItemToEdit = (fieldId, categoryIndex) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).map((category, idx) =>
              idx === categoryIndex
                ? {
                  ...category, items: [...(category.items || []), {
                    name: "",
                    dietaryType: "veg",
                    isPopular: false
                  }]
                }
                : category
            )
          }
          : field
      )
    );
  };

  const updateFoodItemInEdit = (fieldId, categoryIndex, itemIndex, updates) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).map((category, idx) =>
              idx === categoryIndex
                ? {
                  ...category,
                  items: (category.items || []).map((item, itemIdx) =>
                    itemIdx === itemIndex ? { ...item, ...updates } : item
                  )
                }
                : category
            )
          }
          : field
      )
    );
  };

  const removeFoodItemFromEdit = (fieldId, categoryIndex, itemIndex) => {
    setEditFormFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? {
            ...field,
            options: (field.options || []).map((category, idx) =>
              idx === categoryIndex
                ? {
                  ...category,
                  items: (category.items || []).filter((_, itemIdx) => itemIdx !== itemIndex)
                }
                : category
            )
          }
          : field
      )
    );
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const payload = {
        title: data.title,
        age: data.age,
        gender: data.gender,
        venueType: data.venueType,
        budget: data.budget,
        peopleCapacity: data.peopleCapacity,
        addons: data.addons || [],
        description: data.description,
        detail: data.detail,
        contents: data.contents,
        delivery: data.delivery,
        images: data.images,
        video: data.video,
        createdAt: new Date().toISOString()
      };

      console.log("Create Custom Event Payload:", payload);

      // MOCK SUCCESS (API Integration Deferred)
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Custom event created successfully! (Local Mock)");
      setModalType(null);
      handleClose();
      getCustomEventsHandle();
    } catch (error) {
      toast.error("An error occurred while creating the custom event form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitEdit = async (data) => {
    try {
      setIsSubmitting(true);

      const payload = {
        title: data.title,
        age: data.age,
        gender: data.gender,
        venueType: data.venueType,
        budget: data.budget,
        peopleCapacity: data.peopleCapacity,
        addons: data.addons || [],
        description: data.description,
        detail: data.detail,
        contents: data.contents,
        delivery: data.delivery,
        images: data.images,
        video: data.video,
        updatedAt: new Date().toISOString()
      };

      console.log("Edit Custom Event Payload:", payload);

      // MOCK SUCCESS (API Integration Deferred)
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success("Custom event updated successfully! (Local Mock)");
      setModalType(null);
      handleClose();
      getCustomEventsHandle();
    } catch (error) {
      toast.error("An error occurred while updating the custom event form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteOneCustomEventHandle = async () => {
    try {
      try {
        // Try to delete via API first
        const response = await deleteCustomEventApi.callApi(oneCustomEvent._id);

        // Check if response exists and has success status
        // For DELETE, we check for response.success (since status 200 is always returned for successful deletion)
        if (response && response.success) {
          toast.success("Custom event deleted successfully!");

          // Close modal first
          handleClose();

          // Reset page to 1 and refresh data
          setPage(1);
          setTimeout(() => {
            getCustomEventsHandle();
          }, 200);
        } else {
          // Handle API error responses
          const errorMessage = response?.message || response?.error || "Failed to delete custom event";
          const statusCode = response?.status || response?.statusCode || "Unknown";



          if (statusCode >= 400 && statusCode < 500) {
            toast.error(`Client Error (${statusCode}): ${errorMessage}`);
          } else if (statusCode >= 500) {
            toast.error(`Server Error (${statusCode}): ${errorMessage}`);
          } else {
            toast.error(`Error (${statusCode}): ${errorMessage}`);
          }

          throw new Error(errorMessage);
        }
      } catch (apiError) {

        // Only show mock success if it's a network/connection error, not a server error
        if (apiError.message.includes('Network Error') || apiError.message.includes('Failed to fetch')) {
          toast.warning("Network error - using mock success for demonstration");
          toast.success("Custom event deleted successfully! (Mock)");

          // Close modal first
          handleClose();

          // Reset page to 1 and refresh data
          setPage(1);
          setTimeout(() => {
            getCustomEventsHandle();
          }, 200);
        } else {
          // Re-throw the error to be handled by the outer catch block
          throw apiError;
        }
      }
    } catch (error) {
      toast.error("Failed to delete custom event. Please try again later.");
    }
  };

  useEffect(() => {
    getCustomEventsHandle();
  }, [page]);

  // Populate edit form when oneCustomEvent changes
  useEffect(() => {
    if (oneCustomEvent && modalType === "editCustomEvent") {
      // Reset the edit form and populate with existing data
      reset();
      setValue("eventType", oneCustomEvent.eventType || "");
      setValue("tierType", oneCustomEvent.tierType || "");
      setValue("title", oneCustomEvent.title || "");
      setValue("age", oneCustomEvent.age || "");
      setValue("gender", oneCustomEvent.gender || "");
      setValue("venueType", oneCustomEvent.venueType || "");
      setValue("budget", oneCustomEvent.budget || "");
      setValue("peopleCapacity", oneCustomEvent.peopleCapacity || "");
      setValue("addons", oneCustomEvent.addons || []);
      setValue("description", oneCustomEvent.description || "");
      setValue("detail", oneCustomEvent.detail || "");
      setValue("contents", oneCustomEvent.contents || "");
      setValue("delivery", oneCustomEvent.delivery || "");
    }
  }, [oneCustomEvent, modalType, reset, setValue]);

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    // {
    //   label: "Event Type",
    //   key: "eventType",
    //   render: (row) => (
    //     <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
    //       {row?.eventType || "N/A"}
    //     </span>
    //   ),
    // },
    {
      label: "Tier / Type",
      key: "tierType",
      render: (row) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {row?.tierType || "N/A"}
        </span>
      ),
    },
    {
      label: "Title",
      key: "title",
      render: (row) => row?.title || "N/A",
    },
    {
      label: "Description",
      key: "description",
      render: (row) => (
        <div className="max-w-xs truncate" title={row?.description}>
          {row?.description || "N/A"}
        </div>
      ),
    },
    {
      label: "Status",
      key: "status",
      render: (row) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${row?.isActive
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
          }`}>
          {row?.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      label: "Created At",
      render: (row) => formatDateTime(row?.createdAt),
    },
    {
      label: "Action",
      key: "action",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <MdOutlineEdit
            className="text-3xl font-semibold cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200"
            onClick={() => {
              handleOpen();
              setModalType("editCustomEvent");
              setOneCustomEvent(row);
            }}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200"
            onClick={() => {
              handleOpen();
              setModalType("deleteCustomEvent");
              setOneCustomEvent(row);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => [handleOpen(), setModalType("manageEventTypes")]}
          className="btn-secondary w-fit px-4"
        >
          Manage Event Types
        </button>
        <button
          onClick={() => [handleOpen(), setModalType("addCustomEvent")]}
          className="btn-primary w-fit px-4"
        >
          Add Custom Event
        </button>
      </div>

      <TableComponetWithApi
        columns={columns}
        data={allCustomEvents}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      <ReusableModal 
        open={open} 
        onClose={handleClose} 
        width={
          modalType === "deleteEventType" || modalType === "deleteCustomEvent" ? "30%" : 
          modalType === "manageEventTypes" ? "50%" : "80%"
        }
      >
        {modalType === "manageEventTypes" && (
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Manage Event Types
            </h2>

            {/* Add/Edit Form */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {isEditingType ? "Edit Event Type" : "Add New Event Type"}
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={isEditingType ? editingEventType?.name : newEventTypeName}
                  onChange={(e) => isEditingType 
                    ? setEditingEventType({ ...editingEventType, name: e.target.value }) 
                    : setNewEventTypeName(e.target.value)
                  }
                  placeholder="Enter event type name (e.g. Wedding)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent outline-none"
                />
                {isEditingType ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (!editingEventType?.name.trim()) return;
                        setEventTypes(prev => prev.map(t => t._id === editingEventType._id ? editingEventType : t));
                        setIsEditingType(false);
                        setEditingEventType(null);
                        toast.success("Event type updated successfully!");
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingType(false);
                        setEditingEventType(null);
                      }}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!newEventTypeName.trim()) return;
                      const newType = {
                        _id: Date.now().toString(),
                        name: newEventTypeName.trim()
                      };
                      setEventTypes(prev => [...prev, newType]);
                      setNewEventTypeName("");
                      toast.success("New event type added!");
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Add Type
                  </button>
                )}
              </div>
            </div>

            {/* List of Event Types */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-sm">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Event Type Name</th>
                    <th className="px-4 py-3 font-semibold text-center w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {eventTypes.length > 0 ? (
                    eventTypes.map((type) => (
                      <tr key={type._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-800">{type.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-3">
                            <MdOutlineEdit
                              className="text-xl text-blue-600 cursor-pointer hover:text-blue-800"
                              onClick={() => {
                                setEditingEventType(type);
                                setIsEditingType(true);
                              }}
                              title="Edit"
                            />
                            <MdOutlineDelete
                              className="text-xl text-red-600 cursor-pointer hover:text-red-800"
                              onClick={() => {
                                setEditingEventType(type);
                                setModalType("deleteEventType");
                              }}
                              title="Delete"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-4 py-8 text-center text-gray-500 italic">
                        No event types available. Add one above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {modalType === "deleteEventType" && (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">
              Delete Event Type
            </h2>
            <p className="text-gray-600 mb-6">
              You are about to delete the event type: <span className="font-bold text-gray-800">"{editingEventType?.name}"</span>
            </p>
            <DeleteForm
              onDelete={() => {
                setEventTypes(prev => prev.filter(t => t._id !== editingEventType._id));
                toast.success("Event type deleted!");
                setModalType("manageEventTypes");
              }}
              deleteText={`Event Type: ${editingEventType?.name}`}
            />
            <button
              onClick={() => setModalType("manageEventTypes")}
              className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium border border-gray-200"
            >
              Back to List
            </button>
          </div>
        )}
        {modalType === "addCustomEvent" && (
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Create Custom Event
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-800 mb-3">
                  📋 Event Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type *
                    </label>
                    <select
                      {...register("eventType", { required: "Event type is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map(type => (
                        <option key={type._id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="text-sm text-red-500 mt-1">{errors.eventType.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tier / Type *
                    </label>
                    <select
                      {...register("tierType", { required: "Tier Type is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Tier Type</option>
                      <option value="Gold">Gold</option>
                      <option value="Premium">Premium</option>
                      <option value="Elite">Elite</option>
                    </select>
                    {errors.tierType && <p className="text-sm text-red-500 mt-1">{errors.tierType.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      {...register("title", { required: "Title is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                      placeholder="Event Title"
                    />
                    {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                    <input type="text" {...register("age", { required: "Age is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent" placeholder="e.g. All Ages, 18+" />
                    {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                    <select {...register("gender", { required: "Gender is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent">
                      <option value="">Select Gender</option>
                      <option value="Any/All">Any/All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue Type *</label>
                    <select {...register("venueType", { required: "Venue type is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent">
                      <option value="">Select Venue Type</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Both">Both (Indoor & Outdoor)</option>
                    </select>
                    {errors.venueType && <p className="text-sm text-red-500 mt-1">{errors.venueType.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget *</label>
                    <input type="text" {...register("budget", { required: "Budget is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent" placeholder="e.g. $500 - $1000" />
                    {errors.budget && <p className="text-sm text-red-500 mt-1">{errors.budget.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">People Capacity *</label>
                    <input type="text" {...register("peopleCapacity", { required: "Capacity is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent" placeholder="e.g. 50-100 People" />
                    {errors.peopleCapacity && <p className="text-sm text-red-500 mt-1">{errors.peopleCapacity.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      {...register("description", { required: "Description is required" })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                      placeholder="Short description"
                    />
                    {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                  </div>
                  <div>
                    <ModernFileUpload id="create_images" label="Upload Images (Multiple)" accept="image/*" multiple error={errors.images} {...register("images")} />
                    {createImages && createImages.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {Array.from(createImages).map((file, idx) => (
                          <div key={idx} className="relative group overflow-hidden rounded-md border border-gray-200">
                            <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className="w-24 h-24 object-cover" />
                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50" onClick={() => handleRemoveFile("images", idx, false)}>
                              <FiX className="text-red-500 w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <ModernFileUpload id="create_video" label="Upload Video" accept="video/*" error={errors.video} {...register("video")} />
                    {createVideo && createVideo.length > 0 && (
                      <div className="mt-3 relative group rounded-md overflow-hidden border border-gray-200">
                        <video src={URL.createObjectURL(createVideo[0])} controls className="w-full max-h-48 object-cover" />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm hover:bg-red-50" onClick={() => handleRemoveFile("video", 0, false)}>
                          <FiX className="text-red-500 w-5 h-5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add-ons Dynamic Field */}
                  <div className="md:col-span-2 mt-2 bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-md font-semibold text-gray-800">Event Add-ons</h4>
                        <p className="text-xs text-gray-500">Add optional items users can purchase with this event.</p>
                      </div>
                      <button type="button" onClick={() => createAddonAppend({ itemName: "", price: "", minOrder: "" })} className="text-sm bg-blue-50 text-blue-600 font-medium px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-200">
                        + Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {createAddonFields.map((item, index) => (
                        <div key={item.id} className="flex gap-3 items-end p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Item Name *</label>
                            <input type="text" {...register(`addons.${index}.itemName`, { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent text-sm" placeholder="e.g. Extra Decoration" />
                          </div>
                          <div className="w-28">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Price / Qty *</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-500 text-sm">₹</span>
                              <input type="number" {...register(`addons.${index}.price`, { required: true })} className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent text-sm" placeholder="0" />
                            </div>
                          </div>
                          <div className="w-24">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Min Order *</label>
                            <input type="number" {...register(`addons.${index}.minOrder`, { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent text-sm" placeholder="1" />
                          </div>
                          <button type="button" onClick={() => createAddonRemove(index)} className="p-2 mb-0.5 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-md transition-colors" title="Remove Add-on">
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {createAddonFields.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-md">
                          <p className="text-sm text-gray-400">No add-ons created. Click "+ Add Item" to create one.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rich Text Editors */}
                  <div className="md:col-span-2 mt-4 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Detail *</label>
                      <Controller name="detail" control={control} rules={{ required: "Detail is required" }} render={({ field }) => (<ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white h-32 mb-10" />)} />
                      {errors.detail && <p className="text-sm text-red-500">{errors.detail.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contents *</label>
                      <Controller name="contents" control={control} rules={{ required: "Contents is required" }} render={({ field }) => (<ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white h-32 mb-10" />)} />
                      {errors.contents && <p className="text-sm text-red-500">{errors.contents.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery *</label>
                      <Controller name="delivery" control={control} rules={{ required: "Delivery is required" }} render={({ field }) => (<ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white h-32 mb-10" />)} />
                      {errors.delivery && <p className="text-sm text-red-500">{errors.delivery.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Event...
                  </>
                ) : (
                  "Create Custom Event"
                )}
              </button>
            </form>
          </div>
        )}

        {modalType === "editCustomEvent" && oneCustomEvent && (
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Edit Custom Event Form
            </h2>

            {/* Edit Form */}
            <form onSubmit={handleEdit(onSubmitEdit)} className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-800 mb-3">
                  📋 Event Type Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type *
                    </label>
                    <select
                      {...editRegister("eventType", { required: "Event type is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map(type => (
                        <option key={type._id} value={type.name}>{type.name}</option>
                      ))}
                    </select>
                    {editErrors.eventType && (
                      <p className="text-sm text-red-500 mt-1">{editErrors.eventType.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tier / Type *
                    </label>
                    <select
                      {...editRegister("tierType", { required: "Tier Type is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select Tier Type</option>
                      <option value="Gold">Gold</option>
                      <option value="Premium">Premium</option>
                      <option value="Elite">Elite</option>
                    </select>
                    {editErrors.tierType && <p className="text-sm text-red-500 mt-1">{editErrors.tierType.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      {...editRegister("title", { required: "Title is required" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                      placeholder="Event Title"
                    />
                    {editErrors.title && <p className="text-sm text-red-500 mt-1">{editErrors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                    <input type="text" {...editRegister("age", { required: "Age is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent" placeholder="e.g. All Ages, 18+" />
                    {editErrors.age && <p className="text-sm text-red-500 mt-1">{editErrors.age.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                    <select {...editRegister("gender", { required: "Gender is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent">
                      <option value="">Select Gender</option>
                      <option value="Any/All">Any/All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {editErrors.gender && <p className="text-sm text-red-500 mt-1">{editErrors.gender.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue Type *</label>
                    <select {...editRegister("venueType", { required: "Venue type is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent">
                      <option value="">Select Venue Type</option>
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Both">Both (Indoor & Outdoor)</option>
                    </select>
                    {editErrors.venueType && <p className="text-sm text-red-500 mt-1">{editErrors.venueType.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget *</label>
                    <input type="text" {...editRegister("budget", { required: "Budget is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent" placeholder="e.g. $500 - $1000" />
                    {editErrors.budget && <p className="text-sm text-red-500 mt-1">{editErrors.budget.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">People Capacity *</label>
                    <input type="text" {...editRegister("peopleCapacity", { required: "Capacity is required" })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent" placeholder="e.g. 50-100 People" />
                    {editErrors.peopleCapacity && <p className="text-sm text-red-500 mt-1">{editErrors.peopleCapacity.message}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      {...editRegister("description", { required: "Description is required" })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent"
                      placeholder="Short description"
                    />
                    {editErrors.description && <p className="text-sm text-red-500 mt-1">{editErrors.description.message}</p>}
                  </div>
                  <div>
                    <ModernFileUpload id="edit_images" label="Upload Images (Multiple)" accept="image/*" multiple error={editErrors.images} {...editRegister("images")} />
                    {editImages && editImages.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {Array.from(editImages).map((file, idx) => (
                          <div key={idx} className="relative group overflow-hidden rounded-md border border-gray-200">
                            <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className="w-24 h-24 object-cover" />
                            <div className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50" onClick={() => handleRemoveFile("images", idx, true)}>
                              <FiX className="text-red-500 w-4 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <ModernFileUpload id="edit_video" label="Upload Video" accept="video/*" error={editErrors.video} {...editRegister("video")} />
                    {editVideo && editVideo.length > 0 && (
                      <div className="mt-3 relative group rounded-md overflow-hidden border border-gray-200">
                        <video src={URL.createObjectURL(editVideo[0])} controls className="w-full max-h-48 object-cover" />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm hover:bg-red-50" onClick={() => handleRemoveFile("video", 0, true)}>
                          <FiX className="text-red-500 w-5 h-5" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Add-ons Dynamic Field */}
                  <div className="md:col-span-2 mt-2 bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-md font-semibold text-gray-800">Event Add-ons</h4>
                        <p className="text-xs text-gray-500">Edit optional items users can purchase with this event.</p>
                      </div>
                      <button type="button" onClick={() => editAddonAppend({ itemName: "", price: "", minOrder: "" })} className="text-sm bg-blue-50 text-blue-600 font-medium px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors border border-blue-200">
                        + Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {editAddonFields.map((item, index) => (
                        <div key={item.id} className="flex gap-3 items-end p-3 bg-gray-50 rounded-md border border-gray-100">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Item Name *</label>
                            <input type="text" {...editRegister(`addons.${index}.itemName`, { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent text-sm" placeholder="e.g. Extra Decoration" />
                          </div>
                          <div className="w-28">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Price / Qty *</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-gray-500 text-sm">₹</span>
                              <input type="number" {...editRegister(`addons.${index}.price`, { required: true })} className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent text-sm" placeholder="0" />
                            </div>
                          </div>
                          <div className="w-24">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Min Order *</label>
                            <input type="number" {...editRegister(`addons.${index}.minOrder`, { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-transparent text-sm" placeholder="1" />
                          </div>
                          <button type="button" onClick={() => editAddonRemove(index)} className="p-2 mb-0.5 text-red-500 hover:bg-red-100 hover:text-red-700 rounded-md transition-colors" title="Remove Add-on">
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      {editAddonFields.length === 0 && (
                        <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-md">
                          <p className="text-sm text-gray-400">No add-ons created. Click "+ Add Item" to create one.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rich Text Editors */}
                  <div className="md:col-span-2 mt-4 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Detail *</label>
                      <Controller name="detail" control={editControl} rules={{ required: "Detail is required" }} render={({ field }) => (<ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white h-32 mb-10" />)} />
                      {editErrors.detail && <p className="text-sm text-red-500">{editErrors.detail.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contents *</label>
                      <Controller name="contents" control={editControl} rules={{ required: "Contents is required" }} render={({ field }) => (<ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white h-32 mb-10" />)} />
                      {editErrors.contents && <p className="text-sm text-red-500">{editErrors.contents.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery *</label>
                      <Controller name="delivery" control={editControl} rules={{ required: "Delivery is required" }} render={({ field }) => (<ReactQuill theme="snow" value={field.value} onChange={field.onChange} className="bg-white h-32 mb-10" />)} />
                      {editErrors.delivery && <p className="text-sm text-red-500">{editErrors.delivery.message}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Updating..." : "Update Event"}
                </button>
              </div>
            </form>
          </div>
        )}

        {modalType === "deleteCustomEvent" && (
          <DeleteForm
            onDelete={deleteOneCustomEventHandle}
            deleteText={"Custom Event"}
          />
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminCustomEvent;