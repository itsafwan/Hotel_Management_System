import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';

export default function PageViewsBarChart() {
  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Occupancy by Room Type
        </Typography>
        <Box sx={{ width: '100%', height: 250 }}>
          <BarChart
            series={[
              { data: [15, 20, 10], label: 'Booked', stack: 'total', color: '#0288d1' },
              { data: [5, 2, 8], label: 'Available', stack: 'total', color: '#01579b' },
            ]}
            xAxis={[{ data: ['Standard', 'Deluxe', 'Suite'], scaleType: 'band' }]}
            height={250}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            // Ye hai Legend hide karne ka sab se solid tarika for TypeScript:
            slots={{
                legend: () => null,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}