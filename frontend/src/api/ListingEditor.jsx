import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import Listing from '../classes/Listing';
import Address from "../classes/Address.jsx";
import AddressField from "../components/AddressField.jsx";

export default function ListingEditor() {
  const [formData, setFormData] = useState({
    title: '',//string
    address: {Address},//string
    price: '',//number
    thumbnail: '',//string
    metadata: {
      propertyType: '',
      numBathrooms: '',
      bedrooms: '',
      amenities: '',
    },
  });

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
    const newListing = new Listing(
      formData.title,
      formData.address,
      formData.price,
      formData.thumbnail,
      formData.metadata.propertyType,
      formData.metadata.numBathrooms,
      formData.metadata.bedrooms,
      formData.metadata.amenities
    );
    console.log('Submitting listing:', newListing);
    newListing.postListing(formData)
      .then((response) => {
        console.log('Listing submitted successfully:', response);
        // Optionally reset form or show success message
      })
      .catch((error) => {
        console.error('Error submitting listing:', error);
        // Optionally show error message
      });
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: '40px auto' }}>
      <Typography variant="h5" gutterBottom>
        Listing Editor
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
        <AddressField address={formData.address} setAddress={(address) => setFormData({ ...formData, address })} />
        <TextField label="Price (per night)" name="price" value={formData.price} onChange={handleChange} required />
        <TextField label="Thumbnail URL" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
        <TextField label="Property Type" name="propertyType" value={formData.metadata.propertyType} onChange={handleChange} />
        <TextField label="Number of Bathrooms" name="numBathrooms" value={formData.metadata.numBathrooms} onChange={handleChange} />
        <TextField
          label="Bedrooms"
          name="bedrooms"
          value={formData.metadata.bedrooms}
          onChange={handleChange}
        />
        <TextField
          label="Amenities"
          name="amenities"
          value={formData.metadata.amenities}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
