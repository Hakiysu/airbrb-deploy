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

  createListing() {
    // seems not right emmmmmm
    return {
      title: this.title,
      address: this.address,
      price: this.price,
      thumbnail: this.thumbnail,
      metadata: this.metadata,
    };
  }

  getListings() {
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
    const token= localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post('/listings/new', ListingData)
      .then(response => response.data)
      .then(console.log('Listing successfully pushed to backend:', ListingData))
      .catch(error => {
        console.error('Error pushing listing to backend:', error);
        throw error;
      });

  }

}

export default Listing;
