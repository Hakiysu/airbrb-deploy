// frontend/src/pages/ListingEditor.jsx
// 2.2.3 Edit and Create Listings Page
import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Card, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Listing from '../classes/Listing.jsx';
import AddressField from "../components/AddressField.jsx";
import { useParams, useNavigate } from 'react-router';
import { img2base64 } from '../api/utils.jsx';
import { useAlert } from '../api/useAlert.jsx';

export default function ListingEditor() {
  const { listingId } = useParams();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    address: { street: '', city: '', state: '', zip: '', country: '' },
    price: '',
    thumbnail: '',
    metadata: {
      propertyType: '',
      bathrooms: '',
      bedrooms: [],
      amenities: '',
      images: []
    },
    availability: [],
  });

  // load listing if editing
  useEffect(() => {
    if (listingId) {
      const listingInstance = new Listing();
      listingInstance.getListingById(listingId).then(data => {
        console.log(data);
        setFormData(data);
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
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingInstance = new Listing();
    if (listingId) {
      showAlert('Uploading listing changes...', 'info');
      listingInstance.updateListing(listingId, formData).then(() => navigate('/listing-manager'));
    } else {
      showAlert('Creating new listing...', 'info');
      listingInstance.postListing(formData).then(() => navigate('/listing-manager'));
    }
  }

  return (
    <Paper sx={{ p: 4, width: '90%', margin: '40px auto', borderRadius: 3 }}>
      <Grid container spacing={2}>
        {/* Left: Info */}
        <Grid sx={{ flexBasis: '30%', mb: 2 }}>
          <Card sx={{ p: 2 }}>
            {formData.thumbnail && (
              <Box sx={{ mb: 2, width: '200px' }}>
                <img src={formData.thumbnail} alt="Thumbnail" style={{ width: '100%', borderRadius: 4 }} />
              </Box>
            )}
            <Typography variant="h6">{formData.title || 'Untitled Listing'}</Typography>
            <Typography>Price: ${formData.price || 0}</Typography>
            <Typography>Type: {formData.metadata.propertyType}</Typography>
            <Typography>Bathrooms: {formData.metadata.bathrooms}</Typography>
            <Typography>Bedrooms: {formData.metadata.bedrooms.length}</Typography>
            <Typography>Amenities: {formData.metadata.amenities}</Typography>
            <Button variant="outlined" component="label" sx={{ mt: 2 }}>
              Upload Thumbnail
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={async e => {
                  const file = e.target.files[0];
                  if (file) {
                    const base64 = await img2base64(file);
                    setFormData({ ...formData, thumbnail: base64 });
                  }
                }}
              />
            </Button>
          </Card>
        </Grid>

        {/* Right: Images */}
        <Grid sx={{ mb: 2, flexGrow: 1 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Property Images</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {formData.metadata.images?.map((img, idx) => (
                <Box key={idx} sx={{ position: 'relative' }}>
                  <img src={img} alt={`Property ${idx}`} width={200} style={{ borderRadius: 4 }} />
                  <Button
                    size="small"
                    color="error"
                    sx={{ position: 'absolute', top: -8, right: -8, minWidth: 0, padding: '2px 4px' }}
                    onClick={() => {
                      const newImages = [...formData.metadata.images];
                      newImages.splice(idx, 1);
                      setFormData({ ...formData, metadata: { ...formData.metadata, images: newImages } });
                    }}
                  >
                    X
                  </Button>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 1 }}
            >
              Upload Images
              <input
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={async (e) => {
                  const files = Array.from(e.target.files);
                  const base64Images = await Promise.all(files.map(f => img2base64(f)));
                  setFormData({
                    ...formData,
                    metadata: { ...formData.metadata, images: [...(formData.metadata.images || []), ...base64Images] }
                  });
                }}
              />
            </Button>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Grid sx={{ width: '100%' }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Title */}
            <TextField label="Listing Title" name="title" value={formData.title ?? ""} onChange={handleChange} required />
            {/* Address */}
            <AddressField address={formData.address} setAddress={(address) => setFormData({ ...formData, address })} />
            {/* Price */}
            <TextField label="Price (per night)" name="price" value={formData.price ?? ""} onChange={handleChange} required />
            {/* Property Type */}
            <FormControl fullWidth variant="outlined">
              <InputLabel id="property-type-label">Property Type</InputLabel>
              <Select
                labelId="property-type-label"
                id="property-type"
                value={formData.metadata.propertyType ?? ""}
                onChange={handleChange}
                name="propertyType"
                label="Property Type"
                variant="outlined"
                required
              >
                <MenuItem value="Apartment">Apartment</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Condo">Condo</MenuItem>
                <MenuItem value="Townhouse">Townhouse</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
              </Select>
            </FormControl>
            {/* Bathrooms */}
            <TextField label="Number of Bathrooms" name="bathrooms" value={formData.metadata.bathrooms ?? ""} onChange={handleChange} />
            {/* Bedrooms */}
            <Typography variant="h6">Bedrooms</Typography>
            {formData.metadata.bedrooms.map((bedroom, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <TextField
                    label="Bedroom Name"
                    value={bedroom.name}
                    onChange={(e) => {
                      const newBedrooms = [...formData.metadata.bedrooms];
                      newBedrooms[idx].name = e.target.value;
                      setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
                    }}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => {
                      const newBedrooms = formData.metadata.bedrooms.filter((_, i) => i !== idx);
                      setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
                    }}
                  >
                    Remove Bedroom
                  </Button>
                </Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Beds:</Typography>
                {bedroom.beds.map((bed, bIdx) => (
                  <Box key={bIdx} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <TextField
                      label="Type"
                      value={bed.type}
                      onChange={(e) => {
                        const newBedrooms = [...formData.metadata.bedrooms];
                        newBedrooms[idx].beds[bIdx].type = e.target.value;
                        setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
                      }}
                      size="small"
                    />
                    <TextField
                      label="Count"
                      type="number"
                      value={bed.count}
                      onChange={(e) => {
                        const newBedrooms = [...formData.metadata.bedrooms];
                        newBedrooms[idx].beds[bIdx].count = parseInt(e.target.value) || 1;
                        setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
                      }}
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => {
                        const newBedrooms = [...formData.metadata.bedrooms];
                        newBedrooms[idx].beds = newBedrooms[idx].beds.filter((_, i) => i !== bIdx);
                        setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
                      }}
                    >
                      Remove Bed
                    </Button>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    const newBedrooms = [...formData.metadata.bedrooms];
                    newBedrooms[idx].beds.push({ type: '', count: 1 });
                    setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
                  }}
                >
                  Add Bed
                </Button>
              </Paper>
            ))}
            <Button
              variant="outlined"
              onClick={() => {
                const newBedrooms = [...formData.metadata.bedrooms, { name: '', beds: [] }];
                setFormData({ ...formData, metadata: { ...formData.metadata, bedrooms: newBedrooms } });
              }}
            >
              Add Bedroom
            </Button>
            {/* Amenities */}
            <TextField label="Amenities (comma separated)" name="amenities" value={formData.metadata.amenities ?? ""} onChange={handleChange} />
            {/* Submit */}
            <Box display="flex" gap={2} mt={2}>
              <Button type="submit" variant="contained" color="primary">{listingId ? "Update Listing" : "Create Listing"}</Button>
              <Button variant="outlined" onClick={() => navigate('/listing-manager')}>Cancel</Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Paper>
  );
}