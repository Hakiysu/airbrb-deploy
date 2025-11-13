// frontend/src/api/BookingEditor.jsx
import Booking from "../classes/Booking.jsx";

// booking editor
export default function BookingEditor() {
  const formData = {
    listingId: '', // string

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = new Booking(
      formData.listingId,
    );
    console.log('Submitting booking:', newBooking);
    newBooking.postBooking(formData)
      .then((response) => {
        console.log('Booking submitted successfully:', response);
      })
      .catch((error) => {
        console.error('Error submitting booking:', error);
      });
  };

  return (
    <p>HERE IS BOOKING PAGE</p>
  );
}