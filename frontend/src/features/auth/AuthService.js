import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to every request (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * AuthService handles authentication API requests.
 */
const AuthService = {
  /**
   * Login user with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} Response data from backend
   */
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });
      console.log(email);
      // Optionally store token in localStorage/sessionStorage here
      return response.data;
    } catch (error) {
      // Return error message for UI
      throw error.response?.data?.message || "Login failed";
    }
  },

  /**
   * Register a new user.
   * @param {Object} userData
   * @returns {Promise<Object>} Response data from backend
   */
  signup: async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/register-user`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Signup failed";
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/user/auth");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch user details";
    }
  },

  uploadResume: async (file) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/user/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Resume upload failed";
    }
  },
  /**
   * Logout user (optional, if backend supports).
   */
  logout: () => {
    // Remove token from storage if used
    localStorage.removeItem("token");
  },
};

export default AuthService;