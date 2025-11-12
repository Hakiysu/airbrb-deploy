import {useNavigate} from "react-router";

export default function useAuthUtils() {
  const navigate = useNavigate();

  const init = () => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
    return !!token;
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return false;
    }
    return true;
  };

  return { init, logoutUser, isUserLoggedIn };
}