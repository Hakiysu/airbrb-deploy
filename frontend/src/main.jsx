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
import {AuthProvider} from "./api/AuthContext.jsx";

axios.defaults.baseURL = BACKEND_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
