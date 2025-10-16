// layout/MainLayout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const MainLayout = () => {
  const location = useLocation();

  // List of routes without header/footer
  const hideHeaderFooter = [
    "/login",
    "/signup",
    "/createCompany",
    "/companyProfile",
    "/my-account"
  ];

  const shouldHide = hideHeaderFooter.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Header />}
      <main>
        <Outlet />
      </main>
      {!shouldHide && <Footer />}
    </>
  );
};

export default MainLayout;
