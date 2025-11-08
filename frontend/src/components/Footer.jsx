// frontend/src/components/Footer.jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, mt: 'auto' }} component="footer">
      <Typography variant="body1" align="center">
        HERE IS THE FOOTER CONTENT. DO I HAVE COPYRIGHT? :P
      </Typography>
    </Box>
  );
}

export default Footer;