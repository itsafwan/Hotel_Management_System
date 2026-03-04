import * as React from 'react';
import { 
  Box, Typography, Paper, Stack, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Chip 
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// --- Interface ---
interface Invoice {
  id: string;
  guest: string;
  room: string;
  date: string;
  amount: number;
  status: string; // Dynamic status handling
  staff?: string;
}

export default function BillingPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    const savedData = localStorage.getItem('hotel_invoices');
    if (savedData) {
      setInvoices(JSON.parse(savedData));
    }
  }, []);

  // --- 🔥 Smart Logic Applied Here ---
  
  // List of all statuses that mean money is received
  const paidMethods = ['paid', 'cash', 'card', 'online'];

  // 1. Total Revenue (Sab received paisay)
  const totalRevenue = invoices
    .filter(inv => paidMethods.includes(inv.status.toLowerCase())) 
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  // 2. Pending Amount
  const pendingAmount = invoices
    .filter(inv => inv.status.toLowerCase() === 'pending')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  // 3. Paid Amount (General status 'paid')
  const paidGeneralAmount = invoices
    .filter(inv => inv.status.toLowerCase() === 'paid')
    .reduce((sum, inv) => sum + Number(inv.amount), 0);

  // 4. Specific Payment Method Totals


  return (
    <Box sx={{ width: '100%', maxWidth: '1700px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Billing Dashboard</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate('/dashboard/billing/create')} 
          sx={{ bgcolor: '#b48c50', borderRadius: '8px', '&:hover': { bgcolor: '#8e6f3e' } }}
        >
          New Invoice
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* Left Side */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px' }}>
                  <Typography variant="subtitle2" color="text.secondary">Total Revenue</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                    ${totalRevenue.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderLeft: '4px solid #4caf50' }}>
                  <Typography variant="subtitle2" color="text.secondary">Paid (General)</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, color: '#4caf50' }}>
                    ${paidGeneralAmount.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderLeft: '4px solid #ed6c02' }}>
                  <Typography variant="subtitle2" color="text.secondary">Pending Total</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, color: '#ed6c02' }}>
                    ${pendingAmount.toLocaleString()}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Recent Invoices Table */}
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.02)' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Typography variant="h6">Recent Invoices</Typography>
              </Box>
              <Table>
                <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Guest</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.length > 0 ? invoices.slice(0, 6).map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.guest}</TableCell>
                      <TableCell>{row.room}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>${Number(row.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status.toUpperCase()} 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            color: row.status.toLowerCase() === 'pending' ? '#ff9800' : '#4caf50',
                            borderColor: 'currentColor'
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow><TableCell colSpan={4} align="center">No Data Found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Grid>

        {/* Right Side */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            

            {/* Quick Summary Section */}
            <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px', bgcolor: 'rgba(180, 140, 80, 0.05)' }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Quick Summary</Typography>
              <Stack spacing={1.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Total Invoices</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{invoices.length}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Paid Invoices</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    {invoices.filter(i => paidMethods.includes(i.status.toLowerCase())).length}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Pending Invoices</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                    {invoices.filter(i => i.status.toLowerCase() === 'pending').length}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}