import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

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
            const response = await axios.post(`${API_URL}/login`, { email, password });
            console.log(email)
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
              `${API_URL}/register-user`,
              userData
            );
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || "Signup failed";
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