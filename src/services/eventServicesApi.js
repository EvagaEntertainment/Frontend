import apiEndpoints from "./apiEndpoints";
import apiService from "./apiService";

const eventServicesApi = {
  // Public access - fetch a single landing page configuration by path query param (e.g. ?path=/slug)
  getEventServicePageByPath: (path) => 
    apiService.get(apiEndpoints.common.getEventServicePageByPath, { path }),

  // Admin access - fetch paginated list of all event pages
  getAllEventServicePages: (queryParams) => 
    apiService.get(apiEndpoints.adminActions.getAllEventServicePages, queryParams),

  // Admin access - fetch a single page configuration by database ID
  getEventServicePageById: (id) => 
    apiService.get(apiEndpoints.adminActions.getEventServicePageById(id)),

  // Admin access - save page edits (multipart/form-data for uploads)
  updateEventServicePage: (id, formData) => 
    apiService.put(apiEndpoints.adminActions.updateEventServicePage(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default eventServicesApi;
