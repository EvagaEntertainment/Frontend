import apiClient from "./apiClient";

const apiService = {
  get: (url, params) => apiClient.get(url, { params }),
  post: (url, data, headers) => apiClient.post(url, data, headers),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url) => apiClient.delete(url),
};

export default apiService;
