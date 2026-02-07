import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HomePage from "./HomePage";
import EmployerDashboard from "../features/company/EmployerDashboard";
import AdminDashboard from "./AdminDashboard";

const Home = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect based on user role
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "employer") {
        navigate("/employer-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      }
    }
  }, [user, loading, navigate]);

  // Show appropriate page based on role
  if (loading) {
    return <div>Loading...</div>;
  }

  // If employer, show dashboard (will redirect anyway)
  if (user?.role === "employer") {
    return <EmployerDashboard />;
  }

  // If admin, show admin dashboard (will redirect anyway)
  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  // Default to home page for job seekers and non-logged-in users
  return <HomePage />;
};

export default Home;
