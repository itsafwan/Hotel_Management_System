import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import BedIcon from '@mui/icons-material/BedRounded';

export default function HighlightedCard() {
  return (
    <Card variant="outlined" sx={{ height: '100%', width: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <BedIcon sx={{ color: 'primary.main' }} />
          <Typography component="h2" variant="subtitle2" sx={{ fontWeight: '600' }}>
            Live Room Status
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">Available Rooms</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'success.main' }}>12</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">Dirty / Cleaning</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'warning.main' }}>05</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">Out of Service</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'error.main' }}>02</Typography>
          </Box>
        </Stack>

        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.disabled', fontStyle: 'italic' }}>
          * Last updated 2 mins ago
        </Typography>
        
      </CardContent>
    </Card>
  );
}
