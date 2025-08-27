import React, { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { formatDateTime } from "../../utils/formatDateTime";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import DeleteForm from "./DeleteForm";
import ReactQuill from "react-quill";
import ReusableModal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import commonApis from "../../services/commonApis";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";

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
          type: "number",
          required: true,
          placeholder: "Enter your budget amount",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "venue",
          name: "venue",
          label: "Preferred Venue",
          type: "text",
          required: false,
          placeholder: "e.g., Home, Garden, Restaurant",
          options: [],
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
    wedding: {
      name: "Wedding",
      icon: "💒",
      description: "Wedding planning form with ceremony types and preferences - customize the data",
      fields: [
        {
          id: "weddingDate",
          name: "weddingDate",
          label: "Wedding Date",
          type: "date",
          required: true,
          placeholder: "Select wedding date",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "ceremonyType",
          name: "ceremonyType",
          label: "Ceremony Type",
          type: "select",
          required: true,
          placeholder: "Select ceremony type",
          options: [], // Admin will fill this
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
          id: "budget",
          name: "budget",
          label: "Budget (₹)",
          type: "number",
          required: true,
          placeholder: "Enter your budget amount",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "venue",
          name: "venue",
          label: "Preferred Venue",
          type: "text",
          required: false,
          placeholder: "e.g., Hotel, Garden, Beach",
          options: [],
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
    corporate: {
      name: "Corporate Event",
      icon: "🏢",
      description: "Corporate event booking with business requirements - customize the data",
      fields: [
        {
          id: "eventDate",
          name: "eventDate",
          label: "Event Date",
          type: "date",
          required: true,
          placeholder: "Select event date",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "eventType",
          name: "eventType",
          label: "Event Type",
          type: "select",
          required: true,
          placeholder: "Select event type",
          options: [], // Admin will fill this
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "attendeeCount",
          name: "attendeeCount",
          label: "Expected Attendees",
          type: "number",
          required: true,
          placeholder: "Enter number of attendees",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "duration",
          name: "duration",
          label: "Event Duration (hours)",
          type: "number",
          required: true,
          placeholder: "Enter duration in hours",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "budget",
          name: "budget",
          label: "Budget (₹)",
          type: "number",
          required: true,
          placeholder: "Enter your budget amount",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "venue",
          name: "venue",
          label: "Preferred Venue",
          type: "text",
          required: false,
          placeholder: "e.g., Conference Center, Hotel, Office",
          options: [],
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
    party: {
      name: "Private Party",
      icon: "🎉",
      description: "Private party booking with flexible options - customize the data",
      fields: [
        {
          id: "partyDate",
          name: "partyDate",
          label: "Party Date",
          type: "date",
          required: true,
          placeholder: "Select party date",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "partyType",
          name: "partyType",
          label: "Party Type",
          type: "select",
          required: true,
          placeholder: "Select party type",
          options: [], // Admin will fill this
          validation: { min: "", max: "", pattern: "" }
        },
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
          id: "theme",
          name: "theme",
          label: "Party Theme",
          type: "text",
          required: false,
          placeholder: "e.g., Tropical, Vintage, Modern",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "budget",
          name: "budget",
          label: "Budget (₹)",
          type: "number",
          required: true,
          placeholder: "Enter your budget amount",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "venue",
          name: "venue",
          label: "Preferred Venue",
          type: "text",
          required: false,
          placeholder: "e.g., Home, Restaurant, Event Space",
          options: [],
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
    }
  };

  // API hooks - commented out until APIs are created
  // const getCustomEventsApi = useServices(commonApis.getCustomEvents);
  // const createCustomEventApi = useServices(commonApis.createCustomEvent);
  // const deleteCustomEventApi = useServices(commonApis.deleteCustomEvent);
  
  const getCustomEventsHandle = async () => {
    // Mock data for now - replace with actual API call later
    const mockData = [
      {
        _id: '1',
        eventType: 'Wedding',
        template: 'wedding',
        templateName: 'Wedding',
        formFields: eventTemplates.wedding.fields,
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        eventType: 'Birthday Party',
        template: 'birthday',
        templateName: 'Birthday Party',
        formFields: eventTemplates.birthday.fields,
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        eventType: 'Corporate Conference',
        template: 'corporate',
        templateName: 'Corporate Event',
        formFields: eventTemplates.corporate.fields,
        createdAt: new Date().toISOString()
      }
    ];
    
    setAllCustomEvents(mockData);
    setTotalPages(1);
    
    // Uncomment when APIs are ready:
    // const queryParams = { page: page || 1 };
    // const response = await getCustomEventsApi.callApi(queryParams);
    // setAllCustomEvents(response ? response?.data : []);
    // setTotalPages(response ? response?.pagination?.totalPages : 1);
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {
    register,
    handleSubmit,
    setValue: setContent,
    formState: { errors },
  } = useForm();
  
  const {
    register: editRegister,
    handleSubmit: handleEdit,
    setValue,
    reset,
    formState: { errors: editErrors },
  } = useForm();
  
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    reset();
    setSelectedEventType("");
    setFormStep(1);
    setSelectedTemplate("");
    setEventFormFields([]);
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
                  ? { ...category, items: [...category.items, { 
                      name: "", 
                      price: "", 
                      description: "", 
                      dietaryType: "veg",
                      spiceLevel: "medium",
                      isPopular: false
                    }] }
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

  const renderFormFieldBuilder = (field) => {
    const { id, name, label, type, required, placeholder, options, validation } = field;
    
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
                 onClick={() => addFoodCategory(id)}
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
                         onClick={() => removeFoodCategory(id, categoryIndex)}
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
                         onChange={(e) => updateFoodCategory(id, categoryIndex, { categoryName: e.target.value })}
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
                           onClick={() => addFoodItem(id, categoryIndex)}
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
                                   onClick={() => removeFoodItem(id, categoryIndex, itemIndex)}
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
                                     onChange={(e) => updateFoodItem(id, categoryIndex, itemIndex, { name: e.target.value })}
                                     className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                     placeholder="e.g., Butter Chicken"
                                   />
                                 </div>
                                 
                                 {/* Item Price */}
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">
                                     Price (₹) *
                                   </label>
                                   <input
                                     type="number"
                                     value={item.price}
                                     onChange={(e) => updateFoodItem(id, categoryIndex, itemIndex, { price: e.target.value })}
                                     className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                     placeholder="e.g., 250"
                                   />
                                 </div>
                               </div>

                               {/* Dietary Preferences Row */}
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                 {/* Dietary Type */}
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">
                                     Dietary Type *
                                   </label>
                                   <select
                                     value={item.dietaryType}
                                     onChange={(e) => updateFoodItem(id, categoryIndex, itemIndex, { dietaryType: e.target.value })}
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
                                 
                                 {/* Spice Level */}
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">
                                     Spice Level
                                   </label>
                                   <select
                                     value={item.spiceLevel}
                                     onChange={(e) => updateFoodItem(id, categoryIndex, itemIndex, { spiceLevel: e.target.value })}
                                     className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                   >
                                     <option value="mild">🌶️ Mild</option>
                                     <option value="medium">🌶️🌶️ Medium</option>
                                     <option value="hot">🌶️🌶️🌶️ Hot</option>
                                     <option value="extra-hot">🌶️🌶️🌶️🌶️ Extra Hot</option>
                                   </select>
                                 </div>
                                 
                                 {/* Popular Item */}
                                 <div>
                                   <label className="block text-xs font-medium text-gray-700 mb-1">
                                     Popular Item
                                   </label>
                                   <div className="flex items-center space-x-2">
                                     <input
                                       type="checkbox"
                                       checked={item.isPopular}
                                       onChange={(e) => updateFoodItem(id, categoryIndex, itemIndex, { isPopular: e.target.checked })}
                                       className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                                     />
                                     <span className="text-xs text-gray-600">Mark as popular</span>
                                   </div>
                                 </div>
                               </div>

                               {/* Item Description */}
                               <div>
                                 <label className="block text-xs font-medium text-gray-700 mb-1">
                                   Description
                                 </label>
                                 <input
                                   type="text"
                                   value={item.description}
                                   onChange={(e) => updateFoodItem(id, categoryIndex, itemIndex, { description: e.target.value })}
                                   className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                   placeholder="e.g., Rich and creamy curry with tender chicken"
                                 />
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
                onClick={() => addThemeCard(id)}
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
                      onClick={() => removeThemeCard(id, index)}
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
                        onChange={(e) => updateThemeCard(id, index, { name: e.target.value })}
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
                                updateThemeCard(id, index, { 
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
                      onChange={(e) => updateThemeCard(id, index, { description: e.target.value })}
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
  
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Combine event type with form fields and template info
      const formBuilderData = {
        eventType: data.eventType,
        template: selectedTemplate,
        templateName: selectedTemplate === "custom" ? "Custom Template" : eventTemplates[selectedTemplate]?.name,
        formFields: eventFormFields,
        createdAt: new Date().toISOString()
      };
      
      console.log("Form Builder Data:", formBuilderData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Custom event form created successfully!");
      setModalType(null);
      handleClose();
      getCustomEventsHandle();
      
      // Uncomment when APIs are ready:
      // const response = await createCustomEventApi.callApi(formBuilderData);
      // if (response.status === 201) {
      //   toast.success("Custom event form created successfully!");
      //   setModalType(null);
      //   handleClose();
      //   getCustomEventsHandle();
      // } else {
      //   toast.error(response.message || "Failed to create custom event form");
      // }
    } catch (error) {
      toast.error("An error occurred while creating the custom event form");
      console.error("Error creating custom event form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteOneCustomEventHandle = async () => {
    try {
      // Mock delete for now - replace with actual API call later
      toast.success("Custom event deleted successfully!");
      handleClose();
      getCustomEventsHandle();
      
      // Uncomment when APIs are ready:
      // const response = await deleteCustomEventApi.callApi(oneCustomEvent);
      // toast.success("Custom event deleted successfully!");
      // handleClose();
      // getCustomEventsHandle();
    } catch (error) {
      toast.error("Failed to delete custom event. Please try again later.");
      console.error("Error deleting custom event:", error);
    }
  };

  useEffect(() => {
    getCustomEventsHandle();
  }, [page]);
  
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Event Type",
      key: "eventType",
      render: (row) => (
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
          {row?.eventType || "N/A"}
        </span>
      ),
    },
    {
      label: "Template",
      key: "template",
      render: (row) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {row?.templateName || "Custom"}
        </span>
      ),
    },
         {
       label: "Fields Count",
       key: "fieldsCount",
       render: (row) => {
         const totalFields = row?.formFields?.length || 0;
         const themeCardFields = row?.formFields?.filter(field => field.type === 'themeCards').length || 0;
         
         return (
           <div className="space-y-1">
             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium block">
               {totalFields} fields
             </span>
             {themeCardFields > 0 && (
               <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium block">
                 🎨 {themeCardFields} theme card{themeCardFields > 1 ? 's' : ''}
               </span>
             )}
           </div>
         );
       },
     },
    {
      label: "Status",
      key: "status",
      render: (row) => (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Active
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
            onClick={() => [
              handleOpen(),
              setModalType("editCustomEvent"),
              setOneCustomEvent(row),
            ]}
          />
          <MdOutlineDelete
            className="text-3xl font-semibold cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200"
            onClick={() => [
              handleOpen(),
              setModalType("deleteCustomEvent"),
              setOneCustomEvent(row?._id),
            ]}
          />
        </div>
      ),
    },
  ];
  
  return (
    <div>
      <button
        onClick={() => [handleOpen(), setModalType("addCustomEvent")]}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Add Custom Event
      </button>
      
      <TableComponetWithApi
        columns={columns}
        data={allCustomEvents}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      
      <ReusableModal open={open} onClose={handleClose} width={"80%"}>
        {modalType === "addCustomEvent" && (
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Create Custom Event Form
            </h2>
            
            {/* Step 1: Template Selection */}
            {!selectedTemplate && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Step 1: Choose Event Template
                  </h3>
                  <p className="text-sm text-gray-500">
                    Select a pre-configured template or start from scratch
                  </p>
                </div>
                
                {/* Template Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(eventTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => selectTemplate(key)}
                      className="p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                          <span className="text-2xl">{template.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {template.fields.length} fields
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                        {template.description}
                      </p>
                    </button>
                  ))}
                  
                  {/* Custom Template Option */}
                  <button
                    onClick={() => {
                      setSelectedTemplate("custom");
                      setEventFormFields([]);
                    }}
                    className="p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                        <span className="text-2xl">✨</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200">
                          Custom Template
                        </h4>
                        <p className="text-sm text-gray-500">
                          Start from scratch
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                      Build a completely custom event form with your own fields
                    </p>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Form Configuration */}
            {selectedTemplate && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      Step 2: Configure {selectedTemplate === "custom" ? "Custom Template" : eventTemplates[selectedTemplate]?.name}
                    </h3>
                                         <p className="text-sm text-gray-500">
                       {selectedTemplate === "custom" 
                         ? "Build your custom event form from scratch" 
                         : "Template comes with all necessary fields. Customize the data, options, and validation rules."
                       }
                     </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTemplate("");
                      setEventFormFields([]);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    ← Back to Templates
                  </button>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Event Type Input */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-blue-800 mb-3">
                      📋 Event Type Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Event Type Name *
                        </label>
                        <input
                          type="text"
                          {...register("eventType", { required: "Event type name is required" })}
                          defaultValue={selectedTemplate === "custom" ? "" : eventTemplates[selectedTemplate]?.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={selectedTemplate === "custom" ? "e.g., My Custom Event" : "e.g., Wedding, Birthday, Corporate Event"}
                        />
                        {errors.eventType && (
                          <p className="text-sm text-red-500 mt-1">{errors.eventType.message}</p>
                        )}
                      </div>
                      
                      
                    </div>
                  </div>
                  
                  {/* Form Fields Builder */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      🎯 Form Fields ({eventFormFields.length})
                    </h3>
                    
                                         {eventFormFields.length === 0 ? (
                       <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                         <p className="text-lg mb-2">Template fields loaded!</p>
                         <p className="text-sm">All necessary fields are ready. Customize the data, options, and validation rules below.</p>
                       </div>
                     ) : (
                      <div className="space-y-4">
                        {eventFormFields.map((field) => renderFormFieldBuilder(field))}
                      </div>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || eventFormFields.length === 0}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ${
                      isSubmitting || eventFormFields.length === 0 ? "opacity-75 cursor-not-allowed" : ""
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
                        Creating Form...
                      </>
                                         ) : (
                       `Create ${selectedTemplate === "custom" ? "Custom Event" : eventTemplates[selectedTemplate]?.name} Form`
                     )}
                  </button>
                </form>
              </div>
            )}
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