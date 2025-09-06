// Custom Event Submissions API Service
import apiClient from './apiClient';

const customEventSubmissionsApi = {
  // Submit custom event form
  submitCustomEventForm: async (formData) => {
    try {
      const response = await apiClient.post('/customEventSubmissions/submit', formData);
      return response.data;
    } catch (error) {
      console.error('Error submitting custom event form:', error);
      throw error;
    }
  },

  // Admin endpoints
  getAllSubmissions: async (params = {}) => {
    try {
      const response = await apiClient.get('/customEventSubmissions', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all submissions:', error);
      throw error;
    }
  },

  getSubmissionById: async (id) => {
    try {
      const response = await apiClient.get(`/customEventSubmissions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching submission by ID:', error);
      throw error;
    }
  },

  updateSubmissionStatus: async (id, statusData) => {
    try {
      const response = await apiClient.patch(`/customEventSubmissions/${id}/status`, statusData);
      return response.data;
    } catch (error) {
      console.error('Error updating submission status:', error);
      throw error;
    }
  },

  deleteSubmission: async (id) => {
    try {
      const response = await apiClient.delete(`/customEventSubmissions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting submission:', error);
      throw error;
    }
  },

  getSubmissionsByStatus: async (status) => {
    try {
      const response = await apiClient.get(`/customEventSubmissions/status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions by status:', error);
      throw error;
    }
  },

  getSubmissionStats: async () => {
    try {
      const response = await apiClient.get('/customEventSubmissions/stats/overview');
      return response.data;
    } catch (error) {
      console.error('Error fetching submission stats:', error);
      throw error;
    }
  },

  getSubmissionsNeedingAttention: async () => {
    try {
      const response = await apiClient.get('/customEventSubmissions/admin/needing-attention');
      return response.data;
    } catch (error) {
      console.error('Error fetching submissions needing attention:', error);
      throw error;
    }
  }
};

export default customEventSubmissionsApi;
