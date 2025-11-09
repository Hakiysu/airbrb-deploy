// frontend/src/api/utils.jsx

import {useNavigate} from "react-router";

let gotoPage = useNavigate();


// init, do user status check, if logged in, redirect to dashboard
export const init = () => {
  const token = localStorage.getItem('token');
  gotoPage('/dashboard');
  return !!token;
}

// logout user
export function logoutUser() {
  localStorage.removeItem('token');
  gotoPage('/login');
}
