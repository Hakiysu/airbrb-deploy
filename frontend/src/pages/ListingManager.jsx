// frontend/src/pages/ListingManager.jsx
// 2.2.1, 2.2.2 Manage own listings page
import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Avatar } from '@mui/material';
import Listing from "../classes/Listing.jsx";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router';
import { useContext } from "react";
import { AuthContext } from '../api/AuthContext.jsx';
import StarIcon from '@mui/icons-material/Star';
import { getTotalBeds } from '../api/utils.jsx';
import PublishDialog from '../pages/Dialogs/PublishDialog.jsx';
import ProfitChart from '../components/ProfitChart.jsx';

export default function ListingManager() {
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishListing, setPublishListing] = useState(null);

  const openPublishDialog = (listing) => { setPublishListing(listing); setPublishDialogOpen(true); };
  const closePublishDialog = () => { setPublishListing(null); setPublishDialogOpen(false); };

  const [listings, setListings] = useState([]);
  const { email: userEmail } = useContext(AuthContext); // 注意这里用 email
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteListingId, setDeleteListingId] = useState(null);

  useEffect(() => {
    new Listing().getListingsWithMetadata().then(data => {
      const filtered = data.filter(l => l.owner === userEmail);
      setListings(filtered);
    }).catch(err => console.error(err));
  }, [userEmail]);

  const handleEdit = (id) => navigate(`/listing-editor/${id}`);
  const handleDelete = (id) => {
    setDeleteListingId(id);
    setDialogOpen(true);
  };
  const handleBookingManager = (id) => navigate(`/booking-manager/${id}`);
  const actDelete = () => {
    new Listing().deleteListing(deleteListingId).then(() => {
      setListings(listings.filter(l => l.id !== deleteListingId));
      setDialogOpen(false);
      setDeleteListingId(null);
    });
  };
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Hosted Listings</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate('/listing-editor')}>
        Create New Listing
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this listing?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="secondary" onClick={actDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <PublishDialog
        open={publishDialogOpen}
        listing={publishListing}
        onClose={closePublishDialog}
        onConfirm={(availability) => {
          if (publishListing.published) {
            new Listing().unpublishListing(publishListing.id).then(() => {
              setListings(listings.map(l => l.id === publishListing.id ? { ...l, published: false } : l));
              closePublishDialog();
            });
          } else {
            new Listing().publishListing(publishListing.id, { availability }).then(() => {
              setListings(listings.map(l => l.id === publishListing.id ? { ...l, published: true, availability } : l));
              closePublishDialog();
            });
          }
        }}
      />
      {listings.length === 0 ? (
        <Typography>No listings found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Beds</TableCell>
                <TableCell>Bathrooms</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Reviews</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listings.map(listing => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <Avatar variant="rounded" src={listing.thumbnail} alt={listing.title} />
                  </TableCell>
                  <TableCell>{listing.title}</TableCell>
                  <TableCell>{listing.metadata.propertyType}</TableCell>
                  <TableCell>{getTotalBeds(listing)}</TableCell>
                  <TableCell>{listing.metadata.bathrooms}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon fontSize="small" sx={{ color: '#fbc02d' }} />
                      <Typography sx={{ ml: 0.5 }}>{listing.rating || 0}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{listing.reviews.length}</TableCell>
                  <TableCell>${listing.price}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" onClick={() => handleEdit(listing.id)}>Edit</Button>
                    <Button
                      variant="contained"
                      color={listing.published ? "warning" : "primary"}
                      size="small"
                      onClick={() => openPublishDialog(listing)}
                      sx={{ ml: 1 }}
                    >
                      {listing.published ? "Take Offline" : "Publish"}
                    </Button>
                    <Button size="small" variant="outlined" color="warning" sx={{ ml: 1 }} onClick={() => handleDelete(listing.id)}>Delete</Button>
                    <Button size="small" variant="contained" sx={{ ml:1}} onClick={() => handleBookingManager(listing.id)}>Booking Manager</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ProfitChart />
    </Container>
  );
}