import axios from "axios";
class Booking {
  constructor(bookingId, owner, dateRange, totalPrice, listingId, status) {
    this.bookingId = bookingId;
    this.owner = owner;
    this.dateRange = dateRange;
    this.totalPrice = totalPrice;
    this.listingId = listingId;
    this.status = status;
  }

  getBookingInfo() {
    return `Booking ID: ${this.bookingId}, Owner: ${this.owner}, Date Range: ${this.dateRange.start} to ${this.dateRange.end}, Total Price: $${this.totalPrice}, Listing ID: ${this.listingId}, Status: ${this.status}`;
  }

  getAllBookings() {
    axios.get('/bookings')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }

  postBooking(bookingData) {
    return axios.post(`/bookings/new/${this.listingId}`, bookingData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error creating booking:', error);
        throw error;
      });
  }

  acceptBooking() {
    return axios.put(`/bookings/accept/${this.bookingId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error accepting booking:', error);
        throw error;
      });
  }

  rejectBooking() {
    return axios.put(`/bookings/reject/${this.bookingId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error rejecting booking:', error);
        throw error;
      });
  }

  deleteBooking() {
    return axios.delete(`/bookings/${this.bookingId}`)
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