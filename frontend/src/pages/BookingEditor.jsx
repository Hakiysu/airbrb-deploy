// frontend/src/pages/BookingEditor.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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
  const [bookingDates, setBookingDates] = useState({ start: '', end: '' });
  const [userBookings, setUserBookings] = useState([]);
  const [tempConfirmation, setTempConfirmation] = useState('');

  useEffect(() => {
    if (!listingId) return;
    const listingInstance = new Listing();
    listingInstance.getListingById(listingId).then(setListing);
    // Fetch user's existing bookings for this listing
    const bookingsInstance = new Booking();
    bookingsInstance.getAllBookings().then((bookings) => {
      console.log(bookings);
      setBooking(bookings);
      // Filter bookings for the current listing
      const userListingBookings = bookings.filter(b => b.listingId === listingId);
      // filter by email of logged in user
      const userListingBookingsFiltered = userListingBookings.filter(b => b.owner === email);
      setUserBookings(userListingBookingsFiltered);
    })

  }, [listingId]);

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
            <Typography>Price: ${listing.price} per night</Typography>
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
              <Typography key={idx}>{b.start} → {b.end} | Status: {b.status}</Typography>
            ))}
          </Box>
        )}
      </Paper>

      {/* Reviews */}
      <ReviewsSection listingId={listingId} bookingId={booking ? booking.id : null} />
    </Box>
  );
}