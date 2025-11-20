// frontend/src/pages/Landing.jsx
import ListingArea from '../components/LandingPage/ListingArea.jsx';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Filter from '../components/Filter.jsx';
import Listing from '../classes/Listing.jsx';
import { useContext } from 'react';
import { AuthContext } from '../api/AuthContext.jsx';
import Booking from "../classes/Booking.jsx";

export default function LandingPage() {
  const [allListings, setAllListings] = useState([]);
  const [displayListings, setDisplayListings] = useState([]);
  const [searchDates, setSearchDates] = useState({ startDate: '', endDate: '' });
  const {token, email} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const listingInstance = new Listing();
      const bookingInstance = new Booking();
      // get all listings with metadata
      let listings = await listingInstance.getListingsWithMetadata();
      listings = listings.filter(l => l.published);
      // if no token, sort by title only
      if (!token) {
        listings.sort((a, b) => a.title.localeCompare(b.title));
        setAllListings(listings);
        setDisplayListings(listings);
        return;
      }
      // get all bookings
      const bookings = await bookingInstance.getAllBookings();
      const currentUser = email;
      // filter bookings made by current user with accepted or pending status
      const userBookedListingIds = bookings
        .filter(
          b =>
            b.owner === currentUser &&
            (b.status === "accepted" || b.status === "pending")
        )
        .map(b => b.listingId);
      // str to num
      userBookedListingIds.forEach((id, index) => {
        userBookedListingIds[index] = Number(id);
      });
      // sort listings: booked first (by title), then others (by title)
      const priorityListings = [];
      const otherListings = [];
      listings.forEach(listing => {
        if (userBookedListingIds.includes(listing.id)) {
          priorityListings.push(listing);
        } else {
          otherListings.push(listing);
        }
      });

      // sort priority listings by title
      priorityListings.sort((a, b) => a.title.localeCompare(b.title));

      // others sorted by title
      otherListings.sort((a, b) => a.title.localeCompare(b.title));
      const finalSorted = [...priorityListings, ...otherListings];
      setAllListings(finalSorted);
      setDisplayListings(finalSorted);
    };
    fetchData();
  }, [token]);

  const handleFilterResult = (filtered,dates) => {
    setDisplayListings(filtered);
    setSearchDates(dates);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Listings
      </Typography>
      <Filter allListings={allListings} onFilter={handleFilterResult} />
      <Box mb={4} display="flex" gap={2}>
        <ListingArea listings={displayListings} searchDates={searchDates} />
      </Box>
    </Box>
  );
}