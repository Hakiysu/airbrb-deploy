// frontend/src/pages/Landing.jsx
import ListingArea from '../components/LandingPage/ListingArea.jsx';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Filter from '../components/Filter.jsx';
import Listing from '../classes/Listing.jsx';

export default function LandingPage() {
  const [allListings, setAllListings] = useState([]);
  const [displayListings, setDisplayListings] = useState([]);

  useEffect(() => {
    const listingInstance = new Listing();
    listingInstance.getListingsWithMetadata().then((listings) => {
      console.log('Fetched listings at landing:', listings);
      setAllListings(listings);
      setDisplayListings(listings);
    });
  }, []);

  console.log('All listings in LandingPage:', allListings);
  console.log('Display listings in LandingPage:', displayListings);

  const handleFilterResult = (filtered) => {
    setDisplayListings(filtered);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Listings
      </Typography>
      <Filter allListings={allListings} onFilter={handleFilterResult} />
      <Box mb={4} display="flex" gap={2}>
        <ListingArea listings={displayListings} />
      </Box>
    </Box>
  );

}