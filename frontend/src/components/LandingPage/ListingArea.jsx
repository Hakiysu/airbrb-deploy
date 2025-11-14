import ListingCard from "./ListingCard.jsx";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Listing from "../../classes/Listing.jsx";

export default function ListingArea() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const listingInstance = new Listing();
    listingInstance.getAllListings()
      .then((data) => {
        setListings(data.listings || []); // 取 listings 数组
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
        setListings([]); // 避免 undefined
      });
  }, []);


  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {listings.map((listing) => (
        <Grid item key={listing.id} sx={{ width: 300 }}>
          <ListingCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
}
