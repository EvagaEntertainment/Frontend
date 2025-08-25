import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

function CustomPackages() {
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
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);

  // Steps array
  const steps = ['Event Type', 'Age Group', 'Theme Selection', 'Food & Beverage', 'Additional Details'];

  // Step descriptions
  const getStepDescription = (stepNumber) => {
    const descriptions = {
      1: 'Choose the type of event you\'re planning',
      2: 'Select the appropriate age group',
      3: 'Pick a theme that matches your vision',
      4: 'Customize your menu preferences',
      5: 'Add final details and requirements'
    };
    return descriptions[stepNumber] || '';
  };

  // Step titles
  const getStepTitle = () => {
    const titles = {
      1: 'Event Type',
      2: 'Age Group', 
      3: 'Theme Selection',
      4: 'Food & Beverage',
      5: 'Additional Details'
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
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
    // Reset form and close
    setCurrentStep(1);
    setSelectedEventType('');
    setSelectedAge('');
    setSelectedTheme('');
    setSelectedFoodType('');
    setSelectedCourses([]);
    window.close() || window.history.back();
  };

  const confirmBack = () => {
    setShowBackConfirm(false);
    // Reset form and go back
    setCurrentStep(1);
    setSelectedEventType('');
    setSelectedAge('');
    setSelectedTheme('');
    setSelectedFoodType('');
    setSelectedCourses([]);
    window.history.back();
  };

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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Type <span className="text-red-500">*</span></h2>
        <p className="text-gray-600">What type of event are you planning?</p>
      </div>

      <div className="space-y-3">
        {eventTypes.map((eventType) => (
          <motion.div
            key={eventType}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedEventType === eventType
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => {
              setSelectedEventType(eventType);
              setValue('eventType', eventType);
              clearStepError('eventType');
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedEventType === eventType ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <span className={`text-sm ${
                  selectedEventType === eventType ? 'text-purple-600' : 'text-gray-400'
                }`}>
                  {selectedEventType === eventType ? '✓' : '🎉'}
                </span>
              </div>
              <span className="font-medium text-gray-800">{eventType}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {errors.eventType && (
        <p className="text-red-500 text-sm mt-2">⚠️ {errors.eventType.message}</p>
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Age Group <span className="text-red-500">*</span></h2>
        <p className="text-gray-600">What's the age group for this event?</p>
      </div>

      <div className="space-y-3">
        {ageGroups.map((age) => (
          <motion.div
            key={age}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedAge === age
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => {
              setSelectedAge(age);
              setValue('ageGroup', age);
              clearStepError('ageGroup');
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedAge === age ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <span className={`text-sm ${
                  selectedAge === age ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {selectedAge === age ? '✓' : '🎂'}
                </span>
              </div>
              <span className="font-medium text-gray-800">{age}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {errors.ageGroup && (
        <p className="text-red-500 text-sm mt-2">⚠️ {errors.ageGroup.message}</p>
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
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Theme Selection <span className="text-red-500">*</span></h2>
        <p className="text-gray-600">Choose a theme that matches your event vision</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <motion.div
            key={theme.name}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`border-2 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl ${
              selectedTheme === theme.name
                ? 'border-purple-500 bg-purple-50 shadow-purple-200'
                : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}
            onClick={() => {
              setSelectedTheme(theme.name);
              setValue('theme', theme.name);
              clearStepError('theme');
            }}
          >
            {/* Theme Image - Larger and more prominent */}
            <div className="w-full h-48 bg-gray-100 overflow-hidden">
              <img
                src={theme.image}
                alt={theme.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback icon when image fails to load */}
              <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                <span className="text-5xl text-purple-400">✨</span>
              </div>
            </div>
            
            {/* Theme Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-xl mb-2">{theme.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{theme.description}</p>
                </div>
                
                {/* Selection Indicator */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ml-4 transition-all duration-200 ${
                  selectedTheme === theme.name 
                    ? 'bg-purple-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-lg">
                    {selectedTheme === theme.name ? '✓' : '✨'}
                  </span>
                </div>
              </div>
              
              {/* Selection Status */}
              {selectedTheme === theme.name && (
                <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-purple-700">Theme Selected</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {errors.theme && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <p className="text-red-600 text-sm flex items-center">
            <span className="mr-2">⚠️</span>
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
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
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
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 text-green-200 opacity-60">
        <LeafDecoration className="w-full h-full" rotation={45} />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 text-green-200 opacity-60">
        <LeafDecoration className="w-full h-full" rotation={-30} />
      </div>
      <div className="absolute top-20 left-10 w-16 h-16 text-green-100 opacity-40">
        <LeafDecoration className="w-full h-full" rotation={15} />
      </div>
      <div className="absolute top-16 right-16 w-20 h-20 text-green-100 opacity-40">
        <LeafDecoration className="w-full h-full" rotation={-15} />
      </div>

      <div className="flex relative z-10">
        {/* Left Sidebar - Visual & Information */}
        <div className="hidden lg:block w-2/5 bg-gradient-to-br from-purple-50 to-purple-100 p-8 relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-20 h-20 text-purple-200 opacity-60">
            <LeafDecoration className="w-full h-full" rotation={0} />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 text-purple-200 opacity-60">
            <LeafDecoration className="w-full h-full" rotation={180} />
          </div>

          <div className="sticky top-8">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">E</span>
                </div>
                <span className="text-2xl font-bold text-purple-800">Evaga</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="mb-8">
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl flex items-center justify-center">
                  <span className="text-6xl">🎉</span>
                </div>
                <div className="absolute inset-0 border-2 border-purple-200 rounded-2xl"></div>
              </div>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-16 h-px bg-purple-300"></div>
                  <h3 className="text-lg font-semibold text-purple-800">Your Event Requirements</h3>
                  <div className="w-16 h-px bg-purple-300"></div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Let's start with these details to help us create your personalized package, which will include theme suggestions, decor ideas, food options and more.
                </p>
              </div>
            </div>

            {/* Elegant Progress Indicators */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">Progress</h4>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <motion.div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-purple-600 mt-2 font-medium">
                  Step {currentStep} of 5 • {Math.round((currentStep / 5) * 100)}% Complete
                </p>
              </div>

              {/* Current Step Highlight */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">{currentStep}</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-purple-800">{getStepTitle()}</h5>
                    <p className="text-sm text-gray-600">Current step</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative bottom element */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto opacity-60">
                <span className="text-purple-600 text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-3/5 p-8">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center space-x-3">
              {/* Debug indicator - shows when form has data */}
              {hasFormData && (
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300">
                  Form has data
                </div>
              )}
              {/* Test buttons for debugging */}
              <button 
                onClick={() => setShowRefreshConfirm(true)}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-300 hover:bg-blue-200"
              >
                Test Refresh
              </button>
              <button 
                onClick={() => setShowBackConfirm(true)}
                className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full border border-green-300 hover:bg-green-200"
              >
                Test Back
              </button>
              <button 
                onClick={handleClose}
                className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div className="max-w-2xl">
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500">{currentStep}/5</span>
                <span className="text-lg font-semibold text-gray-800">{getStepTitle()}</span>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <motion.button
                  type="button"
                  onClick={handleBackNavigation}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Back
                </motion.button>

                {currentStep < 5 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Package Request
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
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

export default CustomPackages;