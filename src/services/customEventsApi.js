import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const customEventsApi = {
  // ===== PUBLIC ACCESS ROUTES (NO AUTHENTICATION REQUIRED) =====
  
  // Get all active custom events for public access
  getPublicCustomEvents: (queryParams) => 
    apiService.get(apiEndpoints.common.getPublicCustomEvents, queryParams),

  // Get public custom events by event type
  getPublicCustomEventsByType: (eventType, queryParams) => 
    apiService.get(apiEndpoints.common.getPublicCustomEventsByType(eventType), queryParams),

  // Get public custom event template by ID
  getPublicCustomEventById: (id) => 
    apiService.get(apiEndpoints.common.getPublicCustomEventById(id)),

  // ===== USER & ADMIN ACCESSIBLE ROUTES =====
  
  // Get all custom event templates (with pagination and filters)
  getCustomEvents: (queryParams) => 
    apiService.get(apiEndpoints.common.getCustomEvents, queryParams),

  // Get custom events by event type
  getCustomEventsByType: (eventType, queryParams) => 
    apiService.get(apiEndpoints.common.getCustomEventsByType(eventType), queryParams),

  // Get custom event template by ID
  getCustomEventById: (id) => 
    apiService.get(apiEndpoints.common.getCustomEventById(id)),

  // Get theme card images from a template
  getThemeCardImages: (id) => 
    apiService.get(apiEndpoints.common.getThemeCardImages(id)),

  // Validate form data against a template
  validateFormData: (formData) => 
    apiService.post(apiEndpoints.common.validateFormData, formData),

  // ===== ADMIN ONLY ROUTES =====
  
  // Create a new custom event template - ADMINS only
  createCustomEvent: (formData) => 
    apiService.post(apiEndpoints.common.createCustomEvent, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Update custom event template - ADMINS only
  updateCustomEvent: (id, formData) => 
    apiService.put(apiEndpoints.common.updateCustomEvent(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // Toggle active status of custom event template - ADMINS only
  toggleActiveStatus: (id) => 
    apiService.patch(apiEndpoints.common.toggleActiveStatus(id)),

  // Delete custom event template (soft delete) - ADMINS only
  deleteCustomEvent: (id) => 
    apiService.delete(apiEndpoints.common.deleteCustomEvent(id)),

  // Get template statistics - ADMINS only
  getCustomEventStats: () => 
    apiService.get(apiEndpoints.common.getCustomEventStats),

  // Update theme card image - ADMINS only
  updateThemeCardImage: (templateId, fieldIndex, optionIndex, formData) => 
    apiService.put(apiEndpoints.common.updateThemeCardImage(templateId, fieldIndex, optionIndex), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default customEventsApi;


