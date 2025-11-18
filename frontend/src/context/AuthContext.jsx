import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../features/auth/AuthService.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email, role }
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await AuthService.getCurrentUser();
          setUser(data);
          console.log("Loaded user from token:", data);
        } catch (err) {
          console.error(err);
          AuthService.logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);  
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
