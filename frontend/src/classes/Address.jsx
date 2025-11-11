class Address {
  constructor(street, city, state, zip, country) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
  }

  getFullAddress() {
    return `${this.street}, ${this.city}, ${this.state} ${this.zip}, ${this.country}`;
  }

}
export default Address;