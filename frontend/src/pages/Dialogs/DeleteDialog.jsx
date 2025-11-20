// frontend/src/pages/Dialogs/DeleteDialog.jsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

export default function DeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this listing? This action cannot be undo.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}