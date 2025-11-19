import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Card, CardMedia, CardContent } from '@mui/material';
import Listing from '../classes/Listing.jsx';
import Address from "../classes/Address.jsx";
import AddressField from "../components/AddressField.jsx";
import { useParams, useNavigate } from 'react-router';
import { img2base64 } from '../api/utils.jsx';

export default function ListingEditor() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',//string
    address: new Address(),//Address
    price: '',//number
    thumbnail: '',//string
    metadata: {
      propertyType: '',//string
      numBathrooms: '',//number
      bedrooms: '',//number
      amenities: '',//string
    },
  });

  useEffect(() => {
    if (listingId) {
      // detect listing id, know edit now, get specific data
      const listingInstance = new Listing();
      listingInstance.getListingById(listingId).then(data => {
        setFormData(data.listing); // load data
      });
    }
  }, [listingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.metadata) {
      setFormData({
        ...formData,
        metadata: {
          ...formData.metadata,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingInstance = new Listing();
    if (listingId) {
      // submit as UPDATE/EDIT
      listingInstance.updateListing(listingId, formData).then(() => navigate('/listing-manager'));
    } else {
      // submit as CREATE
      listingInstance.postListing(formData).then(() => navigate('/listing-manager'));
    }
  }

  console.log("Here is listingId:", listingId);
  console.log("Here is formData:", formData);

  return (
    <Paper
      sx={{
        p: 4,
        width: '90%',
        margin: '40px auto',
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {listingId ? "Edit Listing" : "Create Listing"}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} display="flex" justifyContent="center">
          <Card sx={{ borderRadius: 2, overflow: 'hidden' , width: '300px'}}>
            <CardMedia
              component="img"
              height="200"
              image={formData.thumbnail}
              alt={formData.title}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>{formData.title || 'Untitled Listing'}</Typography>
              <Typography variant="body2">Price: ${formData.price || 0} per night</Typography>
              <Typography variant="body2">Type: {formData.metadata.propertyType || '-'}</Typography>
              <Typography variant="body2">Bathrooms: {formData.metadata.numBathrooms || 0}</Typography>
              <Typography variant="body2">Bedrooms: {formData.metadata.bedrooms || 0}</Typography>
              <Typography variant="body2">Amenities: {formData.metadata.amenities || '-'}</Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ mt: 2 }}
              >
                Upload Thumbnail
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const base64 = await img2base64(file);
                      setFormData({ ...formData, thumbnail: base64 });
                    }
                  }}
                />
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Listing Title" name="title" value={formData.title??""} onChange={handleChange} required />
            <AddressField address={formData.address} setAddress={(address) => setFormData({ ...formData, address })} />
            <TextField label="Price (per night)" name="price" value={formData.price??""} onChange={handleChange} required />
            <TextField label="Property Type" name="propertyType" value={formData.metadata.propertyType??""} onChange={handleChange} />
            <TextField label="Number of Bathrooms" name="numBathrooms" value={formData.metadata.numBathrooms??""} onChange={handleChange} />
            <TextField
              label="Bedrooms"
              name="bedrooms"
              value={formData.metadata.bedrooms??""}
              onChange={handleChange}
            />
            <TextField
              label="Amenities"
              name="amenities"
              value={formData.metadata.amenities??""}
              onChange={handleChange}
            />
            <Box display="flex" gap={2} mt={2}>
              <Button type="submit" variant="contained" color="primary">
                {listingId ? "Update Listing" : "Create Listing"}
              </Button>
              <Button variant="outlined" onClick={() => navigate('/listing-manager')}>
              Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
