import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Don't set Content-Type for FormData - let axios/browser handle it
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

/**
 * CompanyService handles company-related API requests.
 */
const CompanyService = {
  /**
   * Create a new company.
   * @param {Object} companyData
   * @returns {Promise<Object>} Response from backend
   */
  createCompany: async (companyData) => {
    try {
      const response = await api.post("/company/createCompany", companyData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to create company";
    }
  },

  /**
   * Get company by ID.
   * @param {string} companyId
   * @returns {Promise<Object>} Company details
   */
  getCompany: async (companyId) => {
    try {
      const response = await api.get(`/company/getCompanyDetails/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch company";
    }
  },

  /**
   * Update company details.
   * @param {string} companyId
   * @param {Object} updatedData
   * @returns {Promise<Object>} Updated company data
   */
  updateCompany: async (companyId, updatedData) => {
    try {
      const response = await api.put(
        `/company/editCompanyDetails/${companyId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update company";
    }
  },

  /**
   * Delete company.
   * @param {string} companyId
   * @returns {Promise<Object>} Response message
   */
  deleteCompany: async (companyId) => {
    try {
      const response = await api.delete(`/company/deleteCompany/${companyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to delete company";
    }
  },

  /**
   * Get paginated companies with optional filters
   * @param {number} page
   * @param {number} limit
   * @param {Object} filter
   * @returns {Promise<Object>} Paginated company list
   */
  getAllCompaniesPaginated: async ({ page = 1, limit = 10, filter = {} }) => {
    try {
      const response = await api.get("/company/getAllCompany", {
        params: { page, limit, ...filter }, // query params
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch companies";
    }
  },

  /**
   * Get paginated companies created by the authenticated employer
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>} Paginated employer's company list
   */
  getMyCompaniesPaginated: async ({ page = 1, limit = 10 }) => {
    try {
      const response = await api.get("/company/getMyCompanies", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch your companies";
    }
  },
};

export default CompanyService;
