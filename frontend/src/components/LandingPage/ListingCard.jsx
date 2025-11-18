// frontend/src/components/LandingPage/ListingCard.jsx
import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';
import { useNavigate } from "react-router";

export default function ListingCard({ listing }) {
  const thumbnail = listing.thumbnail || '/default.jpg';
  const title = listing.title || 'Untitled Listing';
  const reviewCount = Array.isArray(listing.reviews) ? listing.reviews.length : 0;
  const rating = listing.rating || 3.0;
  const price = listing.price || null;
  const location = listing.location || null;
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': { boxShadow: 6 }
      }}
      onClick={() => navigate(`/listings/${listing.id}`)}
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
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Rating precision={0.5} readOnly value={rating} />
          <Typography variant="body2" color="text.secondary">
            REVIEW NUMBER: {reviewCount} reviews
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
