// frontend/src/components/Header.jsx
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Airbrb
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/listings">Listings</Button>
        {localStorage.getItem('token') ? (
          <>
            <Button color="inherit" component={Link} to="/listing-manager">Manage Listings</Button>
            <Button color="inherit" component={Link} to="/booking-manager">Manage Bookings</Button>
            <Button color="inherit" component={Link} to="/logout">Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}