import './App.css'
import Header from "../src/layout/Header"
import Footer from "../src/layout/Footer"
import AppRoutes from '../src/routes/AppRoutes'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App
