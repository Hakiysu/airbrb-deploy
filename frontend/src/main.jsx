import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import axios from 'axios';
import {BACKEND_URL} from './config.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRouter from "./AppRouter.jsx";

axios.defaults.baseURL = BACKEND_URL;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <AppRouter />
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
