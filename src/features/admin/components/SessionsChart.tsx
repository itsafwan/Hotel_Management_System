import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

export default function SessionsChart() {
  const revenueData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Weekly Revenue
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
            <Typography variant="h4" component="p">
              $13,277
            </Typography>
            <Chip size="small" color="success" label="+12% vs last week" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2 }}>
            Total earnings from bookings and services
          </Typography>
        </Stack>
        
        <Box sx={{ width: '100%', height: 200 }}>
          <LineChart
            series={[
              { 
                data: revenueData, 
                label: 'Revenue', 
                area: true, 
                showMark: false,
                color: '#0288d1' 
              }
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            height={200}
            margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
            grid={{ vertical: true, horizontal: true }}
            // Legend error fix: Pointer events none aur opacity 0 se legend "ghayab" ho jayega
            slotProps={{
              legend: {
                sx: {
                  display: 'none',
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
