// frontend/src/pages/ListingManager.jsx
import { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Listing from "../classes/Listing.jsx";
import { AuthContext } from '../api/AuthContext.jsx';
import HostPage from './HostPage.jsx';
import TenantPage from './TenantPage.jsx';

export default function ListingManager() {
  const [role, setRole] = useState('host'); // current role: 'host' or 'tenant'
  const [listings, setListings] = useState([]);
  const { email: userEmail } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all listings with metadata
    new Listing().getListingsWithMetadata()
      .then(data => setListings(data))
      .catch(err => console.error(err));
  }, []);

  // Handle role toggle
  const handleRoleChange = (event, newRole) => {
    if (newRole) setRole(newRole);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Listing Manager</Typography>

      {/* Role switch button */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={role}
          exclusive
          onChange={handleRoleChange}
          aria-label="role switch"
        >
          <ToggleButton value="host">Host View</ToggleButton>
          <ToggleButton value="tenant">Tenant View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Render different components based on role */}
      {role === 'host' ? (
        <HostPage listings={listings} userEmail={userEmail} />
      ) : (
        <TenantPage listings={listings} />
      )}
    </Container>
  );
}