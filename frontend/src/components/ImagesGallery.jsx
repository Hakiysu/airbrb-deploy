// frontend/src/components/ImagesGallery.jsx
import { Box, ImageList } from '@mui/material';

export default function ImagesGallery({ images = [] }) {
  if (!images.length) return null;
  return (
    <ImageList sx={{ width: '100%', height: 180, overflowX: 'auto', flexWrap: 'nowrap' }} cols={Math.min(images.length, 5)}>
      <Box sx={{ display: 'flex', gap: 2, p: 1 }}>
        {images.map((img, idx) => (
          <Box key={idx} sx={{ minWidth: 200, borderRadius: 2, overflow: 'hidden' }}>
            <img src={img} alt={`Property ${idx}`} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
          </Box>
        ))}
      </Box>
    </ImageList>
  );
}