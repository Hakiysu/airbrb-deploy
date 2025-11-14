import ListingCard from "./ListingCard.jsx";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

export default function ListingArea() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    setListings([
      {
        id: 56513315,
        title: "Oceanside Villa",
        owner: "TestOwner1",
        address: {},
        thumbnail:"",// base64 is okay to see, but not good to write here(too long)
        price: 350,
        reviews: [{}],
      },
      {
        id: 56513316,
        title: "Mountain Cabin",
        owner: "TestOwner2",
        address: {},
        thumbnail:"",
        price: 200,
        reviews: [{}, {}],
      }
    ]);
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
