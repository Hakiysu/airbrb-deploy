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
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { getTotalBeds } from "../api/utils.jsx";

export default function Filter({ allListings, onFilter }) {
  const [searchText, setSearchText] = useState('');
  const [bedroomRange, setBedroomRange] = useState([0, 10]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortField, setSortField] = useState(''); // 'beds', 'price', 'rating'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApplyFilters = () => {
    let filteredListings = [...allListings];

    // search by text
    if (searchText) {
      const keyword = searchText.toLowerCase();
      filteredListings = filteredListings.filter(listing =>
        listing.title?.toLowerCase().includes(keyword) ||
        listing.address?.street?.toLowerCase().includes(keyword) ||
        listing.address?.city?.toLowerCase().includes(keyword) ||
        listing.address?.state?.toLowerCase().includes(keyword) ||
        listing.address?.country?.toLowerCase().includes(keyword)
      );
    }
    console.log(`After text search (${searchText}):`, filteredListings);

    // filter by bed num
    const [minB, maxB] = bedroomRange;
    filteredListings = filteredListings.filter(listing => {
      const totalBeds = getTotalBeds(listing);
      return totalBeds >= minB && totalBeds <= maxB;
    });

    // filter by price
    const [minP, maxP] = priceRange;
    filteredListings = filteredListings.filter(listing =>
      typeof listing.price === 'number' && listing.price >= minP && listing.price <= maxP
    );

    // filter by date
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredListings = filteredListings.filter(listing => {
        if (!Array.isArray(listing.availability) || listing.availability.length === 0) return false;
        return listing.availability.some(a => {
          const aStart = new Date(a.start);
          const aEnd = new Date(a.end);
          return start >= aStart && end <= aEnd;
        });
      });
    }

    // sort data
    if (sortField) {
      filteredListings.sort((a, b) => {
        let valA, valB;
        switch (sortField) {
        case 'beds':
          valA = getTotalBeds(a);
          valB = getTotalBeds(b);
          break;
        case 'price':
          valA = a.price;
          valB = b.price;
          break;
        case 'rating':
          valA = a.rating || 0;
          valB = b.rating || 0;
          break;
        default:
          valA = 0;
          valB = 0;
        }
        if (sortOrder === 'asc') return valA - valB;
        else return valB - valA;
      });
    }

    console.log('After filtering & sorting data:', filteredListings);
    onFilter(filteredListings, { startDate, endDate });
  };

  const handleClear = () => {
    setSearchText('');
    setBedroomRange([0, 10]);
    setPriceRange([0, 1000]);
    setSortField('');
    setSortOrder('asc');
    setStartDate('');
    setEndDate('');
    const clearedListings = allListings.map(l => ({
      ...l,
      startDate: l.startDate || null,
      endDate: l.endDate || null,
    }));
    onFilter(clearedListings);
  };

  return (
    <Container sx={{ my: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Listings Filter</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
        <TextField label="Search (Title/City)" variant="outlined" fullWidth value={searchText} onChange={e => setSearchText(e.target.value)} />
        <Box>
          <Typography gutterBottom>Bedrooms range</Typography>
          <Slider value={bedroomRange} onChange={(_, val) => setBedroomRange(val)} valueLabelDisplay="auto" min={0} max={10} sx={{ width: 200 }} />
        </Box>
        <Box>
          <Typography gutterBottom>Price range ($/night)</Typography>
          <Slider value={priceRange} onChange={(_, val) => setPriceRange(val)} valueLabelDisplay="auto" min={0} max={1000} sx={{ width: 200 }} />
        </Box>
        <Box>
          <Typography gutterBottom>Sort by</Typography>
          <FormControl size="small" sx={{ minWidth: 120, mb: 1 }}>
            <Select value={sortField} onChange={e => setSortField(e.target.value)} variant="outlined">
              <MenuItem value="">None</MenuItem>
              <MenuItem value="beds">Beds</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)} variant="outlined">
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography gutterBottom>Date range</Typography>
          <TextField type="date" value={startDate} onChange={e => setStartDate(e.target.value)} sx={{ mb: 1 }} />
          <TextField type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </Box>
      </Stack>
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>Apply Filters</Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>Clear Filters</Button>
      </Box>
    </Container>
  );
}