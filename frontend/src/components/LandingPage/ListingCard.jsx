import { Card, CardMedia, CardContent, Typography, Rating, Box } from '@mui/material';

export default function ListingCard({ listing }) {
  const thumbnail = listing.thumbnail || '/default.jpg';
  const title = listing.title || 'Untitled Listing';
  const reviewCount = Array.isArray(listing.reviews) ? listing.reviews.length : 0;

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}>
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
          <Rating precision={0.5} readOnly defaultValue={3.0} />
          <Typography variant="body2" color="text.secondary">
            ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
