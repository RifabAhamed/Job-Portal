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
 * JobService handles all job-related API requests
 */
const JobService = {
  /**
   * Create a new job posting for a company
   * @param {string} companyId
   * @param {Object} jobData
   * @returns {Promise<Object>}
   */
  createJob: async (companyId, jobData) => {
    try {
      const response = await api.post(`/job/createJob/${companyId}`, jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to create job";
    }
  },

  /**
   * Get a job by its ID
   * @param {string} jobId
   * @returns {Promise<Object>}
   */
  getJob: async (jobId) => {
    try {
      const response = await api.get(`/job/getJobDetails/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch job";
    }
  },

  /**
   * Update a job posting
   * @param {string} jobId
   * @param {Object} updatedData
   * @returns {Promise<Object>}
   */
  updateJob: async (jobId, updatedData) => {
    try {
      const response = await api.put(
        `/job/editJobDetails/${jobId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update job";
    }
  },

  /**
   * Delete a job posting
   * @param {string} jobId
   * @returns {Promise<Object>}
   */
  deleteJob: async (jobId) => {
    try {
      const response = await api.delete(`/job/deleteJob/${jobId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to delete job";
    }
  },

  /**
   * Get all jobs with optional pagination and filters
   * @param {number} page
   * @param {number} limit
   * @param {Object} filter
   * @returns {Promise<Object>}
   */
 
  /**
   * Get All Jobs (Paginated + Filtered)
   * Matches the "Industry Standard" Backend Query
   * @param {Object} params - { page, limit, search, location, jobType, sort, etc. }
   */
  getAllJobsPaginated: async (params) => {
    try {
      // We pass 'params' directly. Axios automatically converts
      // objects into query strings (e.g., ?page=1&search=react)
      const response = await api.get("/job/getAllJobs", {
        params: params,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch jobs";
    }
  },

  /**
   * Get all jobs posted by a specific company
   * @param {string} companyId
   * @returns {Promise<Object>}
   */
  getJobsByCompany: async (companyId, { page = 1, limit = 10 } = {}) => {
    try {
      const response = await api.get(`/job/getCompanyJobs/${companyId}`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch company jobs";
    }
  },
};

export default JobService;
