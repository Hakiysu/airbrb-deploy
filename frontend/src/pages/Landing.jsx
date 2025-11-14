import ListingArea from "../components/ListingArea.jsx";
import {Box, Typography} from "@mui/material";

export default function LandingPage() {

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Listings
      </Typography>
      <Box mb={4} display="flex" gap={2}>
        <ListingArea />
      </Box>
    </Box>
  );

}