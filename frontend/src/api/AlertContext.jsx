// frontend/src/api/AlertContext.jsx
import { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    open: false,
    severity: 'info',
    message: ''
  });

  const showAlert = (message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  };

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 2 }}
      >
        <Alert severity={alert.severity} onClose={handleClose}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}