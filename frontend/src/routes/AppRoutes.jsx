import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

import Jobs from "../features/jobs/Jobs";
import JobDetails from "../features/jobs/JobDetails";
import ApplyJob from "../features/jobs/ApplyJob";
import CreateJob from "../features/jobs/CreateJob";

import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import MyAccount from "../features/auth/MyAccount";

import CreateCompany from "../features/company/CreateCompany";
import CompanyProfile from "../features/company/CompanyProfile";
import CompanyList from "../features/company/CompanyList";
import EmployerDashboard from "../features/company/EmployerDashboard";
import EditCompany from "../features/company/EditCompany";

import AdminDashboard from "../pages/AdminDashboard";

import PrivateRoute from "../utils/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout Wrapper */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/jobDetails/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Employer Only */}
        <Route
          path="/createJob/:companyId"
          element={
            <PrivateRoute roles={["employer"]}>
              <CreateJob />
            </PrivateRoute>
          }
        />

        <Route
          path="/createCompany"
          element={
            <PrivateRoute roles={["employer"]}>
              <CreateCompany />
            </PrivateRoute>
          }
        />

        <Route
          path="/companyProfile/:companyId"
          element={
            <PrivateRoute roles={["employer", "admin"]}>
              <CompanyProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/companyList"
          element={
            <PrivateRoute roles={["admin"]}>
              <CompanyList />
            </PrivateRoute>
          }
        />

        <Route
          path="/employer-dashboard"
          element={
            <PrivateRoute roles={["employer"]}>
              <EmployerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/editCompany/:companyId"
          element={
            <PrivateRoute roles={["employer", "admin"]}>
              <EditCompany />
            </PrivateRoute>
          }
        />

        {/* Job Seeker Only */}
        <Route
          path="/applyJob/:id"
          element={
            <PrivateRoute roles={["jobseeker"]}>
              <ApplyJob />
            </PrivateRoute>
          }
        />

        {/* Any Authenticated User */}
        <Route
          path="/my-account"
          element={
            <PrivateRoute roles={["jobseeker", "employer", "admin"]}>
              <MyAccount />
            </PrivateRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
