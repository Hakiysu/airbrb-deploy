// frontend/src/components/Footer.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { AuthContext } from '../api/AuthContext.jsx';
import axios from 'axios';

function Footer() {
  const { token, email } = useContext(AuthContext);
  let axiostoken= axios.defaults.headers.common['Authorization'] || 'No token set';
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto' }} component="footer">
      <Typography variant="body1" align="center">
        HERE IS THE FOOTER CONTENT. DO I HAVE COPYRIGHT? :P
      </Typography>
      {token ? ` Logged in as: ${email} with token: ${token}` : ' Not logged in.'}
      {` Axios default token: ${axiostoken}`}
    </Box>
  );
}

export default Footer;