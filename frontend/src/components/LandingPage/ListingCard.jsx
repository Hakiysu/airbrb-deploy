// frontend/src/components/LandingPage/ListingCard.jsx
import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';
import { Bed, Hotel, Bathtub, Apartment } from '@mui/icons-material';
import { useNavigate } from "react-router";
import { getTotalBeds } from '../../api/utils.jsx';

export default function ListingCard({ listing }) {
  const thumbnail = listing.thumbnail || '/default.jpg';
  const title = listing.title || 'Untitled Listing';
  const reviewCount = Array.isArray(listing.reviews) ? listing.reviews.length : 0;
  const rating = listing.rating || 3.0;
  const price = listing.price || null;
  const location = listing.address ? `${listing.address.street}, ${listing.address.city}` : null;
  const navigate = useNavigate();

  const bedrooms = listing.metadata?.bedrooms?.length || 0;
  const beds = getTotalBeds(listing);
  const bathrooms = listing.metadata?.bathrooms || 0;
  const propertyType = listing.metadata?.propertyType || '';

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { boxShadow: 6 }
      }}
      onClick={() => navigate(`/booking-editor/${listing.id}`)}
    >
      <CardMedia
        component="img"
        height="160"
        image={thumbnail}
        alt={title}
      />
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {location && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {location}
          </Typography>
        )}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}
          gap={1}
          mt={1}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <Hotel fontSize="small" />
            <Typography variant="body2">{bedrooms} rooms</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Bed fontSize="small" />
            <Typography variant="body2">{beds} beds</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Bathtub fontSize="small" />
            <Typography variant="body2">{bathrooms} baths</Typography>
          </Box>
          {propertyType && (
            <Box display="flex" alignItems="center" gap={0.5}>
              <Apartment fontSize="small" />
              <Typography variant="body2">{propertyType}</Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Rating precision={0.5} readOnly value={rating} />
          <Typography variant="body2" color="text.secondary">
            ({reviewCount} reviews)
          </Typography>
        </Box>
        {price && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
            ${price}/night
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}