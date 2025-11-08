import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import App from './App.jsx'
import Register from "./api/register.jsx";
import Login from "./api/login.jsx";
import Dashboard from "./assets/dashboard.jsx";
import axios from 'axios';
import {BACKEND_URL} from './config.js';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


axios.defaults.baseURL = BACKEND_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
