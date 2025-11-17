// frontend/src/components/Filter.jsx
import { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Container,
  TextField,
  Typography,
  Slider,
  Divider,
} from '@mui/material';

export default function Filter({ allListings, onFilter }) {
  const [searchText, setSearchText] = useState('');
  const [bedroomRange, setBedroomRange] = useState([0, 10]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleApplyFilters = () => {
    let filteredListings = [...allListings];

    console.log('Applying filters:', { searchText, bedroomRange, priceRange });
    console.log('Before filtering data:', filteredListings);

    // search text matched
    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      filteredListings = filteredListings.filter(
        (listing) =>
          listing.title?.toLowerCase().includes(keyword) ||
          listing.address?.street?.toLowerCase().includes(keyword) ||
          listing.address?.city?.toLowerCase().includes(keyword) ||
          listing.address?.state?.toLowerCase().includes(keyword) ||
          listing.address?.country?.toLowerCase().includes(keyword)
      );
    }

    // sort by bedroom num
    if (bedroomRange) {
      const [minB, maxB] = bedroomRange;
      filteredListings = filteredListings.filter((listing) => {
        const bedrooms = listing.metadata?.bedrooms;
        if (typeof bedrooms !== 'number') return false;
        return bedrooms >= minB && bedrooms <= maxB;
      });
    }
    // sort by price
    if (priceRange) {
      const [minP, maxP] = priceRange;
      filteredListings = filteredListings.filter((listing) => {
        const price = listing.price;
        if (typeof price !== 'number') return false;
        return price >= minP && price <= maxP;
      });
    }

    console.log('Filtered listings count:', filteredListings.length);
    console.log('After filtering data:', filteredListings);
    onFilter(filteredListings);
  };

  const handleClear = () => {
    setSearchText('');
    setBedroomRange([0, 10]);
    setPriceRange([0, 1000]);
    onFilter(allListings);
  };

  return (
    <Container sx={{ my: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Listings Filter
      </Typography>
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <TextField
          label="Search (Title/City)"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Box>
          <Typography gutterBottom>Bedrooms range</Typography>
          <Slider
            value={bedroomRange}
            onChange={(_, newValue) => setBedroomRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            sx={{ width: 200 }}
          />
        </Box>
        <Box>
          <Typography gutterBottom>Price range (per night)</Typography>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{ width: 200 }}
          />
        </Box>
      </Stack>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear Filters
        </Button>
      </Box>
    </Container>
  );
}
