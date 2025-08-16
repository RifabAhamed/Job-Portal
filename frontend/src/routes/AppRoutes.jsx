import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Jobs from "../features/jobs/Jobs";
import JobDetails from "../features/jobs/JobDetails";
import CreateCompany from "../features/company/CreateCompany";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import CompanyProfile from "../features/company/CompanyProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/jobDetails/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createCompany" element={<CreateCompany />} />
        <Route path="/companyProfile" element={<CompanyProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
