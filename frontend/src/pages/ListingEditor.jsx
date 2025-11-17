import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import Listing from '../classes/Listing.jsx';
import Address from "../classes/Address.jsx";
import AddressField from "../components/AddressField.jsx";
import { useParams, useNavigate } from 'react-router';

export default function ListingEditor() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',//string
    address: new Address(),//Address
    price: '',//number
    thumbnail: '',//string
    metadata: {
      propertyType: '',
      numBathrooms: '',
      bedrooms: '',
      amenities: '',
    },
  });

  useEffect(() => {
    if (listingId) {
      // detect listing id, know edit now, get specific data
      const listingInstance = new Listing();
      listingInstance.getListingById(listingId).then(data => {
        setFormData(data); // load data
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

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: '40px auto' }}>
      <Typography variant="h5" gutterBottom>
        {listingId ? "Edit Listing" : "Create Listing"}
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
        <Button type="submit">{listingId ? "Save Changes" : "Create Listing"}</Button>
      </Box>
    </Paper>
  );
}
