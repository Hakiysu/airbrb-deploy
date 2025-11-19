// frontend/src/pages/Dialogs/PublishDialog.jsx
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function PublishDialog({ open, listing, onClose, onConfirm }) {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    if (listing?.availability?.length) {
      setAvailability(listing.availability);
    } else {
      setAvailability([]);
    }
  }, [listing]);

  const handleDateChange = (idx, field, value) => {
    const newAvailability = [...availability];
    newAvailability[idx][field] = value;
    setAvailability(newAvailability);
  };

  const addRange = () => setAvailability([...availability, { start: '', end: '' }]);
  const removeRange = (idx) => setAvailability(availability.filter((_, i) => i !== idx));

  const handleConfirm = () => {
    onConfirm(availability);
  };
  if (!listing) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {listing.published ? "Take Listing Offline" : "Publish Listing"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1">Listing: {listing.title}</Typography>
        {listing.published ? (
          <Typography sx={{ mt: 2 }}>Are you sure you want to take this listing offline?</Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Current Availability:</Typography>
            {availability.length > 0 ? (
              availability.map((range, idx) => (
                <Box key={idx} sx={{ display: 'flex', gap: 1, my: 1, alignItems: 'center' }}>
                  <TextField
                    label="Start"
                    type="date"
                    value={range.start}
                    onChange={(e) => handleDateChange(idx, 'start', e.target.value)}
                    size="small"
                  />
                  <TextField
                    label="End"
                    type="date"
                    value={range.end}
                    onChange={(e) => handleDateChange(idx, 'end', e.target.value)}
                    size="small"
                  />
                  <Button color="error" size="small" onClick={() => removeRange(idx)}>Remove</Button>
                </Box>
              ))
            ) : (
              <Typography color="error">No availability set.</Typography>
            )}
            <Button variant="outlined" size="small" sx={{ mt: 1 }} onClick={addRange}>Add Availability Range</Button>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleConfirm}
          color={listing.published ? "warning" : "primary"}
          variant="contained"
        >
          {listing.published ? "Take Offline" : "Publish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}