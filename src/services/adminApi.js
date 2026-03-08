import apiService from "./apiService";
import apiEndpoints from "./apiEndpoints";

const adminApi = {
  register: (adminData) =>
    apiService.post(apiEndpoints.admin.register, adminData),
  login: (credentials) =>
    apiService.post(apiEndpoints.admin.login, credentials),
  update: (userId, adminData) =>
    apiService.put(apiEndpoints.admin.update(userId), adminData),
  getOne: (userId) => apiService.get(apiEndpoints.admin.getOne(userId)),
  changePassword: (userId, passwords) =>
    apiService.put(apiEndpoints.admin.changePassword(userId), passwords),
  deleteProfile: (userId) =>
    apiService.delete(apiEndpoints.admin.deleteProfile(userId)),
  logout: (userId) => apiService.post(apiEndpoints.admin.logout(userId)),
  getAllAdmin: () => apiService.get(apiEndpoints.admin.getAllAdmin),
  forgotPassword: (formData) =>
    apiService.post(apiEndpoints.admin.adminForgotPassword, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  verifyAdminOtp: (formData) =>
    apiService.post(apiEndpoints.admin.adminVerifyOtp, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  changeAdminPassword: (adminId, formData) =>
    apiService.post(apiEndpoints.admin.adminChangePassword(adminId), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default adminApi;
