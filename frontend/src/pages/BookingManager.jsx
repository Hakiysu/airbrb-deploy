// frontend/src/components/BookingManager.jsx
import { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from '@mui/material';
import { useParams } from 'react-router';
import Booking from '../classes/Booking.jsx';
import Listing from '../classes/Listing.jsx';
import { calculatePrice } from '../api/utils.jsx';

export default function BookingManager() {
  const { listingId } = useParams();

  const [listing, setListing] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [stats, setStats] = useState({ totalDays: 0, totalProfit: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        // get listing details
        const listingObj = new Listing();
        const fetchedListing = await listingObj.getListingById(listingId);
        setListing(fetchedListing);

        // get all bookings for this listing
        const bookingObj = new Booking();
        const allBookings = await bookingObj.getAllBookings();
        // filter bookings for this listing
        const listingBookings = allBookings.filter(b => b.listingId === listingId);

        setBookings(listingBookings);
        setPendingBookings(listingBookings.filter(b => b.status === 'pending'));
        setAcceptedBookings(listingBookings.filter(b => b.status === 'accepted'));

        console.log('Listing bookings:', listingBookings);
        console.log('Pending bookings:', listingBookings.filter(b => b.status === 'pending'));
        console.log('Accepted bookings:', listingBookings.filter(b => b.status === 'accepted'));

        // calculate stats for the current year
        const currentYear = new Date().getFullYear();
        const thisYearAccepted = listingBookings.filter(b => {
          const start = new Date(b.dateRange.start);
          const end = new Date(b.dateRange.end);
          return b.status === 'accepted' &&
            (start.getFullYear() === currentYear || end.getFullYear() === currentYear);
        });

        const totalDays = thisYearAccepted.reduce((sum, b) => {
          const start = new Date(b.dateRange.start);
          const end = new Date(b.dateRange.end);
          return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        }, 0);

        const totalProfit = thisYearAccepted.reduce((sum, b) => {
          return sum + (b.totalPrice || calculatePrice(fetchedListing, b.dateRange.start, b.dateRange.end));
        }, 0);

        setStats({ totalDays, totalProfit });
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [listingId]);

  const handleAccept = async (booking) => {
    try {
      const bookingObj = new Booking(booking.id);
      console.log('Accepting booking:', bookingObj);
      await bookingObj.acceptBooking(booking.id);
      setPendingBookings(prev => prev.filter(b => b.id !== booking.id));
      setAcceptedBookings(prev => [...prev, { ...booking, status: 'accepted' }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = async (booking) => {
    try {
      const bookingObj = new Booking(booking.id);
      await bookingObj.rejectBooking();
      setPendingBookings(prev => prev.filter(b => b.id !== booking.id));
      setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'rejected' } : b));
    } catch (err) {
      console.error(err);
    }
  };

  if (!listing) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      {/* Listing Details */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h4">{listing.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Posted on: {listing.postedOn ? new Date(listing.postedOn).toLocaleDateString() : 'N/A'}
        </Typography>
        <Typography>Price: ${listing.price} per night</Typography>
        <Typography>Type: {listing.metadata.propertyType}</Typography>
        <Typography>Bathrooms: {listing.metadata.bathrooms}</Typography>
        <Typography>Bedrooms: {listing.metadata.bedrooms.length}</Typography>
      </Paper>

      {/* Summary Data */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Typography>Total booked days this year: {stats.totalDays}</Typography>
        <Typography>Total profit this year: ${stats.totalProfit}</Typography>
      </Paper>

      {/* Pending Booking Requests */}
      <Typography variant="h5" sx={{ mb: 1 }}>Pending Booking Requests</Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingBookings.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.owner}</TableCell>
                <TableCell>{b.dateRange.start}</TableCell>
                <TableCell>{b.dateRange.end}</TableCell>
                <TableCell>${b.totalPrice}</TableCell>
                <TableCell>{b.status}</TableCell>
                <TableCell>
                  <Button color="success" onClick={() => handleAccept(b)}>Accept</Button>
                  <Button color="error" onClick={() => handleDecline(b)}>Decline</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Booking History */}
      <Typography variant="h5" sx={{ mb: 1 }}>Booking History</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.owner}</TableCell>
                <TableCell>{b.dateRange.start}</TableCell>
                <TableCell>{b.dateRange.end}</TableCell>
                <TableCell>${b.totalPrice}</TableCell>
                <TableCell>{b.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}