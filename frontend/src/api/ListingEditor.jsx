import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import Listing from '../classes/Listing';

export default function ListingEditor() {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    thumbnail: '',
    propertyType: '',
    numBathrooms: '',
    bedrooms: '',
    amenities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = new Listing(
      formData.title,
      formData.address,
      parseFloat(formData.price),
      formData.thumbnail,
      formData.propertyType,
      parseInt(formData.numBathrooms),
      formData.bedrooms.split(',').map(b => b.trim()),
      formData.amenities.split(',').map(a => a.trim())
    );
    newListing.postListing(formData);
    console.log("Listing submitted:", newListing.createListing());
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: '40px auto' }}>
      <Typography variant="h5" gutterBottom>
        Listing Editor
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} required />
        <TextField label="Price (per night)" name="price" value={formData.price} onChange={handleChange} required />
        <TextField label="Thumbnail URL" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
        <TextField label="Property Type" name="propertyType" value={formData.propertyType} onChange={handleChange} />
        <TextField label="Number of Bathrooms" name="numBathrooms" value={formData.numBathrooms} onChange={handleChange} />
        <TextField
          label="Bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
        <TextField
          label="Amenities"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
