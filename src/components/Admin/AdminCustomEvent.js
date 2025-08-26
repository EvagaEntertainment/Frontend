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
    { value: "url", label: "URL Field", icon: "🔗" }
  ];
  
  // Predefined event templates with all fields configured
  const eventTemplates = {
    birthday: {
      name: "Birthday Party",
      icon: "🎂",
      description: "Complete birthday party booking form with age groups, themes, and preferences",
      fields: [
        {
          id: "ageGroup",
          name: "ageGroup",
          label: "Age Group",
          type: "select",
          required: true,
          placeholder: "Select age group",
          options: ["Children (0-12)", "Teens (13-19)", "Adults (20+)", "Seniors (60+)"],
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
          validation: { min: "1", max: "500", pattern: "" }
        },
        {
          id: "theme",
          name: "theme",
          label: "Party Theme",
          type: "text",
          required: true,
          placeholder: "e.g., Superhero, Princess, Sports",
          options: [],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "budgetRange",
          name: "budgetRange",
          label: "Budget Range",
          type: "select",
          required: true,
          placeholder: "Select budget range",
          options: ["Budget", "Standard", "Premium", "Luxury"],
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
      description: "Comprehensive wedding planning form with ceremony types and preferences",
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
          options: ["Traditional", "Modern", "Religious", "Civil", "Destination"],
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
          validation: { min: "10", max: "1000", pattern: "" }
        },
        {
          id: "budgetRange",
          name: "budgetRange",
          label: "Budget Range",
          type: "select",
          required: true,
          placeholder: "Select budget range",
          options: ["Budget", "Standard", "Premium", "Luxury"],
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
      description: "Professional corporate event booking with business requirements",
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
          options: ["Conference", "Seminar", "Team Building", "Product Launch", "Annual Meeting", "Training"],
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
          validation: { min: "5", max: "1000", pattern: "" }
        },
        {
          id: "duration",
          name: "duration",
          label: "Event Duration (hours)",
          type: "number",
          required: true,
          placeholder: "Enter duration in hours",
          options: [],
          validation: { min: "1", max: "24", pattern: "" }
        },
        {
          id: "budgetRange",
          name: "budgetRange",
          label: "Budget Range",
          type: "select",
          required: true,
          placeholder: "Select budget range",
          options: ["Standard", "Premium", "Enterprise"],
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
      description: "Custom private party booking with flexible options",
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
          options: ["House Party", "Garden Party", "Pool Party", "Dinner Party", "Cocktail Party"],
          validation: { min: "", max: "", pattern: "" }
        },
        {
          id: "ageGroup",
          name: "ageGroup",
          label: "Age Group",
          type: "select",
          required: true,
          placeholder: "Select age group",
          options: ["Young Adults (18-30)", "Adults (30-50)", "Mixed Ages", "All Ages"],
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
          validation: { min: "5", max: "200", pattern: "" }
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
          id: "budgetRange",
          name: "budgetRange",
          label: "Budget Range",
          type: "select",
          required: true,
          placeholder: "Select budget range",
          options: ["Budget", "Standard", "Premium"],
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

  const addFormField = () => {
    const newField = {
      id: `custom_${Date.now()}`,
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
    setEventFormFields([...eventFormFields, newField]);
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

  const renderFormFieldBuilder = (field) => {
    const { id, name, label, type, required, placeholder, options, validation } = field;
    
    return (
      <div key={id} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-800">Field #{id}</h4>
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
              onChange={(e) => updateFormField(id, { type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {availableFieldTypes.map(fieldType => (
                <option key={fieldType.value} value={fieldType.value}>
                  {fieldType.icon} {fieldType.label}
                </option>
              ))}
            </select>
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
        
        {/* Validation Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Value
            </label>
            <input
              type="text"
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
              type="text"
              value={validation.max}
              onChange={(e) => updateFormField(id, { validation: { ...validation, max: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., 1000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pattern
            </label>
            <input
              type="text"
              value={validation.pattern}
              onChange={(e) => updateFormField(id, { validation: { ...validation, pattern: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., [A-Za-z]+"
            />
          </div>
        </div>
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
      render: (row) => (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          {row?.formFields?.length || 0} fields
        </span>
      ),
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
                        : "Customize the template fields and add new ones as needed"
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
                      
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={addFormField}
                          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                          <span>➕</span>
                          <span>Add Custom Field</span>
                        </button>
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
                        <p className="text-lg mb-2">No form fields added yet</p>
                        <p className="text-sm">Click "Add Custom Field" to start building your form</p>
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
                      `Create ${selectedTemplate === "custom" ? "Custom Event" : eventTemplates[selectedTemplate]?.name} Form (${eventFormFields.length} fields)`
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