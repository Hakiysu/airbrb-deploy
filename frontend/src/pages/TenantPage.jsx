// frontend/src/pages/TenantPage.jsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import StarIcon from '@mui/icons-material/Star';
import { getTotalBeds } from '../api/utils.jsx';

export default function TenantPage({ listings }) {
  const navigate = useNavigate();

  const publishedListings = listings.filter(l => l.published);

  return (
    <>
      {publishedListings.length === 0 ? (
        <Typography sx={{ mb: 3 }}>No available listings.</Typography>
      ) : (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {publishedListings.map(listing => (
                <TableRow
                  key={listing.id}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/booking-editor/${listing.id}`)}
                >
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}