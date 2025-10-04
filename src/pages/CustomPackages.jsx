import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";

// Utility functions for text normalization
const normalizeDietaryType = (type) => {
  if (!type) return "";
  const normalized = type.toLowerCase().trim();
  const dietaryMap = {
    veg: "veg",
    vegetarian: "veg",
    veggie: "veg",
    "non-veg": "non-veg",
    nonveg: "non-veg",
    "non vegetarian": "non-veg",
    nonvegetarian: "non-veg",
    vegan: "vegan",
    egg: "egg",
    eggetarian: "egg",
    seafood: "seafood",
    "sea food": "seafood",
    jain: "jain",
    "jain vegetarian": "jain",
  };
  return dietaryMap[normalized] || normalized;
};

const normalizeCourseName = (course) => {
  if (!course) return "";
  const normalized = course.toLowerCase().trim();
  const courseMap = {
    starter: "starters",
    starters: "starters",
    appetizer: "starters",
    appetizers: "starters",
    "main course": "main course",
    maincourse: "main course",
    main: "main course",
    mains: "main course",
    dessert: "desserts",
    desserts: "desserts",
    sweet: "desserts",
    sweets: "desserts",
  };
  return courseMap[normalized] || normalized;
};

const getDisplayName = (value, type) => {
  if (type === "dietary") {
    const displayMap = {
      veg: "Vegetarian",
      "non-veg": "Non-Vegetarian",
      vegan: "Vegan",
      egg: "Egg",
      seafood: "Seafood",
      jain: "Jain",
    };
    return displayMap[value] || value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
};

// Success/Error Modal Component
const SuccessModal = ({
  isOpen,
  onClose,
  isSuccess,
  title,
  message,
  buttonText,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background elements */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 opacity-60 ${
            isSuccess
              ? "bg-gradient-to-br from-green-100 to-emerald-100"
              : "bg-gradient-to-br from-red-100 to-pink-100"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-16 h-16 rounded-full translate-y-8 -translate-x-8 opacity-60 ${
            isSuccess
              ? "bg-gradient-to-br from-green-100 to-emerald-100"
              : "bg-gradient-to-br from-red-100 to-pink-100"
          }`}
        ></div>

        <div className="relative z-10 text-center">
          {/* Icon */}
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${
              isSuccess
                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                : "bg-gradient-to-br from-red-500 to-pink-500"
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-white text-3xl"
            >
              {isSuccess ? "✓" : "⚠️"}
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold mb-4 ${
              isSuccess ? "text-gray-800" : "text-red-800"
            }`}
          >
            {title}
          </motion.h3>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`mb-8 leading-relaxed ${
              isSuccess ? "text-gray-600" : "text-red-600"
            }`}
          >
            {message}
          </motion.p>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className={`w-full px-8 py-4 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              isSuccess
                ? "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700"
                : "bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 hover:from-red-700 hover:via-pink-700 hover:to-rose-700"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonText}
          </motion.button>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 mt-6">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isSuccess ? "bg-green-400" : "bg-red-400"
              }`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isSuccess ? "bg-emerald-400" : "bg-pink-400"
              }`}
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${
                isSuccess ? "bg-teal-400" : "bg-rose-400"
              }`}
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function CustomPackages() {
  const navigate = useNavigate();

  // Form data
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showRefreshConfirm, setShowRefreshConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Custom Events API state
  const [customEventNames, setCustomEventNames] = useState([]);
  const [selectedCustomEvent, setSelectedCustomEvent] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loadingEventId, setLoadingEventId] = useState(null);
  const [customEventFormFields, setCustomEventFormFields] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingEventDetails, setIsLoadingEventDetails] = useState(false);
  const [customEventError, setCustomEventError] = useState(null);

  // API hooks
  const { callApi: getEventNames } = useServices(
    commonApis.getPublicCustomEventNames
  );
  const { callApi: getEventDetails } = useServices(
    commonApis.getPublicCustomEventById
  );
  // const { callApi: submitCustomEventForm } = useServices(commonApis.submitCustomEventForm);

  // Steps array - dynamic based on custom event form fields
  const getSteps = () => {
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      // Create steps: Event Type + Each Custom Field
      const customFieldSteps = customEventFormFields.map(
        (field) => field.label
      );
      return ["Event Type", ...customFieldSteps];
    }
    // When no custom event selected, we need at least 2 steps to show Next button
    return ["Event Type", "Additional Details"]; // This ensures Next button shows
  };

  const steps = getSteps();

  // Step descriptions
  const getStepDescription = (stepNumber) => {
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      if (stepNumber === 1) {
        return "Choose the type of event you're planning";
      } else {
        // For custom form field steps
        const fieldIndex = stepNumber - 2; // -2 because step 1 is event type
        const field = customEventFormFields[fieldIndex];
        return (
          field?.description ||
          `Fill out the ${field?.label || "field"} information`
        );
      }
    }

    const descriptions = {
      1: "Choose the type of event you're planning",
      2: "Please select a custom event to continue with the form",
    };
    return descriptions[stepNumber] || "";
  };

  // Step titles
  const getStepTitle = () => {
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      if (currentStep === 1) {
        return "Event Type";
      } else {
        // For custom form field steps
        const fieldIndex = currentStep - 2; // -2 because step 1 is event type
        const field = customEventFormFields[fieldIndex];
        return field?.label || "Custom Field";
      }
    }

    const titles = {
      1: "Event Type",
      2: "Select Event",
    };
    return titles[currentStep] || "";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    trigger,
  } = useForm();

  // Check if form has any data - more comprehensive check
  // const formValues = watch();
  // const hasCustomFormData = customEventFormFields.some(field => {
  //   const fieldValue = formValues[field.name];
  //   return fieldValue && (Array.isArray(fieldValue) ? fieldValue.length > 0 : true);
  // });

  // const hasFormData = selectedEventType || selectedAge || selectedTheme || selectedFoodType || selectedCourses.length > 0 ||
  //   formValues.guestCount || formValues.eventDate || formValues.budgetRange || formValues.specialRequirements ||
  //   (formValues.foodItems && formValues.foodItems.length > 0) || hasCustomFormData;

  // Fetch custom event names on component mount
  useEffect(() => {
    const fetchCustomEventNames = async () => {
      try {
        setIsLoadingEvents(true);
        setCustomEventError(null);
        const response = await getEventNames();

        if (response && response.success) {
          const events = response.data?.events || [];
          setCustomEventNames(events);
        } else {
          setCustomEventError("Failed to fetch custom events");
        }
      } catch (err) {
        setCustomEventError("Error fetching custom events");
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchCustomEventNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  // Handle keyboard refresh attempts (Ctrl+R, F5)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Detect Ctrl+R or F5
      if ((e.ctrlKey && e.key === "r") || e.key === "F5") {
        e.preventDefault();
        setShowRefreshConfirm(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Enhanced navigation protection
  useEffect(() => {
    // Store the current URL
    const currentUrl = window.location.href;

    // Function to check if URL changed (indicating navigation)
    const checkNavigation = () => {
      if (window.location.href !== currentUrl) {
        // URL changed, show navigation confirmation
        setShowBackConfirm(true);
        // Reset URL to prevent actual navigation
        window.history.pushState(null, "", currentUrl);
      }
    };

    // Check for navigation attempts periodically
    const navigationCheck = setInterval(checkNavigation, 100);

    // Enhanced beforeunload handler
    const handleBeforeUnload = (e) => {
      // Set flag for refresh detection
      sessionStorage.setItem("showRefreshModal", "true");

      // Try to prevent the unload
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave this page?";
      return "Are you sure you want to leave this page?";
    };

    // Enhanced popstate handler
    const handlePopState = (e) => {
      e.preventDefault();
      setShowBackConfirm(true);
      // Push current state back
      window.history.pushState(null, "", currentUrl);
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Push initial state
    window.history.pushState(null, "", currentUrl);

    return () => {
      clearInterval(navigationCheck);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Handle page refresh attempts (including browser refresh button)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Always show warning, regardless of form data
      e.preventDefault();
      e.returnValue = "";

      // Set a flag to show refresh modal when page loads
      sessionStorage.setItem("showRefreshModal", "true");

      // Return empty string to prevent browser's default popup
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Handle visibility change (when page becomes visible after refresh)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const shouldShowRefreshModal =
          sessionStorage.getItem("showRefreshModal");
        if (shouldShowRefreshModal) {
          sessionStorage.removeItem("showRefreshModal");
          setShowRefreshConfirm(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Handle page hide (when page is being refreshed or closed)
  useEffect(() => {
    const handlePageHide = (e) => {
      // Always set flag for refresh detection
      sessionStorage.setItem("showRefreshModal", "true");
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  // Clean up session storage flags on component mount
  useEffect(() => {
    // Clear any existing refresh flags when component mounts
    sessionStorage.removeItem("showRefreshModal");
  }, []);

  // Handle custom event selection
  const handleCustomEventSelection = async (eventId) => {
    // Prevent multiple API calls for the same event
    if (
      selectedEventId === eventId &&
      selectedCustomEvent &&
      !isLoadingEventDetails
    ) {
      return;
    }

    // Prevent multiple API calls if already loading this event
    if (loadingEventId === eventId) {
      return;
    }

    try {
      setIsLoadingEventDetails(true);
      setLoadingEventId(eventId); // Set which event is loading
      setCustomEventError(null);
      setSelectedEventId(eventId); // Set the selected event ID immediately

      const response = await getEventDetails(eventId);

      if (response && response.success) {
        setSelectedCustomEvent(response.data);
        setCustomEventFormFields(response.data.eventFormFields || []);
        // Set the event type to the custom event name
        setSelectedEventType(
          response.data.eventType || response.data.templateName
        );
        setValue(
          "eventType",
          response.data.eventType || response.data.templateName
        );
        clearStepError("eventType");
      } else {
        setCustomEventError("Failed to fetch event details");
        setSelectedEventId(null); // Reset on error
      }
    } catch (err) {
      setCustomEventError("Error fetching event details");
      setSelectedEventId(null); // Reset on error
    } finally {
      setIsLoadingEventDetails(false);
      setLoadingEventId(null); // Clear loading state
    }
  };

  // Combine static event types with custom events
  // const eventTypes = [
  //   'Birthday Party',
  //   'Wedding',
  //   'Corporate Event',
  //   'Baby Shower',
  //   'Anniversary',
  //   'Graduation Party',
  //   'Other'
  // ];

  // const ageGroups = [
  //   '1 year',
  //   '2-3 years',
  //   '4-6 years',
  //   '7-10 years',
  //   '11-15 years',
  //   '16+ years'
  // ];

  // const themes = [
  //   {
  //     name: 'Princess & Prince',
  //     image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Royal elegance with crowns and castles'
  //   },
  //   {
  //     name: 'Superhero',
  //     image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Action-packed with capes and powers'
  //   },
  //   {
  //     name: 'Jungle Safari',
  //     image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Wild adventure with animals and nature'
  //   },
  //   {
  //     name: 'Space & Galaxy',
  //     image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Cosmic exploration with stars and planets'
  //   },
  //   {
  //     name: 'Underwater World',
  //     image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Ocean adventure with sea creatures'
  //   },
  //   {
  //     name: 'Fairy Tale',
  //     image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Magical stories with enchanted elements'
  //   },
  //   {
  //     name: 'Sports',
  //     image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Athletic energy with team spirit'
  //   },
  //   {
  //     name: 'Art & Craft',
  //     image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Creative expression with colors and materials'
  //   },
  //   {
  //     name: 'Custom Theme',
  //     image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=400&fit=crop&crop=center&q=80',
  //     description: 'Your unique vision brought to life'
  //   }
  // ];

  // Food types
  // const foodTypes = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Mixed'];

  // Course options
  // const courses = ['Starters', 'Main Course', 'Desserts', 'Beverages'];

  // Food items by category
  // const foodItems = {
  //   starters: [
  //     'Spring Rolls',
  //     'Paneer Tikka',
  //     'Veg Manchurian',
  //     'Chicken Wings',
  //     'French Fries',
  //     'Onion Rings'
  //   ],
  //   mainCourse: [
  //     'Butter Chicken',
  //     'Paneer Butter Masala',
  //     'Dal Makhani',
  //     'Biryani',
  //     'Naan/Roti',
  //     'Rice'
  //   ],
  //   desserts: [
  //     'Ice Cream',
  //     'Cake',
  //     'Gulab Jamun',
  //     'Jalebi',
  //     'Fruit Salad'
  //   ],
  //   beverages: [
  //     'Soft Drinks',
  //     'Juices',
  //     'Milkshakes',
  //     'Tea/Coffee',
  //     'Mocktails'
  //   ]
  // };

  const nextStep = () => {
    // Validate current step using React Hook Form
    if (currentStep === 1) {
      if (!selectedEventType) {
        setError("eventType", {
          type: "required",
          message: "Please select an event type to continue",
        });
        return;
      }
    }

    // Handle custom event form validation for each field step
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      // Check if current step is a custom field step (not step 1 or last step)
      if (currentStep > 1 && currentStep < steps.length) {
        const fieldIndex = currentStep - 2; // -2 because step 1 is event type
        const field = customEventFormFields[fieldIndex];

        if (field && field.required) {
          const fieldValue = watch(field.name);
          if (
            !fieldValue ||
            (Array.isArray(fieldValue) && fieldValue.length === 0)
          ) {
            setError(field.name, {
              type: "required",
              message: `${field.label} is required`,
            });
            return;
          }
        }
      }
    }

    // Handle age group validation (only for non-custom event flow)
    if (!selectedCustomEvent && currentStep === 2) {
      if (!selectedAge) {
        setError("ageGroup", {
          type: "required",
          message: "Please select an age group to continue",
        });
        return;
      }
    }

    // Handle theme validation (only for non-custom event flow)
    if (!selectedCustomEvent && currentStep === 3) {
      if (!selectedTheme) {
        setError("theme", {
          type: "required",
          message: "Please select a theme to continue",
        });
        return;
      }
    }

    // Handle food validation (only for non-custom event flow)
    if (!selectedCustomEvent && currentStep === 4) {
      if (!selectedFoodType) {
        setError("foodType", {
          type: "required",
          message: "Please select a food type to continue",
        });
        return;
      }
      if (selectedCourses.length === 0) {
        setError("courses", {
          type: "required",
          message: "Please select at least one course to continue",
        });
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    // Only go back if we're not on the first step
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Always show confirmation, regardless of form data
    setShowCloseConfirm(true);
  };

  // const handleBackNavigation = () => {
  //   // Always show confirmation, regardless of form data
  //   setShowBackConfirm(true);
  // };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    // Reset form and navigate to home page
    setCurrentStep(1);
    setSelectedEventType("");
    setSelectedEventId(null);
    setLoadingEventId(null);
    setSelectedCustomEvent(null);
    setCustomEventFormFields([]);
    setSelectedAge("");
    setSelectedTheme("");
    setSelectedFoodType("");
    setSelectedCourses([]);
    // Reset form fields
    setValue("eventType", "");
    setValue("ageGroup", "");
    setValue("theme", "");
    setValue("foodType", "");
    setValue("courses", []);
    // Navigate to home page
    navigate("/");
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    // Reset form and navigate to home page
    setCurrentStep(1);
    setSelectedEventType("");
    setSelectedEventId(null);
    setLoadingEventId(null);
    setSelectedCustomEvent(null);
    setCustomEventFormFields([]);
    setSelectedAge("");
    setSelectedTheme("");
    setSelectedFoodType("");
    setSelectedCourses([]);
    // Reset form fields
    setValue("eventType", "");
    setValue("ageGroup", "");
    setValue("theme", "");
    setValue("foodType", "");
    setValue("courses", []);
    // Navigate to home page
    navigate("/");
  };

  const cancelAction = () => {
    setShowCloseConfirm(false);
    setShowBackConfirm(false);
    setShowRefreshConfirm(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    setSubmissionError(null);
    setSubmissionSuccess(false);

    // Only reset form and navigate if submission was successful
    if (submissionSuccess) {
      // Reset form and navigate to home page
      setCurrentStep(1);
      setSelectedEventType("");
      setSelectedEventId(null);
      setLoadingEventId(null);
      setSelectedCustomEvent(null);
      setCustomEventFormFields([]);
      setSelectedAge("");
      setSelectedTheme("");
      setSelectedFoodType("");
      setSelectedCourses([]);
      // Reset form fields
      setValue("eventType", "");
      setValue("ageGroup", "");
      setValue("theme", "");
      setValue("foodType", "");
      setValue("courses", []);
      // Navigate to home page
      navigate("/");
    }
    // If submission failed, just close the modal and let user try again
  };

  const confirmRefresh = () => {
    setShowRefreshConfirm(false);
    // Reset form and refresh
    setCurrentStep(1);
    setSelectedEventType("");
    setSelectedEventId(null);
    setLoadingEventId(null);
    setSelectedCustomEvent(null);
    setCustomEventFormFields([]);
    setSelectedAge("");
    setSelectedTheme("");
    setSelectedFoodType("");
    setSelectedCourses([]);
    // Reset form fields
    setValue("eventType", "");
    setValue("ageGroup", "");
    setValue("theme", "");
    setValue("foodType", "");
    setValue("courses", []);
    window.location.reload();
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      setSubmissionSuccess(false);

      // Validate that we have a custom event ID
      if (!selectedEventId) {
        throw new Error(
          "No custom event selected. Please select an event type first."
        );
      }

      // Prepare form data for API submission
      // Backend only expects customEventId and formData
      // const submissionData = {
      //   customEventId: selectedEventId, // Required: The custom event template ID
      //   formData: data // Required: The actual form responses
      // };

      // Call the actual API using the useServices hook
      // const response = await submitCustomEventForm(submissionData);

      // Set success state and show popup
      setSubmissionSuccess(true);
      setShowSuccessPopup(true);
    } catch (error) {
      // Handle different types of errors
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.message ||
          "Failed to submit form. Please try again.";
      } else if (error.request) {
        // Network error
        errorMessage =
          "Network error. Please check your connection and try again.";
      } else {
        // Other error
        errorMessage =
          error.message || "An unexpected error occurred. Please try again.";
      }

      // Set error state
      setSubmissionError(errorMessage);
      setSubmissionSuccess(false);

      // Show error popup instead of success
      setShowSuccessPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearStepError = (fieldName) => {
    // Clear error by setting the value again, which triggers React Hook Form to re-validate
    if (fieldName === "eventType" && selectedEventType) {
      setValue("eventType", selectedEventType);
    } else if (fieldName === "ageGroup" && selectedAge) {
      setValue("ageGroup", selectedAge);
    } else if (fieldName === "theme" && selectedTheme) {
      setValue("theme", selectedTheme);
    } else if (fieldName === "foodType" && selectedFoodType) {
      setValue("foodType", selectedFoodType);
    } else if (fieldName === "courses" && selectedCourses.length > 0) {
      setValue("courses", selectedCourses);
    } else {
      // For custom form fields, just clear the error by setting the current value
      const currentValue = watch(fieldName);
      if (currentValue !== undefined && currentValue !== null) {
        setValue(fieldName, currentValue);
      }
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
          Event Type <span className="text-red-500">*</span>
        </h2>
        <p className="text-gray-600 text-lg">
          What type of event are you planning?
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Loading state */}
      {isLoadingEvents && (
        <div className="space-y-3">
          {[1, 2, 3].map((index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error state */}
      {customEventError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
          <p className="text-red-600 text-sm flex items-center">
            <span className="mr-2 text-lg">⚠️</span>
            {customEventError}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {/* Custom Events from API */}
        {customEventNames.length > 0
          ? customEventNames.map((customEvent) => {
              const isSelected = selectedEventId === customEvent._id;
              const isLoading = loadingEventId === customEvent._id;

              return (
                <AnimatePresence key={customEvent._id} mode="wait">
                  {isLoading ? (
                    <EventCardSkeleton />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
                        isSelected
                          ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-purple-200"
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                      onClick={() =>
                        handleCustomEventSelection(customEvent._id)
                      }
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <span
                            className={`text-lg ${
                              isSelected ? "animate-pulse" : ""
                            }`}
                          >
                            {isSelected ? "✓" : "🎉"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-800 text-lg">
                            {customEvent.eventType || customEvent.templateName}
                          </span>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="ml-auto">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full selection-indicator"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })
          : !isLoadingEvents && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gray-400">📝</span>
                </div>
                <p className="text-gray-500 mb-4">
                  No custom event templates available
                </p>
                <p className="text-sm text-gray-400">
                  Please try again later or contact support
                </p>
              </div>
            )}
      </div>

      {errors.eventType && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced"
        >
          <p className="text-red-600 text-sm flex items-center">
            <span className="mr-2 text-lg">⚠️</span>
            {errors.eventType.message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  // const renderStep2 = () => (
  //   <motion.div
  //     initial={{ opacity: 0, x: 20 }}
  //     animate={{ opacity: 1, x: 0 }}
  //     exit={{ opacity: 0, x: -20 }}
  //     className="space-y-6"
  //   >
  //     <div className="mb-8 text-center">
  //       <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
  //         Age Group <span className="text-red-500">*</span>
  //       </h2>
  //       <p className="text-gray-600 text-lg">What's the age group for this event?</p>
  //       <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mt-4"></div>
  //     </div>

  //     <div className="space-y-3">
  //       {ageGroups.map((age) => (
  //         <motion.div
  //           key={age}
  //           whileHover={{ scale: 1.02, y: -4 }}
  //           whileTap={{ scale: 0.98 }}
  //           className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
  //             selectedAge === age
  //               ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-200'
  //               : 'border-gray-200 hover:border-green-300 bg-white'
  //           }`}
  //           onClick={() => {
  //             setSelectedAge(age);
  //             setValue('ageGroup', age);
  //             clearStepError('ageGroup');
  //           }}
  //         >
  //           <div className="flex items-center space-x-4">
  //             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
  //               selectedAge === age
  //                 ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg scale-110'
  //                 : 'bg-gray-100 text-gray-400'
  //             }`}>
  //               <span className={`text-lg ${
  //                 selectedAge === age ? 'animate-pulse' : ''
  //               }`}>
  //                 {selectedAge === age ? '✓' : '🎂'}
  //               </span>
  //             </div>
  //             <span className="font-semibold text-gray-800 text-lg">{age}</span>

  //             {/* Selection indicator */}
  //             {selectedAge === age && (
  //               <div className="ml-auto">
  //                 <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full selection-indicator"></div>
  //               </div>
  //             )}
  //           </div>
  //         </motion.div>
  //       ))}
  //     </div>

  //     {errors.ageGroup && (
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         className="p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced"
  //       >
  //         <p className="text-red-600 text-sm flex items-center">
  //           <span className="mr-2 text-lg">⚠️</span>
  //           {errors.ageGroup.message}
  //         </p>
  //       </motion.div>
  //     )}
  //   </motion.div>
  // );

  // const renderStep3 = () => (
  //   <motion.div
  //     key="step3"
  //     initial={{ opacity: 0, x: 20 }}
  //     animate={{ opacity: 1, x: 0 }}
  //     exit={{ opacity: 0, x: -20 }}
  //     className="space-y-6"
  //   >
  //     <div className="mb-8 text-center">
  //       <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
  //         Theme Selection <span className="text-red-500">*</span>
  //       </h2>
  //       <p className="text-gray-600 text-lg">Choose a theme that matches your event vision</p>
  //       <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       {themes.map((theme) => (
  //         <motion.div
  //           key={theme.name}
  //           whileHover={{ scale: 1.03, y: -8 }}
  //           whileTap={{ scale: 0.98 }}
  //           className={`border-2 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden theme-card-enhanced ${
  //             selectedTheme === theme.name
  //               ? 'border-purple-500 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 shadow-2xl shadow-purple-200'
  //               : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-xl'
  //           }`}
  //           onClick={() => {
  //             setSelectedTheme(theme.name);
  //             setValue('theme', theme.name);
  //             clearStepError('theme');
  //           }}
  //         >
  //           {/* Enhanced Theme Image */}
  //           <div className="w-full h-56 bg-gray-100 overflow-hidden relative">
  //             <img
  //               src={theme.image}
  //               alt={theme.name}
  //               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
  //               loading="lazy"
  //               onError={(e) => {
  //                 e.target.style.display = 'none';
  //                 e.target.nextSibling.style.display = 'flex';
  //               }}
  //             />
  //             {/* Enhanced fallback icon */}
  //             <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
  //               <span className="text-6xl text-purple-400 animate-pulse">✨</span>
  //             </div>

  //             {/* Floating decorative elements */}
  //             <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
  //               <span className="text-purple-600 text-sm">🎨</span>
  //             </div>
  //           </div>

  //           {/* Enhanced Theme Details */}
  //           <div className="p-6">
  //             <div className="flex items-start justify-between mb-4">
  //               <div className="flex-1">
  //                 <h3 className="font-bold text-gray-800 text-xl mb-3">{theme.name}</h3>
  //                 <p className="text-gray-600 leading-relaxed">{theme.description}</p>
  //               </div>

  //               {/* Enhanced Selection Indicator */}
  //               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ml-4 transition-all duration-300 ${
  //                 selectedTheme === theme.name
  //                   ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg scale-110'
  //                   : 'bg-gray-100 text-gray-400'
  //               }`}>
  //                 <span className="text-xl">
  //                   {selectedTheme === theme.name ? '✓' : '✨'}
  //                 </span>
  //               </div>
  //             </div>

  //             {/* Enhanced Selection Status */}
  //             {selectedTheme === theme.name && (
  //               <motion.div
  //                 initial={{ opacity: 0, scale: 0.8 }}
  //                 animate={{ opacity: 1, scale: 1 }}
  //                 className="mt-4 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl border border-purple-200 success-state"
  //               >
  //                 <div className="flex items-center space-x-3">
  //                   <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
  //                   <span className="text-sm font-semibold text-purple-700">Theme Selected</span>
  //                 </div>
  //               </motion.div>
  //             )}
  //           </div>
  //         </motion.div>
  //       ))}
  //     </div>

  //     {errors.theme && (
  //       <motion.div
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         className="p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced"
  //       >
  //         <p className="text-red-600 text-sm flex items-center">
  //           <span className="mr-2 text-lg">⚠️</span>
  //           {errors.theme.message}
  //         </p>
  //       </motion.div>
  //     )}
  //   </motion.div>
  // );

  // const renderStep4 = () => (
  //   <motion.div
  //     key="step4"
  //     initial={{ opacity: 0, x: 20 }}
  //     animate={{ opacity: 1, x: 0 }}
  //     exit={{ opacity: 0, x: -20 }}
  //     className="space-y-6"
  //   >
  //     <div className="mb-8">
  //       <h2 className="text-2xl font-bold text-gray-800 mb-2">Food & Beverage <span className="text-red-500">*</span></h2>
  //       <p className="text-gray-600">Customize your menu to perfection</p>
  //     </div>

  //     <div className="space-y-8">
  //       {/* Step 1: Food Type Selection */}
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-3">
  //           Step 1: Select Food Type <span className="text-red-500">*</span>
  //         </label>
  //         <div className="space-y-3">
  //           {foodTypes.map((type) => (
  //             <motion.div
  //               key={type}
  //               whileHover={{ scale: 1.01 }}
  //               whileTap={{ scale: 0.99 }}
  //               className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
  //                 selectedFoodType === type
  //                   ? 'border-purple-500 bg-purple-50'
  //                   : 'border-gray-200 hover:border-gray-300'
  //               }`}
  //               onClick={() => {
  //                 setSelectedFoodType(type);
  //                 setValue('foodType', type);
  //                 clearStepError('foodType');
  //               }}
  //             >
  //               <div className="flex items-center space-x-3">
  //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
  //                   selectedFoodType === type ? 'bg-purple-100' : 'bg-gray-100'
  //                 }`}>
  //                   <span className={`text-sm ${
  //                     selectedFoodType === type ? 'text-purple-600' : 'text-gray-400'
  //                   }`}>
  //                     {selectedFoodType === type ? '✓' : '🍽️'}
  //                   </span>
  //                 </div>
  //                 <span className="font-medium text-gray-800">{type}</span>
  //               </div>
  //             </motion.div>
  //           ))}
  //         </div>
  //         {errors.foodType && (
  //           <p className="text-red-500 text-sm mt-2">⚠️ {errors.foodType.message}</p>
  //         )}
  //       </div>

  //       {/* Step 2: Course Selection - Only shown after food type is selected */}
  //       {selectedFoodType && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.2 }}
  //           className="border-t pt-6"
  //         >
  //           <label className="block text-sm font-medium text-gray-700 mb-3">
  //             Step 2: Select Courses <span className="text-red-500">*</span>
  //           </label>
  //           <p className="text-sm text-gray-600 mb-4">
  //             Based on your {selectedFoodType.toLowerCase()} preference, select one or more courses you'd like:
  //           </p>

  //           {/* Selected Courses Summary */}
  //           {selectedCourses.length > 0 && (
  //             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
  //               <div className="flex items-center space-x-2 mb-2">
  //                 <span className="text-green-600">✓</span>
  //                 <span className="text-sm font-medium text-green-800">Selected Courses:</span>
  //               </div>
  //               <div className="flex flex-wrap gap-2">
  //                 {selectedCourses.map((course) => (
  //                   <span key={course} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-300">
  //                     {course}
  //                   </span>
  //                 ))}
  //               </div>
  //             </div>
  //           )}

  //           <div className="space-y-3">
  //             {courses.map((course) => (
  //               <motion.div
  //                 key={course}
  //                 whileHover={{ scale: 1.01 }}
  //                 whileTap={{ scale: 0.99 }}
  //                 className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
  //                   selectedCourses.includes(course)
  //                     ? 'border-green-500 bg-green-50'
  //                     : 'border-gray-200 hover:border-gray-300'
  //                 }`}
  //                 onClick={() => {
  //                   setSelectedCourses(prev => {
  //                     const newCourses = [...prev];
  //                     if (newCourses.includes(course)) {
  //                       const filtered = newCourses.filter(c => c !== course);
  //                       setValue('courses', filtered);
  //                       return filtered;
  //                     } else {
  //                       const updated = [...newCourses, course];
  //                       setValue('courses', updated);
  //                       return updated;
  //                     }
  //                   });
  //                   clearStepError('courses');
  //                 }}
  //               >
  //                 <div className="flex items-center justify-between">
  //                   <div className="flex items-center space-x-3">
  //                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
  //                       selectedCourses.includes(course) ? 'bg-green-100' : 'bg-gray-100'
  //                     }`}>
  //                       <span className={`text-sm ${
  //                         selectedCourses.includes(course) ? 'text-green-600' : 'text-gray-400'
  //                       }`}>
  //                         {selectedCourses.includes(course) ? '✓' : '🥘'}
  //                       </span>
  //                     </div>
  //                     <span className="font-medium text-gray-800">{course}</span>
  //                   </div>

  //                   {/* Selection Count */}
  //                   {selectedCourses.includes(course) && (
  //                     <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
  //                       Selected
  //                     </div>
  //                   )}
  //                 </div>
  //               </motion.div>
  //             ))}
  //           </div>

  //           {errors.courses && (
  //             <p className="text-red-500 text-sm mt-2">⚠️ {errors.courses.message}</p>
  //           )}

  //           {/* Help Text */}
  //           <p className="text-xs text-gray-500 mt-3">
  //             💡 You can select multiple courses. Click on a course to select/deselect it.
  //           </p>
  //         </motion.div>
  //       )}

  //       {/* Step 3: Food Items Selection - Only shown after course is selected */}
  //       {selectedFoodType && selectedCourses.length > 0 && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.4 }}
  //           className="border-t pt-6"
  //         >
  //           <label className="block text-sm font-medium text-gray-700 mb-3">
  //             Step 3: Select Food Items (Optional)
  //           </label>
  //           <p className="text-sm text-gray-600 mb-4">
  //             Choose specific food items for your selected courses: <span className="font-medium text-purple-600">
  //               {selectedCourses.map(c => c.toLowerCase()).join(', ')}
  //             </span>
  //           </p>

  //           {/* Course-specific Food Items */}
  //           {selectedCourses.map((course) => (
  //             <div key={course} className="mb-6 border border-gray-200 rounded-lg p-4">
  //               <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
  //                 <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
  //                   <span className="text-purple-600 text-sm">🥘</span>
  //                 </span>
  //                 <span>{course}</span>
  //               </h4>
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  //                 {foodItems[course.toLowerCase().replace(' ', '')] ?
  //                   foodItems[course.toLowerCase().replace(' ', '')].map((item) => (
  //                     <label key={item} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
  //                       <input
  //                         type="checkbox"
  //                         {...register('foodItems')}
  //                         value={`${course}: ${item}`}
  //                         className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
  //                       />
  //                       <span className="text-gray-700">{item}</span>
  //                     </label>
  //                   )) :
  //                   <p className="text-gray-500 text-sm col-span-2">No specific items available for {course}</p>
  //                 }
  //               </div>
  //             </div>
  //           ))}

  //           {/* Help Text */}
  //           <p className="text-xs text-gray-500 mt-3">
  //             💡 Select the specific food items you'd like for each course. This helps us customize your menu better.
  //           </p>
  //         </motion.div>
  //       )}

  //       {/* Progress Indicator */}
  //       <div className="bg-gray-50 rounded-lg p-4">
  //         <div className="flex items-center space-x-4">
  //           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
  //             selectedFoodType ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
  //           }`}>
  //             {selectedFoodType ? '✓' : '1'}
  //           </div>
  //           <div className="flex-1">
  //             <div className="text-sm font-medium text-gray-700">Food Type</div>
  //             <div className="text-xs text-gray-500">
  //               {selectedFoodType || 'Not selected yet'}
  //             </div>
  //           </div>

  //           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
  //             selectedCourses.length > 0 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
  //           }`}>
  //             {selectedCourses.length > 0 ? '✓' : '2'}
  //           </div>
  //           <div className="flex-1">
  //             <div className="text-sm font-medium text-gray-700">Courses</div>
  //             <div className="text-xs text-gray-500">
  //               {selectedCourses.length > 0 ? selectedCourses.map(c => c).join(', ') : 'Not selected yet'}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </motion.div>
  // );

  // Render individual custom field step
  const renderCustomFieldStep = (fieldIndex) => {
    const field = customEventFormFields[fieldIndex];
    if (!field) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="mb-8 text-center">
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-50"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-50"></div>

            {/* Main heading */}
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4 relative z-10">
              {field.label}{" "}
              {field.required && (
                <span className="text-red-500 animate-pulse">*</span>
              )}
            </h2>

            {/* Enhanced description */}
            <div className="relative">
              <p className="text-gray-600 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                {field.description ||
                  `Fill out the ${field.label.toLowerCase()} information`}
              </p>

              {/* Decorative line with enhanced styling */}
              <div className="flex items-center justify-center mt-6 space-x-4">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <div className="relative z-10">
            {/* Text Input */}
            {field.type === "text" && (
              <div className="relative">
                <input
                  type="text"
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-400 text-xl">✏️</span>
                </div>
              </div>
            )}

            {/* Number Input */}
            {field.type === "number" && (
              <div className="relative">
                <input
                  type="number"
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                  min={field.validation?.min || undefined}
                  max={field.validation?.max || undefined}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-400 text-xl">🔢</span>
                </div>
              </div>
            )}

            {/* Date Input with Calendar Picker */}
            {field.type === "date" && (
              <div className="relative">
                <input
                  type="date"
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                  className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg font-medium bg-white shadow-sm hover:shadow-md cursor-pointer"
                  onClick={(e) => {
                    // Try to show the calendar picker with fallback
                    if (
                      e.target.showPicker &&
                      typeof e.target.showPicker === "function"
                    ) {
                      try {
                        e.target.showPicker();
                      } catch (error) {
                        // showPicker not supported, using focus fallback
                      }
                    }
                  }}
                  onFocus={(e) => {
                    // Try to show the calendar picker when focused
                    if (
                      e.target.showPicker &&
                      typeof e.target.showPicker === "function"
                    ) {
                      try {
                        e.target.showPicker();
                      } catch (error) {
                        // showPicker not supported, using focus fallback
                      }
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-gray-400 text-xl">📅</span>
                </div>
              </div>
            )}

            {/* Select Dropdown - Styled as Cards */}
            {field.type === "select" && (
              <div className="space-y-3">
                {field.options?.map((option, optionIndex) => {
                  const optionValue = option.value || option;
                  const optionLabel = option.label || option;
                  const isSelected = watch(field.name) === optionValue;

                  return (
                    <motion.div
                      key={optionIndex}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
                        isSelected
                          ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-purple-200"
                          : "border-gray-200 hover:border-purple-300 bg-white"
                      }`}
                      onClick={() => {
                        setValue(field.name, optionValue);
                        clearStepError(field.name);
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <span
                            className={`text-lg ${
                              isSelected ? "animate-pulse" : ""
                            }`}
                          >
                            {isSelected ? "✓" : "🎯"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-800 text-lg">
                            {optionLabel}
                          </span>
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="ml-auto">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full selection-indicator"></div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Email Input */}
            {field.type === "email" && (
              <div className="relative">
                <input
                  type="email"
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-400 text-xl">📧</span>
                </div>
              </div>
            )}

            {/* Phone Input */}
            {field.type === "phone" && (
              <div className="relative">
                <input
                  type="tel"
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-400 text-xl">📱</span>
                </div>
              </div>
            )}

            {/* Textarea */}
            {field.type === "textarea" && (
              <div className="relative">
                <textarea
                  {...register(field.name, {
                    required: field.required
                      ? `${field.label} is required`
                      : false,
                  })}
                  rows={4}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 text-lg font-medium placeholder-gray-400 bg-white shadow-sm hover:shadow-md resize-none"
                  placeholder={
                    field.placeholder || `Enter ${field.label.toLowerCase()}`
                  }
                />
                <div className="absolute top-4 right-4">
                  <span className="text-gray-400 text-xl">📝</span>
                </div>
              </div>
            )}

            {/* Theme Cards */}
            {field.type === "themeCards" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Choose from the available themes for your event:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {field.options?.map((theme, themeIndex) => {
                    const currentValue = watch(field.name);
                    const themeValue = theme.value || theme.name || themeIndex;
                    const isSelected =
                      currentValue && currentValue === themeValue;

                    return (
                      <ThemeCard
                        key={theme.value || theme.name || themeIndex}
                        theme={theme}
                        isSelected={isSelected}
                        onClick={() => {
                          const themeValue =
                            theme.value || theme.name || themeIndex;
                          setValue(field.name, themeValue);
                          trigger(field.name);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Food Menu - Dynamic API Data */}
            {field.type === "foodMenu" && (
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Food & Beverage Menu <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-gray-600">
                    Create your food menu with categories and items
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Step 1: Dietary Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Step 1: Select Dietary Type{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "veg",
                        "non-veg",
                        "vegan",
                        "egg",
                        "seafood",
                        "jain",
                      ].map((dietaryType) => {
                        const currentDietaryType = watch(
                          `${field.name}.dietaryType`
                        );
                        const normalizedCurrent =
                          normalizeDietaryType(currentDietaryType);
                        const normalizedType =
                          normalizeDietaryType(dietaryType);
                        const isSelected = normalizedCurrent === normalizedType;

                        return (
                          <motion.div
                            key={dietaryType}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => {
                              setValue(
                                `${field.name}.dietaryType`,
                                dietaryType
                              );
                              // Clear courses and food items when dietary type changes
                              setValue(`${field.name}.courses`, []);
                              setValue(`${field.name}.foodItems`, {});
                              clearStepError(field.name);
                            }}
                          >
                            <div className="flex flex-col items-center space-y-2">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isSelected ? "bg-purple-100" : "bg-gray-100"
                                }`}
                              >
                                <span
                                  className={`text-lg ${
                                    isSelected
                                      ? "text-purple-600"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {isSelected ? "✓" : "🍽️"}
                                </span>
                              </div>
                              <span className="font-medium text-gray-800 text-sm text-center">
                                {getDisplayName(dietaryType, "dietary")}
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Course Selection - Only shown after dietary type is selected */}
                  {watch(`${field.name}.dietaryType`) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="border-t pt-6"
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Step 2: Select Courses{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <p className="text-sm text-gray-600 mb-4">
                        Based on your {watch(`${field.name}.dietaryType`)}{" "}
                        preference, select one or more courses you'd like:
                      </p>

                      {/* Selected Courses Summary */}
                      {watch(`${field.name}.courses`)?.length > 0 && (
                        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-green-600">✓</span>
                            <span className="text-sm font-medium text-green-800">
                              Selected Courses:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {watch(`${field.name}.courses`)?.map((course) => (
                              <span
                                key={course}
                                className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-300"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {["Starters", "Main Course", "Desserts"].map(
                          (course) => {
                            const selectedCourses =
                              watch(`${field.name}.courses`) || [];
                            const normalizedSelected = selectedCourses.map(
                              (c) => normalizeCourseName(c)
                            );
                            const normalizedCourse =
                              normalizeCourseName(course);
                            const isSelected =
                              normalizedSelected.includes(normalizedCourse);

                            return (
                              <motion.div
                                key={course}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                  isSelected
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => {
                                  const currentCourses =
                                    watch(`${field.name}.courses`) || [];
                                  const normalizedCurrent = currentCourses.map(
                                    (c) => normalizeCourseName(c)
                                  );
                                  const normalizedCourse =
                                    normalizeCourseName(course);
                                  const newCourses = normalizedCurrent.includes(
                                    normalizedCourse
                                  )
                                    ? currentCourses.filter(
                                        (c) =>
                                          normalizeCourseName(c) !==
                                          normalizedCourse
                                      )
                                    : [...currentCourses, course];
                                  setValue(`${field.name}.courses`, newCourses);
                                  clearStepError(field.name);
                                }}
                              >
                                <div className="flex flex-col items-center space-y-2">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      isSelected
                                        ? "bg-green-100"
                                        : "bg-gray-100"
                                    }`}
                                  >
                                    <span
                                      className={`text-lg ${
                                        isSelected
                                          ? "text-green-600"
                                          : "text-gray-400"
                                      }`}
                                    >
                                      {isSelected ? "✓" : "🥘"}
                                    </span>
                                  </div>
                                  <span className="font-medium text-gray-800 text-sm text-center">
                                    {course}
                                  </span>
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </div>

                      {/* Help Text */}
                      <p className="text-xs text-gray-500 mt-3">
                        💡 You can select multiple courses. Click on a course to
                        select/deselect it.
                      </p>
                    </motion.div>
                  )}

                  {/* Step 3: Food Items Selection - Only shown after course is selected */}
                  {watch(`${field.name}.dietaryType`) &&
                    watch(`${field.name}.courses`)?.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="border-t pt-6"
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Step 3: Select Food Items (Optional)
                        </label>
                        <p className="text-sm text-gray-600 mb-4">
                          Choose specific food items for your selected courses:{" "}
                          <span className="font-medium text-purple-600">
                            {watch(`${field.name}.courses`)
                              ?.map((c) => c.toLowerCase())
                              .join(", ")}
                          </span>
                        </p>

                        {/* Course-specific Food Items */}
                        {watch(`${field.name}.courses`)?.map((course) => {
                          // Find items for this course from the API data using normalized matching
                          const normalizedCourse = normalizeCourseName(course);
                          const courseData = field.options?.find(
                            (option) =>
                              normalizeCourseName(option.categoryName) ===
                              normalizedCourse
                          );
                          const allFoodItems = courseData?.items || [];

                          // Filter food items by selected dietary type
                          const selectedDietaryType = watch(
                            `${field.name}.dietaryType`
                          );
                          const normalizedSelectedDietary =
                            normalizeDietaryType(selectedDietaryType);

                          const filteredFoodItems = allFoodItems.filter(
                            (item) => {
                              const itemDietaryType = normalizeDietaryType(
                                item.dietaryType
                              );
                              return (
                                itemDietaryType === normalizedSelectedDietary
                              );
                            }
                          );

                          return (
                            <div
                              key={course}
                              className="mb-6 border border-gray-200 rounded-lg p-4"
                            >
                              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                  <span className="text-purple-600 text-sm">
                                    🥘
                                  </span>
                                </span>
                                <span>{course}</span>
                                <span className="text-sm text-gray-500">
                                  ({filteredFoodItems.length}{" "}
                                  {normalizedSelectedDietary} items)
                                </span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {filteredFoodItems.length > 0 ? (
                                  filteredFoodItems.map((item, itemIndex) => (
                                    <label
                                      key={itemIndex}
                                      className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
                                    >
                                      <input
                                        type="checkbox"
                                        {...register(
                                          `${field.name}.foodItems.${course}`
                                        )}
                                        value={item.name}
                                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <span className="text-gray-700 font-medium">
                                            {item.name}
                                          </span>
                                        </div>
                                        {item.description && (
                                          <p className="text-xs text-gray-500 mt-1">
                                            {item.description}
                                          </p>
                                        )}
                                        <div className="flex items-center space-x-2 mt-1">
                                          {item.spiceLevel && (
                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                              {item.spiceLevel} spice
                                            </span>
                                          )}
                                          {item.isPopular === "true" && (
                                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                              Popular
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </label>
                                  ))
                                ) : (
                                  <p className="text-gray-500 text-sm col-span-2">
                                    No {normalizedSelectedDietary} items
                                    available for {course}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}

                        {/* Help Text */}
                        <p className="text-xs text-gray-500 mt-3">
                          💡 Select the specific food items you'd like for each
                          course. Only{" "}
                          {watch(`${field.name}.dietaryType`)
                            ? getDisplayName(
                                watch(`${field.name}.dietaryType`),
                                "dietary"
                              )
                            : "dietary"}{" "}
                          items are shown based on your selection.
                        </p>
                      </motion.div>
                    )}

                  {/* Progress Indicator */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          watch(`${field.name}.dietaryType`)
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {watch(`${field.name}.dietaryType`) ? "✓" : "1"}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          Dietary Type
                        </div>
                        <div className="text-xs text-gray-500">
                          {watch(`${field.name}.dietaryType`)
                            ? getDisplayName(
                                watch(`${field.name}.dietaryType`),
                                "dietary"
                              )
                            : "Not selected yet"}
                        </div>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          watch(`${field.name}.courses`)?.length > 0
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {watch(`${field.name}.courses`)?.length > 0 ? "✓" : "2"}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-700">
                          Courses
                        </div>
                        <div className="text-xs text-gray-500">
                          {watch(`${field.name}.courses`)?.length > 0
                            ? watch(`${field.name}.courses`).join(", ")
                            : "Not selected yet"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors[field.name] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm flex items-center">
                  <span className="mr-2 text-lg">⚠️</span>
                  {errors[field.name].message}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Render custom event form fields (legacy function - keeping for compatibility)
  // const renderCustomEventForm = () => (
  //   <motion.div
  //     initial={{ opacity: 0, x: 20 }}
  //     animate={{ opacity: 1, x: 0 }}
  //     exit={{ opacity: 0, x: -20 }}
  //     className="space-y-6"
  //   >
  //     <div className="mb-8 text-center">
  //       <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
  //         {selectedCustomEvent?.eventType || selectedCustomEvent?.templateName} <span className="text-red-500">*</span>
  //       </h2>
  //       <p className="text-gray-600 text-lg">Fill out the custom event form</p>
  //       <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
  //     </div>

  //     <div className="space-y-6">
  //       {customEventFormFields.map((field, index) => (
  //         <motion.div
  //           key={field.id || index}
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: index * 0.1 }}
  //           className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
  //         >
  //           <label className="block text-sm font-medium text-gray-700 mb-3">
  //             {field.label} {field.required && <span className="text-red-500">*</span>}
  //           </label>

  //           {/* Text Input */}
  //           {field.type === 'text' && (
  //             <input
  //               type="text"
  //               {...register(field.name, {
  //                 required: field.required ? `${field.label} is required` : false
  //               })}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200"
  //               placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
  //             />
  //           )}

  //           {/* Number Input */}
  //           {field.type === 'number' && (
  //             <input
  //               type="number"
  //               {...register(field.name, {
  //                 required: field.required ? `${field.label} is required` : false
  //               })}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200"
  //               placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
  //               min={field.validation?.min || undefined}
  //               max={field.validation?.max || undefined}
  //             />
  //           )}

  //           {/* Date Input with Calendar Picker */}
  //           {field.type === 'date' && (
  //             <div className="relative">
  //               <input
  //                 type="date"
  //                 {...register(field.name, {
  //                   required: field.required ? `${field.label} is required` : false
  //                 })}
  //                 className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200 cursor-pointer"
  //                 onClick={(e) => {
  //                   // Try to show the calendar picker with fallback
  //                   if (e.target.showPicker && typeof e.target.showPicker === 'function') {
  //                     try {
  //                       e.target.showPicker();
  //                     } catch (error) {
  //                       // showPicker not supported, using focus fallback
  //                     }
  //                   }
  //                 }}
  //                 onFocus={(e) => {
  //                   // Try to show the calendar picker when focused
  //                   if (e.target.showPicker && typeof e.target.showPicker === 'function') {
  //                     try {
  //                       e.target.showPicker();
  //                     } catch (error) {
  //                       // showPicker not supported, using focus fallback
  //                     }
  //                   }
  //                 }}
  //               />
  //               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
  //                 <span className="text-gray-400 text-lg">📅</span>
  //               </div>

  //             </div>
  //           )}

  //           {/* Select Dropdown */}
  //           {field.type === 'select' && (
  //             <select
  //               {...register(field.name, {
  //                 required: field.required ? `${field.label} is required` : false
  //               })}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200"
  //             >
  //               <option value="">Select {field.label.toLowerCase()}</option>
  //               {field.options?.map((option, optionIndex) => (
  //                 <option key={optionIndex} value={option.value || option}>
  //                   {option.label || option}
  //                 </option>
  //               ))}
  //             </select>
  //           )}

  //           {/* Email Input */}
  //           {field.type === 'email' && (
  //             <input
  //               type="email"
  //               {...register(field.name, {
  //                 required: field.required ? `${field.label} is required` : false,
  //                 pattern: {
  //                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //                   message: "Please enter a valid email address"
  //                 }
  //               })}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200"
  //               placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
  //             />
  //           )}

  //           {/* Phone Input */}
  //           {field.type === 'phone' && (
  //             <input
  //               type="tel"
  //               {...register(field.name, {
  //                 required: field.required ? `${field.label} is required` : false,
  //                 pattern: {
  //                   value: /^[\+]?[1-9][\d]{0,15}$/,
  //                   message: "Please enter a valid phone number"
  //                 }
  //               })}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200"
  //               placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
  //             />
  //           )}

  //           {/* Textarea */}
  //           {field.type === 'textarea' && (
  //             <textarea
  //               {...register(field.name, {
  //                 required: field.required ? `${field.label} is required` : false
  //               })}
  //               rows={4}
  //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none transition-all duration-200"
  //               placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
  //             />
  //           )}

  //           {/* Food Menu */}
  //           {field.type === 'foodMenu' && (
  //             <div className="space-y-4">
  //               <p className="text-sm text-gray-600 mb-4">
  //                 Select your preferred food options:
  //               </p>
  //               <div className="space-y-4">
  //                 {field.options?.map((category, categoryIndex) => (
  //                   <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4">
  //                     <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
  //                       <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
  //                         <span className="text-purple-600 text-sm">🍽️</span>
  //                       </span>
  //                       <span>{category.name}</span>
  //                     </h4>
  //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  //                       {category.items?.map((item, itemIndex) => (
  //                         <label key={itemIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors duration-200">
  //                           <input
  //                             type="checkbox"
  //                             {...register(`${field.name}.${category.name}`)}
  //                             value={item.name}
  //                             className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
  //                           />
  //                           <div className="flex-1">
  //                             <span className="text-gray-700 font-medium">{item.name}</span>
  //                             {item.description && (
  //                               <p className="text-xs text-gray-500">{item.description}</p>
  //                             )}
  //                             {item.price && (
  //                               <p className="text-xs text-purple-600 font-medium">₹{item.price}</p>
  //                             )}
  //                           </div>
  //                         </label>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           )}

  //           {/* Error Message */}
  //           {errors[field.name] && (
  //             <motion.div
  //               initial={{ opacity: 0, scale: 0.9 }}
  //               animate={{ opacity: 1, scale: 1 }}
  //               className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg"
  //             >
  //               <p className="text-red-600 text-sm flex items-center">
  //                 <span className="mr-2 text-lg">⚠️</span>
  //                 {errors[field.name].message}
  //               </p>
  //             </motion.div>
  //           )}
  //         </motion.div>
  //       ))}
  //     </div>
  //   </motion.div>
  // );

  const renderStepContent = () => {
    // Handle custom event flow with dynamic steps
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      if (currentStep === 1) {
        return renderStep1(); // Event Type selection
      } else {
        // Render individual custom field step
        const fieldIndex = currentStep - 2; // -2 because step 1 is event type
        return renderCustomFieldStep(fieldIndex);
      }
    }

    // Handle simplified flow (no custom event selected)
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        // Show message to select an event
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Select an Event Type
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Please go back and select a custom event type to continue with
                the form.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-yellow-800 text-sm">
                  💡 Choose from the available custom event templates to access
                  personalized form fields.
                </p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return renderStep1();
    }
  };

  // Decorative leaf SVG component
  const LeafDecoration = ({ className, rotation = 0 }) => (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M50 10C60 20 70 30 80 40C70 50 60 60 50 70C40 60 30 50 20 40C30 30 40 20 50 10Z" />
      <path d="M50 20C55 25 60 30 65 35C60 40 55 45 50 50C45 45 40 40 35 35C40 30 45 25 50 20Z" />
    </svg>
  );

  // Skeleton Loader Component for Event Cards
  const EventCardSkeleton = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 border-2 border-gray-200 rounded-2xl bg-white shadow-sm"
    >
      <div className="flex items-center space-x-4">
        {/* Skeleton icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse"></div>

        {/* Skeleton text */}
        <div className="flex-1">
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg animate-pulse w-3/4"></div>
        </div>

        {/* Skeleton selection indicator */}
        <div className="w-3 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
      </div>

      {/* Skeleton loading text */}
      <div className="mt-3 flex items-center space-x-2">
        <div className="w-4 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse w-32"></div>
      </div>
    </motion.div>
  );

  // Confirmation Modal Component
  const ConfirmationModal = ({
    isOpen,
    onConfirm,
    onCancel,
    title,
    message,
    confirmText,
    cancelText,
  }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 mb-6">{message}</p>

            <div className="flex space-x-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Close Button - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <motion.button
          onClick={handleClose}
          className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
      </div>

      {/* Fabulous Hero Heading Section */}
      <div className="relative z-20 pt-12 pb-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6"
        >
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Create Your Dream
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Event Package
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Let us craft the perfect celebration experience tailored just for
            you. From themes to menus, we'll bring your vision to life with
            style and elegance.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.6s" }}
              ></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 feature-card-magical relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Custom Themes
              </h3>
              <p className="text-gray-600 text-sm">
                Personalized themes that match your vision perfectly
              </p>
              {/* Sparkle effect */}
              <div
                className="absolute top-2 right-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 feature-card-magical relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">🍽️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Gourmet Menus
              </h3>
              <p className="text-gray-600 text-sm">
                Curated food selections for every taste and preference
              </p>
              {/* Sparkle effect */}
              <div
                className="absolute top-2 right-2 w-3 h-3 bg-pink-300 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 feature-card-magical relative"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Premium Service
              </h3>
              <p className="text-gray-600 text-sm">
                White-glove service to make your event unforgettable
              </p>
              {/* Sparkle effect */}
              <div
                className="absolute top-2 right-2 w-3 h-3 bg-blue-300 rounded-full animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </motion.div>
          </div>

          {/* Scroll Down Arrow - Left Side */}
          <div className="absolute left-8 bottom-4 z-30">
            <motion.button
              onClick={() => {
                document.querySelector(".flex.relative.z-10")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="group flex flex-col items-center space-y-2 text-purple-600 hover:text-purple-700 transition-colors duration-300"
              whileHover={{ y: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <motion.svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </div>
              <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                Scroll to Form
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-200 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-30 animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 border-2 border-pink-200 transform rotate-45 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-25 animate-spin-slow"></div>

        {/* Enhanced leaf decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 text-green-200 opacity-40">
          <LeafDecoration className="w-full h-full" rotation={45} />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 text-green-200 opacity-40">
          <LeafDecoration className="w-full h-full" rotation={-30} />
        </div>
        <div className="absolute top-32 left-16 w-24 h-24 text-green-100 opacity-30">
          <LeafDecoration className="w-full h-full" rotation={15} />
        </div>
        <div className="absolute top-24 right-24 w-28 h-28 text-green-100 opacity-30">
          <LeafDecoration className="w-full h-full" rotation={-15} />
        </div>

        {/* New floating stars */}
        <div className="absolute top-16 left-1/4 animate-float">
          <div className="w-6 h-6 text-yellow-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
        <div
          className="absolute top-32 right-1/3 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-4 h-4 text-pink-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
        <div
          className="absolute bottom-32 left-1/3 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-5 h-5 text-purple-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>

        {/* New floating circles */}
        <div
          className="absolute top-48 left-1/2 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        </div>
        <div
          className="absolute bottom-48 right-1/4 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        </div>

        {/* Additional floating particles */}
        <div
          className="absolute top-64 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute top-80 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute bottom-64 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse"
          style={{ animationDelay: "1.2s" }}
        ></div>
        <div
          className="absolute top-96 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.9s" }}
        ></div>
        <div
          className="absolute bottom-80 right-1/3 w-3 h-3 bg-green-300 rounded-full animate-pulse"
          style={{ animationDelay: "1.4s" }}
        ></div>

        {/* Additional floating particles */}
        <div
          className="absolute top-64 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute top-80 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute bottom-64 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse"
          style={{ animationDelay: "1.2s" }}
        ></div>
      </div>

      <div className="flex relative z-10">
        {/* Enhanced Left Sidebar */}
        <div className="hidden lg:block w-2/5 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 relative backdrop-blur-sm">
          {/* Enhanced decorative corner elements */}
          <div className="absolute top-0 left-0 w-24 h-24 text-purple-200 opacity-60">
            <LeafDecoration className="w-full h-full" rotation={0} />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 text-purple-200 opacity-60">
            <LeafDecoration className="w-full h-full" rotation={180} />
          </div>

          {/* New corner accents */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-bl-full opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-tr-full opacity-40"></div>

          <div className="sticky top-8">
            {/* Enhanced Logo */}
            <div className="mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-xl font-bold">E</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent">
                  Eevagga
                </span>
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div className="mb-8">
              <div className="relative group">
                <div className="w-full h-72 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <span className="text-8xl transform group-hover:rotate-12 transition-transform duration-500">
                    🎉
                  </span>
                </div>
                <div className="absolute inset-0 border-4 border-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-3xl opacity-60"></div>

                {/* Floating elements around hero */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce"></div>
                <div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute -bottom-2 -left-2 w-5 h-5 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-300 rounded-full animate-bounce"
                  style={{ animationDelay: "1.5s" }}
                ></div>
              </div>
            </div>

            {/* Enhanced Introduction */}
            <div className="mb-8">
              <div className="text-center relative">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent">
                    Your Event Requirements
                  </h3>
                  <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Let's start with these details to help us create your
                  personalized package, which will include theme suggestions,
                  decor ideas, food options and more.
                </p>

                {/* Decorative dots */}
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Enhanced Progress Indicators */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-3">
                  Progress
                </h4>
                <div className="w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full h-3 shadow-inner">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 h-3 rounded-full shadow-lg transition-all duration-500 ease-out progress-enhanced"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(currentStep / steps.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-purple-600 mt-3 font-medium">
                  Step {currentStep} of {steps.length} •{" "}
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </p>
              </div>

              {/* Enhanced Current Step Highlight */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-10 -mt-10 opacity-60"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">
                        {currentStep}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-800 text-lg">
                        {getStepTitle()}
                      </h5>
                      <p className="text-sm text-gray-600">Current step</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced decorative bottom element */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-full flex items-center justify-center mx-auto opacity-60 shadow-lg">
                <span className="text-purple-600 text-3xl">✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right Column - Form */}
        <div className="w-full lg:w-3/5 p-8 relative">
          {/* Enhanced Form Container */}
          <div className="max-w-2xl">
            {/* Enhanced Progress Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Step {currentStep}/{steps.length}
                </span>
                <span className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent">
                  {getStepTitle()}
                </span>
                <button className="ml-2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Step description with enhanced styling */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                <p className="text-gray-600 text-center font-medium">
                  {getStepDescription(currentStep)}
                </p>
              </div>
            </div>

            {/* Enhanced Form Content */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* Enhanced Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <motion.button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 1}
                  className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 btn-enhanced ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                      : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400"
                  }`}
                  whileHover={currentStep === 1 ? {} : { scale: 1.02 }}
                  whileTap={currentStep === 1 ? {} : { scale: 0.98 }}
                >
                  ← Back
                </motion.button>

                {currentStep < steps.length ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedEventType} // Disable if no event selected
                    className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced ${
                      !selectedEventType
                        ? "bg-gray-400 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700"
                    }`}
                    whileHover={!selectedEventType ? {} : { scale: 1.02 }}
                    whileTap={!selectedEventType ? {} : { scale: 0.98 }}
                  >
                    Next →
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting || !selectedEventType} // Disable if no event selected
                    className={`px-10 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced ${
                      isSubmitting || !selectedEventType
                        ? "bg-gray-400 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700"
                    }`}
                    whileHover={
                      isSubmitting || !selectedEventType ? {} : { scale: 1.02 }
                    }
                    whileTap={
                      isSubmitting || !selectedEventType ? {} : { scale: 0.98 }
                    }
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "✨ Submit Package Request"
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Enhanced Confirmation Modals */}
      <ConfirmationModal
        isOpen={showCloseConfirm}
        onConfirm={confirmClose}
        onCancel={cancelAction}
        title="Leave This Page?"
        message="Are you sure you want to leave this page? You may lose any progress you've made."
        confirmText="Yes, Leave"
        cancelText="Stay Here"
      />

      <ConfirmationModal
        isOpen={showBackConfirm}
        onConfirm={confirmBack}
        onCancel={cancelAction}
        title="Leave This Page?"
        message="Are you sure you want to leave this page? You may lose any progress you've made."
        confirmText="Yes, Leave"
        cancelText="Stay Here"
      />

      <ConfirmationModal
        isOpen={showRefreshConfirm}
        onConfirm={confirmRefresh}
        onCancel={cancelAction}
        title="Refresh Page?"
        message="Are you sure you want to refresh this page? This will reset your form and any progress you've made."
        confirmText="Yes, Refresh"
        cancelText="Stay Here"
      />

      {/* Success/Error Popup Modal */}
      <SuccessModal
        isOpen={showSuccessPopup}
        onClose={handleSuccessClose}
        isSuccess={submissionSuccess}
        title={
          submissionSuccess
            ? "Request Submitted Successfully!"
            : "Submission Failed"
        }
        message={
          submissionSuccess
            ? "Your response has been saved. We will contact you soon with more details about your custom event package."
            : submissionError ||
              "An unexpected error occurred. Please try again."
        }
        buttonText={submissionSuccess ? "Great! Take me home" : "Try Again"}
      />
    </div>
  );
}

// ===== FORM COMPONENTS =====

// Enhanced Card Component for Event Types and Age Groups
// const FormCard = ({
//   title,
//   icon,
//   isSelected,
//   onClick,
//   className = "",
//   children
// }) => (
//   <motion.div
//     whileHover={{ scale: 1.02, y: -4 }}
//     whileTap={{ scale: 0.98 }}
//     className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
//       isSelected
//         ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-purple-200'
//         : 'border-gray-200 hover:border-purple-300 bg-white'
//     } ${className}`}
//     onClick={onClick}
//   >
//     <div className="flex items-center space-x-4">
//       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
//         isSelected
//           ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110'
//           : 'bg-gray-100 text-gray-400'
//       }`}>
//         <span className={`text-lg ${
//           isSelected ? 'animate-pulse' : ''
//         }`}>
//           {isSelected ? '✓' : icon}
//         </span>
//       </div>
//       <span className="font-semibold text-gray-800 text-lg">{title}</span>

//       {/* Selection indicator */}
//       {isSelected && (
//         <div className="ml-auto">
//           <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full selection-indicator"></div>
//         </div>
//       )}
//     </div>
//     {children}
//   </motion.div>
// );

// Enhanced Theme Card Component
const ThemeCard = ({ theme, isSelected, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -8 }}
    whileTap={{ scale: 0.98 }}
    className={`border-2 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden theme-card-enhanced ${
      isSelected
        ? "border-purple-500 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 shadow-2xl shadow-purple-200"
        : "border-gray-200 hover:border-purple-300 bg-white hover:shadow-xl"
    }`}
    onClick={onClick}
  >
    {/* Enhanced Theme Image */}
    <div className="w-full h-56 bg-gray-100 overflow-hidden relative">
      <img
        src={theme.image}
        alt={theme.name}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      {/* Enhanced fallback icon */}
      <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <span className="text-6xl text-purple-400 animate-pulse">✨</span>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
        <span className="text-purple-600 text-sm">🎨</span>
      </div>
    </div>

    {/* Enhanced Theme Details */}
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-xl mb-3">{theme.name}</h3>
          <p className="text-gray-600 leading-relaxed">{theme.description}</p>
        </div>

        {/* Enhanced Selection Indicator */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ml-4 transition-all duration-300 ${
            isSelected
              ? "bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg scale-110"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <span className="text-xl">{isSelected ? "✓" : "✨"}</span>
        </div>
      </div>

      {/* Enhanced Selection Status */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl border border-purple-200 success-state"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-purple-700">
              Theme Selected
            </span>
          </div>
        </motion.div>
      )}
    </div>
  </motion.div>
);

// Enhanced Food Type Card Component
// const FoodTypeCard = ({
//   type,
//   isSelected,
//   onClick
// }) => (
//   <motion.div
//     whileHover={{ scale: 1.01 }}
//     whileTap={{ scale: 0.99 }}
//     className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//       isSelected
//         ? 'border-purple-500 bg-purple-50'
//         : 'border-gray-200 hover:border-gray-300'
//     }`}
//     onClick={onClick}
//   >
//     <div className="flex items-center space-x-3">
//       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//         isSelected ? 'bg-purple-100' : 'bg-gray-100'
//       }`}>
//         <span className={`text-sm ${
//           isSelected ? 'text-purple-600' : 'text-gray-400'
//         }`}>
//           {isSelected ? '✓' : '🍽️'}
//         </span>
//       </div>
//       <span className="font-medium text-gray-800">{type}</span>
//     </div>
//   </motion.div>
// );

// Enhanced Course Selection Card Component
// const CourseCard = ({
//   course,
//   isSelected,
//   onClick
// }) => (
//   <motion.div
//     whileHover={{ scale: 1.01 }}
//     whileTap={{ scale: 0.99 }}
//     className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
//       isSelected
//         ? 'border-green-500 bg-green-50'
//         : 'border-gray-200 hover:border-gray-300'
//     }`}
//     onClick={onClick}
//   >
//     <div className="flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//           isSelected ? 'bg-green-100' : 'bg-gray-100'
//         }`}>
//           <span className={`text-sm ${
//             isSelected ? 'text-green-600' : 'text-gray-400'
//           }`}>
//             {isSelected ? '✓' : '🥘'}
//           </span>
//         </div>
//         <span className="font-medium text-gray-800">{course}</span>
//       </div>

//       {/* Selection Count */}
//       {isSelected && (
//         <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
//           Selected
//         </div>
//       )}
//     </div>
//   </motion.div>
// );

// Enhanced Form Input Component
// const FormInput = ({
//   label,
//   type = "text",
//   placeholder,
//   required = false,
//   error,
//   register,
//   name,
//   className = "",
//   ...props
// }) => (
//   <div className={className}>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <input
//       type={type}
//       {...register(name, { required: required ? `${label} is required` : false })}
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//       placeholder={placeholder}
//       {...props}
//     />
//     {error && (
//       <p className="text-red-500 text-sm mt-1">{error.message}</p>
//     )}
//   </div>
// );

// Enhanced Form Select Component
// const FormSelect = ({
//   label,
//   options,
//   placeholder,
//   required = false,
//   error,
//   register,
//   name,
//   className = "",
//   ...props
// }) => (
//   <div className={className}>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <select
//       {...register(name, { required: required ? `${label} is required` : false })}
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//       {...props}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((option) => (
//         <option key={option.value || option} value={option.value || option}>
//           {option.label || option}
//         </option>
//       ))}
//     </select>
//     {error && (
//       <p className="text-red-500 text-sm mt-1">{error.message}</p>
//     )}
//   </div>
// );

// Enhanced Form Textarea Component
// const FormTextarea = ({
//   label,
//   placeholder,
//   required = false,
//   error,
//   register,
//   name,
//   rows = 4,
//   className = "",
//   ...props
// }) => (
//   <div className={className}>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       {label} {required && <span className="text-red-500">*</span>}
//     </label>
//     <textarea
//       {...register(name)}
//       rows={rows}
//       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//       placeholder={placeholder}
//       {...props}
//     />
//     {error && (
//       <p className="text-red-500 text-sm mt-1">{error.message}</p>
//     )}
//   </div>
// );

// Enhanced Checkbox Component
// const FormCheckbox = ({
//   label,
//   name,
//   register,
//   value,
//   className = "",
//   ...props
// }) => (
//   <label className={`flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 ${className}`}>
//     <input
//       type="checkbox"
//       {...register(name)}
//       value={value}
//       className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
//       {...props}
//     />
//     <span className="text-gray-700">{label}</span>
//   </label>
// );

// Enhanced Error Message Component
// const ErrorMessage = ({ error, className = "" }) => {
//   if (!error) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className={`p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced ${className}`}
//     >
//       <p className="text-red-600 text-sm flex items-center">
//         <span className="mr-2 text-lg">⚠️</span>
//         {error.message}
//       </p>
//     </motion.div>
//   );
// };

// Enhanced Progress Bar Component
// const ProgressBar = ({ currentStep, totalSteps, className = "" }) => (
//   <div className={`text-center mb-6 ${className}`}>
//     <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-3">
//       Progress
//     </h4>
//     <div className="w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full h-3 shadow-inner">
//       <motion.div
//         className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 h-3 rounded-full shadow-lg transition-all duration-500 ease-out progress-enhanced"
//         initial={{ width: 0 }}
//         animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
//       />
//     </div>
//     <p className="text-sm text-purple-600 mt-3 font-medium">
//       Step {currentStep} of {totalSteps} • {Math.round((currentStep / totalSteps) * 100)}% Complete
//     </p>
//   </div>
// );

// Enhanced Step Header Component
// const StepHeader = ({
//   stepNumber,
//   totalSteps,
//   title,
//   description,
//   className = ""
// }) => (
//   <div className={`mb-8 ${className}`}>
//     <div className="flex items-center space-x-3 mb-3">
//       <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step {stepNumber}/{totalSteps}</span>
//       <span className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent">
//         {title}
//       </span>
//       <button className="ml-2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </button>
//     </div>

//     {/* Step description with enhanced styling */}
//     <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl p-4 border border-purple-100">
//       <p className="text-gray-600 text-center font-medium">
//         {description}
//       </p>
//     </div>
//   </div>
// );

// Enhanced Navigation Buttons Component
// const NavigationButtons = ({
//   currentStep,
//   totalSteps,
//   onBack,
//   onNext,
//   onSubmit,
//   isLastStep = false,
//   className = ""
// }) => (
//   <div className={`flex justify-between pt-8 ${className}`}>
//     <motion.button
//       type="button"
//       onClick={onBack}
//       disabled={currentStep === 1}
//       className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 btn-enhanced ${
//         currentStep === 1
//           ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
//           : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
//       }`}
//       whileHover={currentStep === 1 ? {} : { scale: 1.02 }}
//       whileTap={currentStep === 1 ? {} : { scale: 0.98 }}
//     >
//       ← Back
//     </motion.button>

//     {!isLastStep ? (
//       <motion.button
//         type="button"
//         onClick={onNext}
//         className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         Next →
//       </motion.button>
//     ) : (
//       <motion.button
//         type="button"
//         onClick={onSubmit}
//         className="px-10 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         ✨ Submit Package Request
//       </motion.button>
//     )}
//   </div>
// );

export default CustomPackages;
