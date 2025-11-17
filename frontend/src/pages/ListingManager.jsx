// frontend/src/components/ListingManager.jsx
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Typography, Paper, Button} from '@mui/material';
import Listing from "../classes/Listing.jsx";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
      for (let i = 0; i < filteredListings.length; i++) {
        const addr = filteredListings[i].address;
        filteredListings[i].address = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip}, ${addr.country}`;
      }
      console.log("After filtering listings:", filteredListings);
      setListings(filteredListings);
    });
  }, []);

  console.log("Listings state:", listings);

  const handleEdit = (id) => {
    console.log("Edit listing with id:", id);
  }


  // alert dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteListingId, setDeleteListingId] = useState(null);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  }
  const handleDialogClose = () => {
    setDialogOpen(false);
  }
  const actDelete = () => {
    console.log("Confirmed delete listing with id:", deleteListingId);
    new Listing().deleteListing(deleteListingId).then((response) => {
      console.log("Delete response:", response);
      // remove from listings state
      setListings(listings.filter(listing => listing.id !== deleteListingId));
      handleDialogClose();
      //clear deleteListingId
      setDeleteListingId(null);
    });
  }
  const handleDelete = (id) => {
    console.log("Delete listing with id:", id);
    setDeleteListingId(id);
    handleDialogOpen();
  }



  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        HERE IS LISTING MANAGER
      </Typography>
      {listings.length === 0 ? (
        <Typography variant="body1">You have no listings.</Typography>
      ) : (
        <Paper sx={{ height: 400, width: '100%' }}>
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this listing?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={actDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>{listing.id}</TableCell>
                    <TableCell>{listing.title}</TableCell>
                    <TableCell>{listing.address}</TableCell>
                    <TableCell>{listing.price}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleEdit(listing.id)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="secondary" size="small" sx={{ ml: 1 }} onClick={() => handleDelete(listing.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>

  );
}