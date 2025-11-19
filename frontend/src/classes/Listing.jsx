import axios from "axios";

class Listing {
  constructor({
    title,
    owner,
    address,
    price,
    thumbnail,
    metadata,
    availability,
    reviews,
    published,
    postedOn
  } = {}) {
    this.title = title || '';
    this.owner = owner || '';
    this.address = address || {};
    this.price = price || 0;
    this.thumbnail = thumbnail || 'default-image.jpg';
    this.metadata = metadata || {
      propertyType: '',
      bathrooms: 0,
      bedrooms: [],
      amenities: [],
      images: []
    };
    this.availability = availability || [];
    this.reviews = reviews || [];
    this.published = published || false;
    this.postedOn = postedOn || new Date().toISOString();
  }

  // data reformatter
  formatListingData(rawData) {
    return {
      title: rawData.title,
      address: rawData.address,  // JSON
      price: parseFloat(rawData.price),
      thumbnail: rawData.thumbnail,
      metadata: {
        propertyType: rawData.metadata.propertyType,
        bathrooms: parseInt(rawData.metadata.bathrooms) || 0,
        bedrooms: (rawData.metadata.bedrooms || []).map(b => ({
          name: b.name,
          beds: (b.beds || []).map(bb => ({
            type: bb.type,
            count: parseInt(bb.count) || 1
          }))
        })),
        amenities: (rawData.metadata.amenities || '')
          .split?.(',')
          .map(item => item.trim()) || [],
        images: rawData.metadata.images || [] // array of image base64 strings
      },
      availability: (rawData.availability || []).map(r => ({
        start: r.start,
        end: r.end
      }))
    };
  }

  getAllListings() {
    return axios.get('/listings')
      .then(res => res.data.listings || [])
      .catch(err => { console.error('Error fetching all listings:', err); throw err; });
  }

  getListingsWithMetadata() {
    return axios.get('/listings')
      .then(response => {
        const listings = response.data.listings || [];
        return Promise.all(
          listings.map(item =>
            axios.get(`/listings/${item.id}`)
              .then(metaRes => {
                const listing = metaRes.data.listing;
                if (!Array.isArray(listing.metadata.bedrooms)) {
                  listing.metadata.bedrooms = [];
                }
                listing.metadata.bedrooms = listing.metadata.bedrooms.map(bedroom => {
                  if (!Array.isArray(bedroom.beds)) bedroom.beds = [];
                  bedroom.beds = bedroom.beds.map(bed => ({
                    type: bed.type || '',
                    count: bed.count || 1
                  }));
                  return bedroom;
                });
                if (!Array.isArray(listing.metadata.amenities)) {
                  listing.metadata.amenities = [];
                }
                listing.availability = Array.isArray(listing.availability) ? listing.availability : [];
                listing.id = item.id;
                return listing;
              })
          )
        );
      })
      .catch(err => { console.error('Error fetching listings with metadata:', err); throw err; });
  }

  getListingById(listingId) {
    return axios.get(`/listings/${listingId}`)
      .then(res => res.data.listing)
      .catch(err => { console.error('Error fetching listing by ID:', err); throw err; });
  }

  postListing(listingData) {
    const formatted = this.formatListingData(listingData);
    console.log('Posting listing with data:', formatted,"token:", axios.defaults.headers.common['Authorization']);
    return axios.post('/listings/new', formatted)
      .then(res => res.data)
      .catch(err => { console.error('Error posting listing:', err); throw err; });
  }

  updateListing(listingId, listingData) {
    const formatted = this.formatListingData(listingData);
    console.log('Updating listing with data:', formatted);
    return axios.put(`/listings/${listingId}`, formatted)
      .then(res => res.data)
      .catch(err => { console.error('Error updating listing:', err); throw err; });
  }

  deleteListing(listingId) {
    return axios.delete(`/listings/${listingId}`)
      .then(res => res.data)
      .catch(err => { console.error('Error deleting listing:', err); throw err; });
  }

  publishListing(listingId, availability) {
    return axios.put(`/listings/publish/${listingId}`, availability )
      .then(res => res.data)
      .catch(err => {
        console.error('Error publishing listing:', err);
        throw err;
      });
  }

  unpublishListing(listingId) {
    return axios.put(`/listings/unpublish/${listingId}`)
      .then(res => res.data)
      .catch(err => { console.error('Error unpublishing listing:', err); throw err; });
  }

  reviewListing(listingId, bookingId, reviewData) {
    return axios.put(`/listings/${listingId}/review/${bookingId}`, reviewData)
      .then(res => res.data)
      .catch(err => { console.error('Error reviewing listing:', err); throw err; });
  }
}

export default Listing;