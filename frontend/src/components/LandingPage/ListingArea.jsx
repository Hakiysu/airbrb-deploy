// frontend/src/components/LandingPage/ListingArea.jsx
import ListingCard from "./ListingCard.jsx";
import { Grid } from "@mui/material";

export default function ListingArea({ listings }) {
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {listings.map((listing) => (
        <Grid key={listing.id} sx={{ width: 300 }}>
          <ListingCard listing={listing} />
        </Grid>
      ))}
    </Grid>
  );
}