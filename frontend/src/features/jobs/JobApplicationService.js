import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Axios instance with Authorization header
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * JobApplicationService handles all job application-related API requests
 */
const JobApplicationService = {
  /**
   * Get applications for a specific job (Employer only)
   * @param {string} jobId
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>}
   */
  getApplicationsForJob: async (jobId, { page = 1, limit = 10 } = {}) => {
    try {
      console.log(`Fetching applications for job: ${jobId}`);
      const response = await api.get(`/jobApplication/job/${jobId}`, {
        params: { page, limit },
      });
      console.log("Raw API response from server:", response);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch applications"
      );
    }
  },

  /**
   * Update application status
   * @param {string} applicationId
   * @param {Object} statusData { status, notes }
   * @returns {Promise<Object>}
   */
  updateApplicationStatus: async (applicationId, statusData) => {
    try {
      const response = await api.patch(
        `/application/${applicationId}/status`,
        statusData,
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Failed to update application status"
      );
    }
  },

  /**
   * Delete an application
   * @param {string} applicationId
   * @returns {Promise<Object>}
   */
  deleteApplication: async (applicationId) => {
    try {
      const response = await api.delete(
        `/application/deleteApplication/${applicationId}`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to delete application";
    }
  },

  /**
   * Get my applications (Job seeker only)
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>}
   */
  getMyApplications: async ({ page = 1, limit = 10 } = {}) => {
    try {
      const response = await api.get(`/application/myApplication`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Failed to fetch your applications"
      );
    }
  },
};

export default JobApplicationService;
