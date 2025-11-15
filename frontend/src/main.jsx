import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router'
import Register from "./api/register.jsx";
import Login from "./api/login.jsx";
import axios from 'axios';
import {BACKEND_URL} from './config.js';
axios.defaults.baseURL = BACKEND_URL;

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ListingEditor from "./api/ListingEditor.jsx";
import Landing from "./pages/Landing.jsx";
import ListingManager from "./pages/LIstingManager.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listingEditor" element={<ListingEditor />} />
        <Route path="/ListingManager" element={<ListingManager />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
