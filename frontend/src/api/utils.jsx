import axios from 'axios';

export function handleAuthSuccess(response, email) {
  const token = response?.data?.token;
  if (!token) return;
  localStorage.setItem('token', token);
  if (email) localStorage.setItem('email', email);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

