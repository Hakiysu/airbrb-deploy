import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Register from "./assets/auth/register.jsx";
import Login from "./assets/auth/login.jsx";
import Dashboard from "./assets/dashboard.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
)
