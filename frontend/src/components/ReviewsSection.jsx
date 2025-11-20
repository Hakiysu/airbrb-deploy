// frontend/src/components/ReviewsSection.jsx
import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Rating, Paper } from '@mui/material';
import Listing from '../classes/Listing.jsx';
import {useAlert} from "../api/useAlert.jsx";
import {useContext} from "react";
import { AuthContext } from "../api/AuthContext.jsx";
export default function ReviewsSection({ listingId, bookingId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ score: 0, comment: '' });
  const { showAlert } = useAlert();
  const { email } = useContext(AuthContext);

  useEffect(() => {
    fetchReviews().then();
  }, [listingId]);

  const fetchReviews = async () => {
    const listingInstance = new Listing();
    const data = await listingInstance.getListingById(listingId);
    if (data.reviews && data.reviews.length > 0) {
      setReviews(data.reviews);
    } else {
      setReviews([]);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview.comment || newReview.score <= 0) {
      showAlert('Please provide both a score and a comment for your review.', 'warning');
      return;
    }
    try {
      const listingInstance = new Listing();
      const reviewData={
        review: newReview
      }
      reviewData.review.date = new Date().toISOString();
      reviewData.review.reviewer = email;
      await listingInstance.reviewListing(listingId, bookingId, reviewData);// Submit the new review
      setNewReview({ score: 0, comment: '' });// Clear input fields
      await fetchReviews();
    } catch (err) {
      showAlert('Review failed: ' + err.response.data.error, 'error');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Reviews</Typography>
      {/* Existing Reviews */}
      <Box sx={{ mt: 2 }}>
        {reviews.length > 0 ? (
          reviews.map((r, idx) => (
            <Paper key={idx} sx={{ p: 2, mb: 1, borderRadius: 1, backgroundColor: '#f9f9f9' }}>
              <Rating name="read-only" value={r.score} readOnly size="small" />
              <Typography variant="body2">{r.comment}</Typography>
              <Typography variant="caption" color="textSecondary">- {r.reviewer} on {new Date(r.date).toLocaleDateString()}</Typography>
            </Paper>
          ))
        ) : (
          <Typography>No reviews yet.</Typography>
        )}
      </Box>

      {/* Add Review */}
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="subtitle1">Leave a Review</Typography>
        <Rating
          name="score"
          value={newReview.score}
          onChange={(_, value) => setNewReview({ ...newReview, score: value })}
        />
        <TextField
          label="Comment"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          multiline
          rows={3}
          variant="outlined"
        />
        <Button variant="contained" onClick={handleSubmitReview}>Submit Review</Button>
      </Box>
    </Paper>
  );
}