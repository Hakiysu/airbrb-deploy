// frontend/src/components/Footer.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AuthContext } from '../api/AuthContext.jsx';

function Footer() {
  const { email } = useContext(AuthContext);
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto' }} component="footer">
      <Typography variant="body1" align="center">
        &copy; {new Date().getFullYear()} Honeyish. All rights reserved. | Logged in as: {email}
      </Typography>
    </Box>
  );
}

export default Footer;