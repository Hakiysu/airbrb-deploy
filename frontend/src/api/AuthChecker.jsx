import { Navigate } from "react-router";
import { Alert, Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

export default function AuthChecker({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Please log in to continue.
        </Alert>
        <Navigate to="/login" replace />
      </Box>
    );
  }
  return children;
}