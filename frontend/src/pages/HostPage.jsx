// frontend/src/pages/HostPage.jsx
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Typography, Box } from '@mui/material';
import Listing from '../classes/Listing.jsx';
import StarIcon from '@mui/icons-material/Star';
import { getTotalBeds } from '../api/utils.jsx';
import PublishDialog from './Dialogs/PublishDialog.jsx';
import DeleteDialog from './Dialogs/DeleteDialog.jsx';
import ProfitChart from '../components/ProfitChart.jsx';
import { useNavigate } from 'react-router';

export default function HostPage({ listings, userEmail }) {
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishListing, setPublishListing] = useState(null);
  const navigate = useNavigate();

  // Open publish/unpublish dialog
  const openPublishDialog = (listing) => { setPublishListing(listing); setPublishDialogOpen(true); };
  const closePublishDialog = () => { setPublishListing(null); setPublishDialogOpen(false); };

  // Delete dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => { setDeleteId(id); setDialogOpen(true);};
  const handleEdit = (id) => navigate(`/listing-editor/${id}`);
  const handleBookingManager = (id) => navigate(`/booking-manager/${id}`);

  // Filter only user's listings
  const userListings = listings.filter(l => l.owner === userEmail);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button variant="contained" onClick={() => navigate('/listing-editor')}>Add New Listing</Button>
      </Box>
      {userListings.length === 0 ? (
        <Typography sx={{ mb: 3 }}>No listings found.</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
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
                {userListings.map(listing => (
                  <TableRow key={listing.id}>
                    <TableCell><Avatar variant="rounded" src={listing.thumbnail} alt={listing.title} /></TableCell>
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
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Button size="small" variant="contained" onClick={() => handleEdit(listing.id)}>Edit</Button>
                      <Button
                        size="small"
                        variant="contained"
                        color={listing.published ? "warning" : "primary"}
                        sx={{ ml: 1 }}
                        onClick={() => openPublishDialog(listing)}
                      >
                        {listing.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button size="small" variant="outlined" color="warning" sx={{ ml: 1 }} onClick={() => handleDelete(listing.id)}>Delete</Button>
                      <Button size="small" variant="contained" sx={{ ml: 1 }} onClick={() => handleBookingManager(listing.id)}>Booking Manager</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ProfitChart />
          <PublishDialog
            open={publishDialogOpen}
            listing={publishListing}
            onClose={closePublishDialog}
            onConfirm={(availability) => {
              if (publishListing.published) {
                new Listing().unpublishListing(publishListing.id).then(() => closePublishDialog());
              } else {
                new Listing().publishListing(publishListing.id, { availability }).then(() => closePublishDialog());
              }
            }}
          />
          <DeleteDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={() => {
              new Listing().deleteListing(deleteId).then(() => {
                setDialogOpen(false);
              });
            }}
          />
        </>
      )}
    </>
  );
}