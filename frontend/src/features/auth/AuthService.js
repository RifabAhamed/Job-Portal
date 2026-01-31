import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * AuthService handles all authentication-related API calls.
 */
const AuthService = {
  /**
   * Login user and return token + user info
   */
  login: async (email, password) => {
    try {
      const response = await api.post(`/user/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  },

  /**
   * Register user
   */
  signup: async (userData) => {
    try {
      const response = await api.post(`/user/register-user`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Signup failed";
    }
  },

  /**
   * Get logged-in user details from token
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get(`/user/auth`);
      return response.data.data; // { id, name, email, role }
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch user details";
    }
  },

  /**
   * Upload resume (Job Seeker only)
   */
  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post(`/user/upload-resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // return the resume object directly (data.data holds { url, public_id })
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || "Resume upload failed";
    }
  },

  getResume: async () => {
    try {
      const response = await api.get(`/user/view-resume`);
      return response.data.data; // { url, public_id }
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch resume URL";
    }
  },

  updateUserResume: async (resumePath) => {
    try {
      const response = await api.put(`/user/update-resume`, {
        resume: resumePath,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update resume path";
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem("token");
  },
};

export default AuthService;
