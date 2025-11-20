// frontend/src/components/ImagesGallery.jsx
import { Box, ImageList } from '@mui/material';

export default function ImagesGallery({ images = [] }) {
  if (!images.length) return null;
  return (
    <ImageList variant="masonry" cols={2} gap={8} sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, py: 1 }}>
        {images.map((img, idx) => (
          <Box key={idx} sx={{ minWidth: 200, borderRadius: 2, overflow: 'hidden' }}>
            <img src={img} alt={`Property ${idx}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          </Box>
        ))}
      </Box>
    </ImageList>
  );
}