import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useServices from '../hooks/useServices';
import commonApis from '../services/commonApis';

function CustomPackages() {
  const navigate = useNavigate();
  
  // Form data
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedFoodType, setSelectedFoodType] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showRefreshConfirm, setShowRefreshConfirm] = useState(false);


  // Custom Events API state
  const [customEventNames, setCustomEventNames] = useState([]);
  const [selectedCustomEvent, setSelectedCustomEvent] = useState(null);
  const [customEventFormFields, setCustomEventFormFields] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [isLoadingEventDetails, setIsLoadingEventDetails] = useState(false);
  const [customEventError, setCustomEventError] = useState(null);

  // API hooks
  const { callApi: getEventNames } = useServices(commonApis.getPublicCustomEventNames);
  const { callApi: getEventDetails } = useServices(commonApis.getPublicCustomEventById);

  // Steps array - always use custom event flow since we only show API events
  const getSteps = () => {
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      return ['Event Type', 'Custom Event Form', 'Additional Details'];
    }
    return ['Event Type', 'Additional Details']; // Simplified flow when no custom event selected
  };
  
  const steps = getSteps();

  // Step descriptions
  const getStepDescription = (stepNumber) => {
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      const customDescriptions = {
        1: 'Choose the type of event you\'re planning',
        2: 'Fill out the custom event form',
        3: 'Add final details and requirements'
      };
      return customDescriptions[stepNumber] || '';
    }
    
    const descriptions = {
      1: 'Choose the type of event you\'re planning',
      2: 'Add final details and requirements'
    };
    return descriptions[stepNumber] || '';
  };

  // Step titles
  const getStepTitle = () => {
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      const customTitles = {
        1: 'Event Type',
        2: 'Custom Event Form',
        3: 'Additional Details'
      };
      return customTitles[currentStep] || '';
    }
    
    const titles = {
      1: 'Event Type',
      2: 'Additional Details'
    };
    return titles[currentStep] || '';
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm();

  // Check if form has any data - more comprehensive check
  const formValues = watch();
  const hasFormData = selectedEventType || selectedAge || selectedTheme || selectedFoodType || selectedCourses.length > 0 || 
    formValues.guestCount || formValues.eventDate || formValues.budgetRange || formValues.specialRequirements || 
    (formValues.foodItems && formValues.foodItems.length > 0);

  // Debug: Log form data state
  useEffect(() => {
    console.log('Form data state:', {
      selectedEventType,
      selectedAge,
      selectedTheme,
      selectedFoodType,
      selectedCourses,
      formValues,
      hasFormData
    });
  }, [selectedEventType, selectedAge, selectedTheme, selectedFoodType, selectedCourses, hasFormData, formValues]);

  // Fetch custom event names on component mount
  useEffect(() => {
    const fetchCustomEventNames = async () => {
      try {
        setIsLoadingEvents(true);
        setCustomEventError(null);
        const response = await getEventNames();
        
        if (response && response.success) {
          console.log('Custom events API response:', response);
          setCustomEventNames(response.data?.events || []);
        } else {
          setCustomEventError('Failed to fetch custom events');
        }
      } catch (err) {
        console.error('Error fetching custom event names:', err);
        setCustomEventError('Error fetching custom events');
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchCustomEventNames();
  }, []); // Empty dependency array - only run once on mount



  // Handle keyboard refresh attempts (Ctrl+R, F5)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Detect Ctrl+R or F5
      if ((e.ctrlKey && e.key === 'r') || e.key === 'F5') {
        e.preventDefault();
        setShowRefreshConfirm(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Enhanced navigation protection
  useEffect(() => {
    // Store the current URL
    const currentUrl = window.location.href;
    console.log('Setting up navigation protection for URL:', currentUrl);
    
    // Function to check if URL changed (indicating navigation)
    const checkNavigation = () => {
      if (window.location.href !== currentUrl) {
        console.log('Navigation detected! URL changed from', currentUrl, 'to', window.location.href);
        // URL changed, show navigation confirmation
        setShowBackConfirm(true);
        // Reset URL to prevent actual navigation
        window.history.pushState(null, '', currentUrl);
      }
    };

    // Check for navigation attempts periodically
    const navigationCheck = setInterval(checkNavigation, 100);

    // Enhanced beforeunload handler
    const handleBeforeUnload = (e) => {
      console.log('Beforeunload event triggered');
      // Set flag for refresh detection
      sessionStorage.setItem('showRefreshModal', 'true');
      
      // Try to prevent the unload
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave this page?';
      return 'Are you sure you want to leave this page?';
    };

    // Enhanced popstate handler
    const handlePopState = (e) => {
      console.log('Popstate event triggered');
      e.preventDefault();
      setShowBackConfirm(true);
      // Push current state back
      window.history.pushState(null, '', currentUrl);
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    
    // Push initial state
    window.history.pushState(null, '', currentUrl);

    return () => {
      clearInterval(navigationCheck);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Handle page refresh attempts (including browser refresh button)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Always show warning, regardless of form data
      e.preventDefault();
      e.returnValue = '';
      
      // Set a flag to show refresh modal when page loads
      sessionStorage.setItem('showRefreshModal', 'true');
      
      // Return empty string to prevent browser's default popup
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Handle visibility change (when page becomes visible after refresh)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const shouldShowRefreshModal = sessionStorage.getItem('showRefreshModal');
        if (shouldShowRefreshModal) {
          sessionStorage.removeItem('showRefreshModal');
          setShowRefreshConfirm(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Handle page hide (when page is being refreshed or closed)
  useEffect(() => {
    const handlePageHide = (e) => {
      // Always set flag for refresh detection
      sessionStorage.setItem('showRefreshModal', 'true');
    };

    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, []);

  // Clean up session storage flags on component mount
  useEffect(() => {
    // Clear any existing refresh flags when component mounts
    sessionStorage.removeItem('showRefreshModal');
  }, []);

  // Handle custom event selection
  const handleCustomEventSelection = async (eventId) => {
    try {
      setIsLoadingEventDetails(true);
      setCustomEventError(null);
      const response = await getEventDetails(eventId);
      
      if (response && response.success) {
        setSelectedCustomEvent(response.data);
        setCustomEventFormFields(response.data.eventFormFields || []);
        // Set the event type to the custom event name
        setSelectedEventType(response.data.eventType || response.data.templateName);
        setValue('eventType', response.data.eventType || response.data.templateName);
        clearStepError('eventType');
      } else {
        setCustomEventError('Failed to fetch event details');
      }
    } catch (err) {
      console.error('Error fetching event details:', err);
      setCustomEventError('Error fetching event details');
    } finally {
      setIsLoadingEventDetails(false);
    }
  };

  // Combine static event types with custom events
  const eventTypes = [
    'Birthday Party',
    'Wedding',
    'Corporate Event',
    'Baby Shower',
    'Anniversary',
    'Graduation Party',
    'Other'
  ];



  const ageGroups = [
    '1 year',
    '2-3 years',
    '4-6 years',
    '7-10 years',
    '11-15 years',
    '16+ years'
  ];

  const themes = [
    {
      name: 'Princess & Prince',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Royal elegance with crowns and castles'
    },
    {
      name: 'Superhero',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Action-packed with capes and powers'
    },
    {
      name: 'Jungle Safari',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Wild adventure with animals and nature'
    },
    {
      name: 'Space & Galaxy',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Cosmic exploration with stars and planets'
    },
    {
      name: 'Underwater World',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Ocean adventure with sea creatures'
    },
    {
      name: 'Fairy Tale',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Magical stories with enchanted elements'
    },
    {
      name: 'Sports',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Athletic energy with team spirit'
    },
    {
      name: 'Art & Craft',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Creative expression with colors and materials'
    },
    {
      name: 'Custom Theme',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=500&h=400&fit=crop&crop=center&q=80',
      description: 'Your unique vision brought to life'
    }
  ];

  // Food types
  const foodTypes = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Mixed'];

  // Course options
  const courses = ['Starters', 'Main Course', 'Desserts', 'Beverages'];

  // Food items by category
  const foodItems = {
    starters: [
      'Spring Rolls',
      'Paneer Tikka',
      'Veg Manchurian',
      'Chicken Wings',
      'French Fries',
      'Onion Rings'
    ],
    mainCourse: [
      'Butter Chicken',
      'Paneer Butter Masala',
      'Dal Makhani',
      'Biryani',
      'Naan/Roti',
      'Rice'
    ],
    desserts: [
      'Ice Cream',
      'Cake',
      'Gulab Jamun',
      'Jalebi',
      'Fruit Salad'
    ],
    beverages: [
      'Soft Drinks',
      'Juices',
      'Milkshakes',
      'Tea/Coffee',
      'Mocktails'
    ]
  };

  const nextStep = () => {
    // Validate current step using React Hook Form
    if (currentStep === 1) {
      if (!selectedEventType) {
        setError('eventType', { type: 'required', message: 'Please select an event type to continue' });
        return;
      }
    }
    
    if (currentStep === 2) {
      if (!selectedAge) {
        setError('ageGroup', { type: 'required', message: 'Please select an age group to continue' });
        return;
      }
    }
    
    if (currentStep === 3) {
      if (!selectedTheme) {
        setError('theme', { type: 'required', message: 'Please select a theme to continue' });
        return;
      }
    }
    
    if (currentStep === 4) {
      if (!selectedFoodType) {
        setError('foodType', { type: 'required', message: 'Please select a food type to continue' });
        return;
      }
      if (selectedCourses.length === 0) {
        setError('courses', { type: 'required', message: 'Please select at least one course to continue' });
        return;
      }
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };



  const handleClose = () => {
    // Always show confirmation, regardless of form data
    setShowCloseConfirm(true);
  };

  const handleBackNavigation = () => {
    // Always show confirmation, regardless of form data
    setShowBackConfirm(true);
  };

  const confirmClose = () => {
    setShowCloseConfirm(false);
    // Reset form and navigate to home page
    setCurrentStep(1);
    setSelectedEventType('');
    setSelectedAge('');
    setSelectedTheme('');
    setSelectedFoodType('');
    setSelectedCourses([]);
    // Navigate to home page
    navigate('/');
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    // Reset form and navigate to home page
    setCurrentStep(1);
    setSelectedEventType('');
    setSelectedAge('');
    setSelectedTheme('');
    setSelectedFoodType('');
    setSelectedCourses([]);
    // Navigate to home page
    navigate('/');
    }

  const cancelAction = () => {
    setShowCloseConfirm(false);
    setShowBackConfirm(false);
    setShowRefreshConfirm(false);
  };

  const confirmRefresh = () => {
    setShowRefreshConfirm(false);
    // Reset form and refresh
    setCurrentStep(1);
    setSelectedEventType('');
    setSelectedAge('');
    setSelectedTheme('');
    setSelectedFoodType('');
    setSelectedCourses([]);
    window.location.reload();
  };

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Here you'll integrate with your API later
  };

  const clearStepError = (fieldName) => {
    // Clear error by setting the value again, which triggers React Hook Form to re-validate
    if (fieldName === 'eventType' && selectedEventType) {
      setValue('eventType', selectedEventType);
    } else if (fieldName === 'ageGroup' && selectedAge) {
      setValue('ageGroup', selectedAge);
    } else if (fieldName === 'theme' && selectedTheme) {
      setValue('theme', selectedTheme);
    } else if (fieldName === 'foodType' && selectedFoodType) {
      setValue('foodType', selectedFoodType);
    } else if (fieldName === 'courses' && selectedCourses.length > 0) {
      setValue('courses', selectedCourses);
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
        <p className="text-gray-600 text-lg">What type of event are you planning?</p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-4"></div>
      </div>

      {/* Loading state */}
      {isLoadingEvents && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="text-gray-600 mt-2">Loading custom events...</p>
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
        {customEventNames.length > 0 ? (
          customEventNames.map((customEvent) => (
            <motion.div
              key={customEvent._id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
                selectedEventType === (customEvent.eventType || customEvent.templateName)
                  ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-purple-200'
                  : 'border-gray-200 hover:border-purple-300 bg-white'
              }`}
              onClick={() => handleCustomEventSelection(customEvent._id)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  selectedEventType === (customEvent.eventType || customEvent.templateName)
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className={`text-lg ${
                    selectedEventType === (customEvent.eventType || customEvent.templateName) ? 'animate-pulse' : ''
                  }`}>
                    {selectedEventType === (customEvent.eventType || customEvent.templateName) ? '✓' : '🎉'}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-gray-800 text-lg">
                    {customEvent.eventType || customEvent.templateName}
                  </span>
                </div>
                
                {/* Selection indicator */}
                {selectedEventType === (customEvent.eventType || customEvent.templateName) && (
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full selection-indicator"></div>
                  </div>
                )}
              </div>
              
              {/* Loading indicator for event details */}
              {isLoadingEventDetails && selectedEventType === (customEvent.eventType || customEvent.templateName) && (
                <div className="mt-3 flex items-center space-x-2 text-purple-600">
                  <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <span className="text-sm">Loading event details...</span>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          !isLoadingEvents && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">📝</span>
              </div>
              <p className="text-gray-500">No custom event templates available</p>
            </div>
          )
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

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
          Age Group <span className="text-red-500">*</span>
        </h2>
        <p className="text-gray-600 text-lg">What's the age group for this event?</p>
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mt-4"></div>
      </div>

      <div className="space-y-3">
        {ageGroups.map((age) => (
          <motion.div
            key={age}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
              selectedAge === age
                ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-200'
                : 'border-gray-200 hover:border-green-300 bg-white'
            }`}
            onClick={() => {
              setSelectedAge(age);
              setValue('ageGroup', age);
              clearStepError('ageGroup');
            }}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                selectedAge === age 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg scale-110' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <span className={`text-lg ${
                  selectedAge === age ? 'animate-pulse' : ''
                }`}>
                  {selectedAge === age ? '✓' : '🎂'}
                </span>
              </div>
              <span className="font-semibold text-gray-800 text-lg">{age}</span>
              
              {/* Selection indicator */}
              {selectedAge === age && (
                <div className="ml-auto">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full selection-indicator"></div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {errors.ageGroup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced"
        >
          <p className="text-red-600 text-sm flex items-center">
            <span className="mr-2 text-lg">⚠️</span>
            {errors.ageGroup.message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
          Theme Selection <span className="text-red-500">*</span>
        </h2>
        <p className="text-gray-600 text-lg">Choose a theme that matches your event vision</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.name}
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden theme-card-enhanced ${
              selectedTheme === theme.name
                ? 'border-purple-500 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 shadow-2xl shadow-purple-200'
                : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-xl'
            }`}
            onClick={() => {
              setSelectedTheme(theme.name);
              setValue('theme', theme.name);
              clearStepError('theme');
            }}
          >
            {/* Enhanced Theme Image */}
            <div className="w-full h-56 bg-gray-100 overflow-hidden relative">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
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
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ml-4 transition-all duration-300 ${
                  selectedTheme === theme.name 
                    ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg scale-110' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-xl">
                    {selectedTheme === theme.name ? '✓' : '✨'}
                  </span>
                </div>
              </div>
              
              {/* Enhanced Selection Status */}
              {selectedTheme === theme.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-xl border border-purple-200 success-state"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-purple-700">Theme Selected</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {errors.theme && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced"
        >
          <p className="text-red-600 text-sm flex items-center">
            <span className="mr-2 text-lg">⚠️</span>
            {errors.theme.message}
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Food & Beverage <span className="text-red-500">*</span></h2>
        <p className="text-gray-600">Customize your menu to perfection</p>
      </div>

      <div className="space-y-8">
        {/* Step 1: Food Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Step 1: Select Food Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {foodTypes.map((type) => (
              <motion.div
                key={type}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedFoodType === type
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedFoodType(type);
                  setValue('foodType', type);
                  clearStepError('foodType');
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedFoodType === type ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <span className={`text-sm ${
                      selectedFoodType === type ? 'text-purple-600' : 'text-gray-400'
                    }`}>
                      {selectedFoodType === type ? '✓' : '🍽️'}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">{type}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {errors.foodType && (
            <p className="text-red-500 text-sm mt-2">⚠️ {errors.foodType.message}</p>
          )}
        </div>

        {/* Step 2: Course Selection - Only shown after food type is selected */}
        {selectedFoodType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t pt-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Step 2: Select Courses <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-4">
              Based on your {selectedFoodType.toLowerCase()} preference, select one or more courses you'd like:
            </p>
            
            {/* Selected Courses Summary */}
            {selectedCourses.length > 0 && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm font-medium text-green-800">Selected Courses:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCourses.map((course) => (
                    <span key={course} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-300">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {courses.map((course) => (
                <motion.div
                  key={course}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCourses.includes(course)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedCourses(prev => {
                      const newCourses = [...prev];
                      if (newCourses.includes(course)) {
                        const filtered = newCourses.filter(c => c !== course);
                        setValue('courses', filtered);
                        return filtered;
                      } else {
                        const updated = [...newCourses, course];
                        setValue('courses', updated);
                        return updated;
                      }
                    });
                    clearStepError('courses');
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedCourses.includes(course) ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <span className={`text-sm ${
                          selectedCourses.includes(course) ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {selectedCourses.includes(course) ? '✓' : '🥘'}
                        </span>
                      </div>
                      <span className="font-medium text-gray-800">{course}</span>
                    </div>
                    
                    {/* Selection Count */}
                    {selectedCourses.includes(course) && (
                      <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Selected
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {errors.courses && (
              <p className="text-red-500 text-sm mt-2">⚠️ {errors.courses.message}</p>
            )}
            
            {/* Help Text */}
            <p className="text-xs text-gray-500 mt-3">
              💡 You can select multiple courses. Click on a course to select/deselect it.
            </p>
          </motion.div>
        )}

        {/* Step 3: Food Items Selection - Only shown after course is selected */}
        {selectedFoodType && selectedCourses.length > 0 && (
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
              Choose specific food items for your selected courses: <span className="font-medium text-purple-600">
                {selectedCourses.map(c => c.toLowerCase()).join(', ')}
              </span>
            </p>
            
            {/* Course-specific Food Items */}
            {selectedCourses.map((course) => (
              <div key={course} className="mb-6 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-sm">🥘</span>
                  </span>
                  <span>{course}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {foodItems[course.toLowerCase().replace(' ', '')] ? 
                    foodItems[course.toLowerCase().replace(' ', '')].map((item) => (
                      <label key={item} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                        <input
                          type="checkbox"
                          {...register('foodItems')}
                          value={`${course}: ${item}`}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    )) : 
                    <p className="text-gray-500 text-sm col-span-2">No specific items available for {course}</p>
                  }
                </div>
              </div>
            ))}
            
            {/* Help Text */}
            <p className="text-xs text-gray-500 mt-3">
              💡 Select the specific food items you'd like for each course. This helps us customize your menu better.
            </p>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedFoodType ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {selectedFoodType ? '✓' : '1'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700">Food Type</div>
              <div className="text-xs text-gray-500">
                {selectedFoodType || 'Not selected yet'}
              </div>
            </div>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              selectedCourses.length > 0 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {selectedCourses.length > 0 ? '✓' : '2'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-700">Courses</div>
              <div className="text-xs text-gray-500">
                {selectedCourses.length > 0 ? selectedCourses.map(c => c).join(', ') : 'Not selected yet'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Render custom event form fields
  const renderCustomEventForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-4">
          {selectedCustomEvent?.eventType || selectedCustomEvent?.templateName} <span className="text-red-500">*</span>
        </h2>
        <p className="text-gray-600 text-lg">Fill out the custom event form</p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-4"></div>
      </div>

      <div className="space-y-6">
        {customEventFormFields.map((field, index) => (
          <div key={field.id || index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            
            {field.type === 'text' && (
              <input
                type="text"
                {...register(field.name, { 
                  required: field.required ? `${field.label} is required` : false 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              />
            )}
            
            {field.type === 'number' && (
              <input
                type="number"
                {...register(field.name, { 
                  required: field.required ? `${field.label} is required` : false 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                min={field.validation?.min || undefined}
                max={field.validation?.max || undefined}
              />
            )}
            
            {field.type === 'date' && (
              <input
                type="date"
                {...register(field.name, { 
                  required: field.required ? `${field.label} is required` : false 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            )}
            
            {field.type === 'select' && (
              <select
                {...register(field.name, { 
                  required: field.required ? `${field.label} is required` : false 
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select {field.label.toLowerCase()}</option>
                {field.options?.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value || option}>
                    {option.label || option}
                  </option>
                ))}
              </select>
            )}
            
            {field.type === 'textarea' && (
              <textarea
                {...register(field.name, { 
                  required: field.required ? `${field.label} is required` : false 
                })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              />
            )}
            
            {field.type === 'themeCards' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Theme cards will be displayed here. This is a complex field type that requires special handling.
                </p>
                {/* You can expand this to show theme cards if needed */}
              </div>
            )}
            
            {field.type === 'foodMenu' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Food menu will be displayed here. This is a complex field type that requires special handling.
                </p>
                {/* You can expand this to show food menu if needed */}
              </div>
            )}
            
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-2">{errors[field.name].message}</p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Additional Details</h2>
        <p className="text-gray-600">Help us understand your requirements better</p>
      </div>

      <div className="space-y-6">
        {/* Guest Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Number of Guests
          </label>
          <input
            type="number"
            {...register('guestCount', { required: 'Guest count is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter number of guests"
          />
          {errors.guestCount && (
            <p className="text-red-500 text-sm mt-1">{errors.guestCount.message}</p>
          )}
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Event Date
          </label>
          <input
            type="date"
            {...register('eventDate', { required: 'Event date is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {errors.eventDate && (
            <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>
          )}
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            {...register('budgetRange', { required: 'Budget range is required' })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select budget range</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000-20000">₹10,000 - ₹20,000</option>
            <option value="20000-50000">₹20,000 - ₹50,000</option>
            <option value="50000+">₹50,000+</option>
          </select>
          {errors.budgetRange && (
            <p className="text-red-500 text-sm mt-1">{errors.budgetRange.message}</p>
          )}
        </div>

        {/* Special Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements (Optional)
          </label>
          <textarea
            {...register('specialRequirements')}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Any special requests or requirements..."
          />
        </div>
      </div>
    </motion.div>
  );

  const renderStepContent = () => {
    // Handle custom event flow
    if (selectedCustomEvent && customEventFormFields.length > 0) {
      switch (currentStep) {
        case 1:
          return renderStep1();
        case 2:
          return renderCustomEventForm();
        case 3:
          return renderStep5(); // Additional details
        default:
          return renderStep1();
      }
    }
    
    // Handle simplified flow (no custom event selected)
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep5(); // Additional details
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

  // Confirmation Modal Component
  const ConfirmationModal = ({ isOpen, onConfirm, onCancel, title, message, confirmText, cancelText }) => {
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            Let us craft the perfect celebration experience tailored just for you. 
            From themes to menus, we'll bring your vision to life with style and elegance.
          </p>
          
      {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Themes</h3>
              <p className="text-gray-600 text-sm">Personalized themes that match your vision perfectly</p>
              {/* Sparkle effect */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gourmet Menus</h3>
              <p className="text-gray-600 text-sm">Curated food selections for every taste and preference</p>
              {/* Sparkle effect */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Service</h3>
              <p className="text-gray-600 text-sm">White-glove service to make your event unforgettable</p>
              {/* Sparkle effect */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </motion.div>
          </div>

          {/* Scroll Down Arrow - Left Side */}
          <div className="absolute left-8 bottom-4 z-30">
            <motion.button
              onClick={() => {
                document.querySelector('.flex.relative.z-10')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
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
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        <div className="absolute top-32 right-1/3 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-4 h-4 text-pink-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-32 left-1/3 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-5 h-5 text-purple-300">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        
        {/* New floating circles */}
        <div className="absolute top-48 left-1/2 animate-float" style={{animationDelay: '0.5s'}}>
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        </div>
        <div className="absolute bottom-48 right-1/4 animate-float" style={{animationDelay: '1.5s'}}>
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        </div>

        {/* Additional floating particles */}
        <div className="absolute top-64 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-80 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute bottom-64 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute bottom-80 right-1/3 w-3 h-3 bg-green-300 rounded-full animate-pulse" style={{animationDelay: '1.4s'}}></div>

        {/* Additional floating particles */}
        <div className="absolute top-64 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-80 right-1/4 w-3 h-3 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute bottom-64 left-1/4 w-2 h-2 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
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
                  Evaga
                </span>
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div className="mb-8">
              <div className="relative group">
                <div className="w-full h-72 bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                  <span className="text-8xl transform group-hover:rotate-12 transition-transform duration-500">🎉</span>
                </div>
                <div className="absolute inset-0 border-4 border-gradient-to-r from-purple-300 via-pink-300 to-blue-300 rounded-3xl opacity-60"></div>
                
                {/* Floating elements around hero */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
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
                  Let's start with these details to help us create your personalized package, which will include theme suggestions, decor ideas, food options and more.
                </p>
                
                {/* Decorative dots */}
                <div className="flex justify-center space-x-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{animationDelay: '1s'}}></div>
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
                    animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-purple-600 mt-3 font-medium">
                  Step {currentStep} of {steps.length} • {Math.round((currentStep / steps.length) * 100)}% Complete
                </p>
              </div>

              {/* Enhanced Current Step Highlight */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-10 -mt-10 opacity-60"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">{currentStep}</span>
                  </div>
                  <div>
                      <h5 className="font-semibold text-purple-800 text-lg">{getStepTitle()}</h5>
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
          {/* Enhanced Debug Section */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center space-x-4">
              {/* Enhanced debug indicator */}
              {hasFormData && (
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs rounded-full border border-yellow-300 shadow-sm">
                  ✨ Form has data
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Form Container */}
          <div className="max-w-2xl">
            {/* Enhanced Progress Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step {currentStep}/5</span>
                <span className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent">
                  {getStepTitle()}
                </span>
                <button className="ml-2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* Enhanced Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <motion.button
                  type="button"
                  onClick={handleBackNavigation}
                  className="px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl font-medium hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 btn-enhanced"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>

                {currentStep < steps.length ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next →
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="px-10 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ✨ Submit Package Request
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
    </div>
  );
}

// ===== FORM COMPONENTS =====

// Enhanced Card Component for Event Types and Age Groups
const FormCard = ({ 
  title, 
  icon, 
  isSelected, 
  onClick, 
  className = "",
  children 
}) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover-lift card-shadow-enhanced ${
      isSelected
        ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-purple-200'
        : 'border-gray-200 hover:border-purple-300 bg-white'
    } ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-110' 
          : 'bg-gray-100 text-gray-400'
      }`}>
        <span className={`text-lg ${
          isSelected ? 'animate-pulse' : ''
        }`}>
          {isSelected ? '✓' : icon}
        </span>
      </div>
      <span className="font-semibold text-gray-800 text-lg">{title}</span>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="ml-auto">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full selection-indicator"></div>
        </div>
      )}
    </div>
    {children}
  </motion.div>
);

// Enhanced Theme Card Component
const ThemeCard = ({ 
  theme, 
  isSelected, 
  onClick 
}) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -8 }}
    whileTap={{ scale: 0.98 }}
    className={`border-2 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden theme-card-enhanced ${
      isSelected
        ? 'border-purple-500 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 shadow-2xl shadow-purple-200'
        : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-xl'
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
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
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
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ml-4 transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg scale-110' 
            : 'bg-gray-100 text-gray-400'
        }`}>
          <span className="text-xl">
            {isSelected ? '✓' : '✨'}
          </span>
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
            <span className="text-sm font-semibold text-purple-700">Theme Selected</span>
          </div>
        </motion.div>
      )}
    </div>
  </motion.div>
);

// Enhanced Food Type Card Component
const FoodTypeCard = ({ 
  type, 
  isSelected, 
  onClick 
}) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'border-purple-500 bg-purple-50'
        : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isSelected ? 'bg-purple-100' : 'bg-gray-100'
      }`}>
        <span className={`text-sm ${
          isSelected ? 'text-purple-600' : 'text-gray-400'
        }`}>
          {isSelected ? '✓' : '🍽️'}
        </span>
      </div>
      <span className="font-medium text-gray-800">{type}</span>
    </div>
  </motion.div>
);

// Enhanced Course Selection Card Component
const CourseCard = ({ 
  course, 
  isSelected, 
  onClick 
}) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'border-green-500 bg-green-50'
        : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-green-100' : 'bg-gray-100'
        }`}>
          <span className={`text-sm ${
            isSelected ? 'text-green-600' : 'text-gray-400'
          }`}>
            {isSelected ? '✓' : '🥘'}
          </span>
        </div>
        <span className="font-medium text-gray-800">{course}</span>
      </div>
      
      {/* Selection Count */}
      {isSelected && (
        <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
          Selected
        </div>
      )}
    </div>
  </motion.div>
);

// Enhanced Form Input Component
const FormInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  required = false, 
  error, 
  register, 
  name,
  className = "",
  ...props 
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      {...register(name, { required: required ? `${label} is required` : false })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      placeholder={placeholder}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )}
  </div>
);

// Enhanced Form Select Component
const FormSelect = ({ 
  label, 
  options, 
  placeholder, 
  required = false, 
  error, 
  register, 
  name,
  className = "",
  ...props 
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      {...register(name, { required: required ? `${label} is required` : false })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      {...props}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )}
  </div>
);

// Enhanced Form Textarea Component
const FormTextarea = ({ 
  label, 
  placeholder, 
  required = false, 
  error, 
  register, 
  name,
  rows = 4,
  className = "",
  ...props 
}) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      {...register(name)}
      rows={rows}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      placeholder={placeholder}
      {...props}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1">{error.message}</p>
    )}
  </div>
);

// Enhanced Checkbox Component
const FormCheckbox = ({ 
  label, 
  name, 
  register, 
  value,
  className = "",
  ...props 
}) => (
  <label className={`flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50 ${className}`}>
    <input
      type="checkbox"
      {...register(name)}
      value={value}
      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
      {...props}
    />
    <span className="text-gray-700">{label}</span>
  </label>
);

// Enhanced Error Message Component
const ErrorMessage = ({ error, className = "" }) => {
  if (!error) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 bg-red-50 border border-red-200 rounded-xl form-error-enhanced ${className}`}
    >
      <p className="text-red-600 text-sm flex items-center">
        <span className="mr-2 text-lg">⚠️</span>
        {error.message}
      </p>
    </motion.div>
  );
};

// Enhanced Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps, className = "" }) => (
  <div className={`text-center mb-6 ${className}`}>
    <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent mb-3">
      Progress
    </h4>
    <div className="w-full bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 rounded-full h-3 shadow-inner">
      <motion.div
        className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 h-3 rounded-full shadow-lg transition-all duration-500 ease-out progress-enhanced"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
    <p className="text-sm text-purple-600 mt-3 font-medium">
      Step {currentStep} of {totalSteps} • {Math.round((currentStep / totalSteps) * 100)}% Complete
    </p>
  </div>
);

// Enhanced Step Header Component
const StepHeader = ({ 
  stepNumber, 
  totalSteps, 
  title, 
  description, 
  className = "" 
}) => (
  <div className={`mb-8 ${className}`}>
    <div className="flex items-center space-x-3 mb-3">
      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Step {stepNumber}/{totalSteps}</span>
      <span className="text-xl font-semibold bg-gradient-to-r from-purple-800 via-pink-800 to-blue-800 bg-clip-text text-transparent">
        {title}
      </span>
      <button className="ml-2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
    
    {/* Step description with enhanced styling */}
    <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl p-4 border border-purple-100">
      <p className="text-gray-600 text-center font-medium">
        {description}
      </p>
    </div>
  </div>
);

// Enhanced Navigation Buttons Component
const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  onBack, 
  onNext, 
  onSubmit,
  isLastStep = false,
  className = "" 
}) => (
  <div className={`flex justify-between pt-8 ${className}`}>
    <motion.button
      type="button"
      onClick={onBack}
      className="px-8 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl font-medium hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 btn-enhanced"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      ← Back
    </motion.button>

    {!isLastStep ? (
      <motion.button
        type="button"
        onClick={onNext}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Next →
      </motion.button>
    ) : (
      <motion.button
        type="submit"
        onClick={onSubmit}
        className="px-10 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 btn-enhanced"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ✨ Submit Package Request
      </motion.button>
    )}
  </div>
);

export default CustomPackages;