import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs"; 
import Jobs from "../pages/Jobs"
import ContactUs from "../pages/ContactUs";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<Jobs/>} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/contact" element={<ContactUs/>} />
    </Routes>
  );
};

export default AppRoutes;
