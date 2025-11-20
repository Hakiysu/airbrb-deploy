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