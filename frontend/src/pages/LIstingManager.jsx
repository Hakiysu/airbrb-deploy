// frontend/src/components/ListingManager.jsx
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Listing from "../classes/Listing.jsx";

export default function ListingManager() {

  // show all listings which belongs to current user
  // get all then filter by user email (it is unique at backend)
  const [listings, setListings] = useState([]);
  useEffect(() => {
    new Listing().getAllListings().then((data) => {
      console.log("Before filtering listings:", data);
      const userEmail = localStorage.getItem('email');
      const filteredListings =null;
      console.log("After filtering listings:", filteredListings);
      setListings(filteredListings);
    });
  }, []);


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        HERE IS LISTING MANAGER
      </Typography>
      {listings.length === 0 ? (
        <Typography variant="body1">You have no listings.</Typography>
      ) : (
        listings.map((listing) => (
          <Typography key={listing.id} variant="body1">
            {listing.title} - {listing.description}
          </Typography>
        ))
      )}
    </Container>
  );
}