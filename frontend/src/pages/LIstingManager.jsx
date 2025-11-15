// frontend/src/components/ListingManager.jsx
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Paper } from '@mui/material';
import Listing from "../classes/Listing.jsx";

export default function ListingManager() {

  // show all listings which belongs to current user
  // get all then filter by user email (it is unique at backend)
  const [listings, setListings] = useState([]);
  useEffect(() => {
    new Listing().getAllListings().then((data) => {
      console.log("Before filtering listings:", data.listings);
      const userEmail = localStorage.getItem('email');
      const filteredListings = data.listings.filter(listing => listing.owner === userEmail);
      // json into string.
      // address text=
      // street, city, state, zip, country
      for (let i = 0; i < filteredListings.length; i++) {
        const addr = filteredListings[i].address;
        filteredListings[i].address = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip}, ${addr.country}`;
      }


      console.log("After filtering listings:", filteredListings);

      setListings(filteredListings);
    });
  }, []);

  console.log("Listings state:", listings);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        HERE IS LISTING MANAGER
      </Typography>
      {listings.length === 0 ? (
        <Typography variant="body1">You have no listings.</Typography>
      ) : (
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={listings}
            columns={[
              { field: 'title', headerName: 'Title', width: 200 },
              { field: 'address', headerName: 'Address', width: 300 },
              { field: 'price', headerName: 'Price', width: 100 },
              { field: 'propertyType', headerName: 'Property Type', width: 150 },
              { field: 'numBathrooms', headerName: 'Bathrooms', width: 130 },
              { field: 'bedrooms', headerName: 'Bedrooms', width: 130 },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Paper>
      )}
    </Container>
  );
}