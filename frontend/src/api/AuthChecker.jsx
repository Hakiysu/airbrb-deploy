import { Navigate } from "react-router";
import { Alert, Box } from "@mui/material";

export default function AuthChecker({ children }) {
  const token = localStorage.getItem("token");
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