// frontend/src/api/AuthContext.jsx
import { createContext, useState } from 'react';
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const login = (newToken, userEmail) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', userEmail);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setEmail(userEmail);
    setToken(newToken);
    console.log("Logged in with token:", newToken, "and email:", userEmail);
    console.log("Axios default header set to:", axios.defaults.headers.common['Authorization']);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    delete axios.defaults.headers.common['Authorization'];
    setEmail(null);
    setToken(null);
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
