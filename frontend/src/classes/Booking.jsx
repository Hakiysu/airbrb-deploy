// frontend/src/classes/Booking.jsx
import axios from "axios";

class Booking {
  constructor(id, owner, dateRange, totalPrice, listingId, status) {
    this.id = id;
    this.owner = owner;
    this.dateRange = dateRange;
    this.totalPrice = totalPrice;
    this.listingId = listingId;
    this.status = status;
  }


  getAllBookings() {
    return axios.get('/bookings/')
      .then(response => {
        return response.data.bookings || [];
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
        throw error;
      });
  }

  postBooking(listingId,bookingData) {
    return axios.post(`/bookings/new/${listingId}`, bookingData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error creating booking:', error);
        throw error;
      });
  }

  acceptBooking(bookingId) {
    return axios.put(`/bookings/accept/${bookingId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error accepting booking:', error);
        throw error;
      });
  }

  declineBooking(bookingId) {
    return axios.put(`/bookings/decline/${bookingId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error declining booking:', error);
        throw error;
      });
  }

  deleteBooking(bookingId) {
    return axios.delete(`/bookings/${bookingId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
        throw error;
      });
  }
}

export default Booking;