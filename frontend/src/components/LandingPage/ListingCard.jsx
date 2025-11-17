import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';
import { useNavigate } from "react-router";

export default function ListingCard({ listing }) {
  const thumbnail = listing.thumbnail || '/default.jpg';
  const title = listing.title || 'Untitled Listing';
  const reviewCount = Array.isArray(listing.reviews) ? listing.reviews.length : 0;
  const navigate = useNavigate();

  return (
    <Card
      sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => navigate(`/listings/${listing.id}`)}
    >
      <CardMedia
        component="img"
        height="160"
        image={thumbnail}
        alt={title}
      />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Rating
            precision={0.5}
            readOnly
            value={listing.rating || 3.0}
          />
          <Typography variant="body2" color="text.secondary">
            ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
