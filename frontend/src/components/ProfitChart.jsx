// frontend/src/components/ProfitChart.jsx
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Booking from '../classes/Booking.jsx';
import Listing from '../classes/Listing.jsx';
import { calculatePrice } from '../api/utils.jsx';

export default function ProfitChartMUI() {
  const [xLabels, setXLabels] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const bookingObj = new Booking();
        const listingObj = new Listing();

        const allListings = await listingObj.getAllListings();
        const allBookings = await bookingObj.getAllBookings();

        const today = new Date();
        const last30Days = Array.from({ length: 31 }, (_, i) => {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          return d;
        }).reverse();

        const labels = [];
        const profits = [];

        last30Days.forEach((day) => {
          labels.push(day.toISOString().slice(5, 10));
          const dailyProfit = allBookings
            .filter(b => b.status === 'accepted')
            .reduce((sum, b) => {
              const start = new Date(b.dateRange.start);
              const end = new Date(b.dateRange.end);
              if (day >= start && day <= end) {
                const listing = allListings.find(l => Number(l.id) === Number(b.listingId));
                if (!listing) return sum;
                const dayPrice =
                  calculatePrice(listing, start, end) /
                  Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                return sum + dayPrice;
              }
              return sum;
            }, 0);
          profits.push(dailyProfit);
        });
        setXLabels(labels);
        setYData(profits);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData().then();
  }, []);

  return (
    <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Profit in Last 30 Days
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <LineChart
          series={[{ data: yData, label: 'Daily Profit ($)' }]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          yAxis={[{ width: 50 }]}
          margin={{ right: 24 }}
        />
      </Box>
    </Paper>
  );
}