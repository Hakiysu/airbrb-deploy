import axios from "axios";

class Listing {
  constructor(title, address, price, thumbnail, propertyType, numBathrooms, bedrooms, amenities) {
    this.title = title;
    this.address = address;
    this.price= price;
    this.thumbnail = thumbnail || 'default-image.jpg';
    this.metadata = {
      propertyType: propertyType,
      numBathrooms: numBathrooms,
      bedrooms: bedrooms,
      amenities: amenities,
    };
  }

  getAllListings() {
    return axios.get('/api/listings')
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching listings:', error);
        throw error;
      });
  }

  getListingById(listingId) {
    return axios.get(`/api/listings/${listingId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching listing by ID:', error);
        throw error;
      });

  }

  postListing(ListingData) {
    //check if token exists in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      console.log ('No token found!');
    }
    // post to backend, with token in headers
    return axios.post('/listings/new', ListingData)
      .then(response => response.data)
      .then(console.log('Listing posted successfully:', ListingData))
      .catch(error => {
        console.error('Error posting listing:', error);
        throw error;
      });
  }

  // data reformatter
  formatListingData(rawData) {
    // all rawData are string, format them
    return {
      title: rawData.title,
      address: {
        description: rawData.address,
      },
      price: parseFloat(rawData.price),
      thumbnail: rawData.thumbnail,
      metadata: {
        propertyType: rawData.metadata.propertyType,
        numBathrooms: parseInt(rawData.metadata.numBathrooms),
        bedrooms: parseInt(rawData.metadata.bedrooms),
        amenities: rawData.metadata.amenities.split(',').map(item => item.trim()),
      },
    };
  }

  updateListing(listingId, updatedData) {
    return axios.put(`/listings/${listingId}`, updatedData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating listing:', error);
        throw error;
      });
  }

  deleteListing(listingId) {
    return axios.delete(`/listings/${listingId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error deleting listing:', error);
        throw error;
      });
  }

  publishListing(listingId) {
    return axios.put(`/listings/publish/${listingId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error publishing listing:', error);
        throw error;
      });
  }

  unpublishListing(listingId) {
    return axios.put(`/listings/unpublish/${listingId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error unpublishing listing:', error);
        throw error;
      });
  }

  reviewListing(listingId, bookingId,reviewData) {
    return axios.put(`/listings/${listingId}/review/${bookingId}`, reviewData)
      .then(response => response.data)
      .catch(error => {
        console.error('Error reviewing listing:', error);
        throw error;
      });
  }
}

export default Listing;
