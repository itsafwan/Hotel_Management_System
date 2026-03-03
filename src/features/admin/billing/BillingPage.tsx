import * as React from 'react';
import { 
  Box, Typography, Paper, Stack, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip, 
  Avatar
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Grid from '@mui/material/Grid';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import { useNavigate } from 'react-router-dom';

// Pending Bills Data
const pendingBills = [
  { id: 1, guest: 'Riley Carter', room: '302', services: 'Spa, Laundry', amount: '$450.00', method: 'Credit Card', status: 'Pending' },
  { id: 2, guest: 'Jordan Smith', room: '105', services: 'Mini Bar', amount: '$1,200.00', method: 'Cash', status: 'Paid' },
  { id: 3, guest: 'Alex Johnson', room: '201', services: 'Airport Pick', amount: '$850.00', method: 'Pending', status: 'Pending' },
];

// 🟢 NEW: Activity Log Data (Staff & Services)
const activityLog = [
  { id: 1, staff: 'Sarah (Front Desk)', action: 'Generated Invoice', target: 'Room 302', time: '5 mins ago', icon: <ReceiptRoundedIcon fontSize="small" /> },
  { id: 2, staff: 'John (Housekeeping)', action: 'Added Laundry Service', target: 'Room 105', time: '12 mins ago', icon: <RoomServiceRoundedIcon fontSize="small" /> },
  { id: 3, staff: 'Mike (Porter)', action: 'Airport Drop-off Added', target: 'Room 201', time: '45 mins ago', icon: <RoomServiceRoundedIcon fontSize="small" /> },
];

export default function BillingPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Billing Dashboard</Typography>
       <Button 
          variant="contained" 
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate('/dashboard/billing/create')} 
          sx={{ 
            borderRadius: '8px', 
            textTransform: 'none', 
            bgcolor: '#b48c50', 
            '&:hover': { bgcolor: '#8e6f3e' } 
          }}
        >
          New Invoice
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* Left Side: Stats & Table */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px' }}>
                  <Typography variant="subtitle2" color="text.secondary">Total Revenue (MTD)</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>$12,450.00</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderLeft: '4px solid #ed6c02' }}>
                  <Typography variant="subtitle2" color="text.secondary">Pending Payments</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>$4,500.00</Typography>
                </Paper>
              </Grid>
            </Grid>

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6">Pending Check-outs</Typography>
              </Box>
              <Table>
                <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Guest</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Services</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingBills.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.guest}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell>{row.services}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>{row.amount}</TableCell>
                      <TableCell>
                        <Chip label={row.status} color={row.status === 'Paid' ? 'success' : 'warning'} size="small" variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>

        {/* Right Side: Activity & Overview */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Daily Overview */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Daily Overview</Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Invoices Today:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>12</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Paid Invoices:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'success.main' }}>10</Typography>
                </Box>
              </Stack>
            </Paper>

            {/* 🟢 Activity Log Box */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Recent Activity</Typography>
              <Stack spacing={3}>
                {activityLog.map((log) => (
                  <Stack key={log.id} direction="row" spacing={2} alignItems="flex-start">
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(180, 140, 80, 0.2)', color: '#b48c50' }}>
                      {log.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{log.staff}</Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {log.action} — {log.target}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '10px' }}>
                        {log.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}