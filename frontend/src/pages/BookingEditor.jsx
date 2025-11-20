// frontend/src/pages/BookingEditor.jsx
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';
import Listing from '../classes/Listing.jsx';
import Booking from "../classes/Booking.jsx";
import ReviewsSection from '../components/ReviewsSection.jsx';
import ImagesGallery from '../components/ImagesGallery.jsx';

import { useContext} from "react";
import { AuthContext } from "../api/AuthContext.jsx";
import { calculatePrice } from "../api/utils.jsx";
import { useAlert } from "../api/useAlert.jsx";

export default function BookingEditor() {
  const { showAlert } = useAlert();
  const { email } = useContext(AuthContext);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [booking, setBooking] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [tempConfirmation, setTempConfirmation] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const startDateFromSearch = searchParams.get('start');
  const endDateFromSearch = searchParams.get('end');

  const [bookingDates, setBookingDates] = useState({ start: startDateFromSearch || '', end: endDateFromSearch || '' });

  useEffect(() => {
    if (!listingId) return;
    const listingInstance = new Listing();
    listingInstance.getListingById(listingId).then(setListing);
    // Fetch user's existing bookings for this listing
    const bookingsInstance = new Booking();
    bookingsInstance.getAllBookings().then((bookings) => {
      console.log("All bookings:", bookings);
      setBooking(bookings);
      // Filter bookings for the current listing
      const userListingBookings = bookings.filter(b => b.listingId === listingId);
      console.log("Filtered bookings for listing:", userListingBookings);
      // filter by email of logged in user
      const userListingBookingsFiltered = userListingBookings.filter(b => b.owner === email);
      console.log("Filtered bookings for user:", userListingBookingsFiltered);
      setUserBookings(userListingBookingsFiltered);
    })

  }, [listingId]);


  const showPrice = () => {
    if (startDateFromSearch && endDateFromSearch) {
      // if provide dates
      const totalPrice = calculatePrice(listing, startDateFromSearch, endDateFromSearch);
      return `$${totalPrice} total for ${startDateFromSearch} → ${endDateFromSearch}`;
    } else {
      // no dates provided
      return `$${listing.price}/night`;
    }
  };
  console.log('Booking data: ', userBookings);
  const handleBookingChange = (field, value) => {
    setBookingDates({ ...bookingDates, [field]: value });
  };

  const handleBook = async () => {
    if (!bookingDates.start || !bookingDates.end) {
      showAlert('Please select both start and end dates for booking.', 'warning');
      return;
    }
    try {
      const bookingInstance = new Booking();
      const bookingData = {
        dateRange: { start: bookingDates.start, end: bookingDates.end },
        totalPrice: calculatePrice(listing, bookingDates.start, bookingDates.end),
      };
      await bookingInstance.postBooking(listingId, bookingData);
      setTempConfirmation(`Booking requested: ${bookingDates.start} → ${bookingDates.end}`);
      showAlert('Booking requested successfully!', 'success');
    } catch (error) {
      console.error('Booking failed:', error.response.data.error);
      showAlert('Booking failed: ' + error.response.data.error, 'error');
    }
  };

  if (!listing) return <Typography>Loading...</Typography>;

  return (
    <Box p={4} display="flex" flexDirection="column" gap={3}>
      {/* Overview */}
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid sx={{ mb: { xs: 2, md: 0 } }}>
            <Box
              component="img"
              src={listing.thumbnail}
              alt={listing.title}
              sx={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: 2 }}
            />
          </Grid>
          <Grid sx={{ pl: { md: 3 } }}>
            <Typography variant="h3">{listing.title}</Typography>
            <Typography>Location: {listing.address.street}, {listing.address.city}, {listing.address.state}, {listing.address.zip}, {listing.address.country}</Typography>
            <Typography>Price: {showPrice()}</Typography>
            <Typography>Type: {listing.metadata.propertyType}</Typography>
            <Typography>Bathrooms: {listing.metadata.bathrooms}</Typography>
            <Typography>Bedrooms: {listing.metadata.bedrooms.length}</Typography>
            <Typography>Amenities: {listing.metadata.amenities}</Typography>
          </Grid>
          <Grid sx={{ width: '100%' }}>
            <Box sx={{ mt: 3 }}>
              <ImagesGallery images={listing.metadata.images} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Booking Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Make a Booking</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="Start Date"
            type="date"
            value={bookingDates.start}
            onChange={(e) => handleBookingChange('start', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            type="date"
            value={bookingDates.end}
            onChange={(e) => handleBookingChange('end', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleBook}>Book</Button>
        </Box>
        {tempConfirmation && <Typography color="primary" sx={{ mt: 1 }}>{tempConfirmation}</Typography>}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Here is the calculated price:</Typography>
          <Typography>
            {bookingDates.start && bookingDates.end
              ? `Total Price: $${calculatePrice(listing, bookingDates.start, bookingDates.end)}`
              : 'Please select start and end dates to see total price.'}
          </Typography>
        </Box>

        {userBookings.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Your Bookings:</Typography>
            {userBookings.map((b, idx) => (
              <Box key={idx} sx={{ mb: 1, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                <Box>
                  Status: {b.status === 'pending' && <span style={{ color: 'orange' }}>⏳ Pending</span>}
                  {b.status === 'accepted' && <span style={{ color: 'green' }}>✅ Accepted</span>}
                  {b.status === 'rejected' && <span style={{ color: 'red' }}>❌ Rejected</span>}
                </Box>
                <Typography>Booking ID: {b.id}</Typography>
                <Typography>Booking Owner: {b.owner}</Typography>
                <Typography>Date Range: {b.dateRange.start} → {b.dateRange.end}</Typography>
                <Typography>Total Price: ${b.totalPrice}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Reviews */}
      <ReviewsSection listingId={listingId} bookingId={userBookings.length > 0 ? userBookings[0].id : null} />
    </Box>
  );
}