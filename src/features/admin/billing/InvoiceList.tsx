import * as React from 'react';
import { 
  Box, Typography, Paper, Stack, Button, TextField, 
  InputAdornment, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, IconButton, Drawer, Divider,
  Menu, MenuItem, ListItemIcon, ListItemText, type SxProps, type Theme 
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useNavigate } from 'react-router-dom';

// --- Styles ---
const headerStyle: SxProps<Theme> = {
  color: '#b48c50',
  fontWeight: '600',
  borderBottom: '1px solid #333',
  whiteSpace: 'nowrap',
  padding: '16px',
  fontSize: '0.85rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const cellStyle: SxProps<Theme> = {
  color: '#fff',
  whiteSpace: 'nowrap',
  padding: '16px',
  borderBottom: '1px solid #222',
  fontSize: '0.9rem'
};

// --- Interfaces ---
interface Invoice {
  id: string;
  guest: string;
  room: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending';
  staff?: string;
  idCard?: string;
  roomType?: string;
  stayDays?: number;
  totalPeople?: number;
}

interface DetailRowProps {
  label: string;
  value: string | number;
  sx?: SxProps<Theme>; // Proper TS Type instead of 'any'
}

// --- Helper Component ---
const DetailRow = ({ label, value, sx }: DetailRowProps) => (
  <Box sx={sx}>
    <Typography 
      variant="caption" 
      sx={{ 
        color: 'text.secondary', 
        display: 'block', 
        mb: 0.2, 
        textTransform: 'uppercase', 
        fontSize: '0.65rem', 
        letterSpacing: '0.5px' 
      }}
    >
      {label}
    </Typography>
    <Typography 
      variant="body1" 
      sx={{ fontWeight: '500', color: '#fff', fontSize: '0.95rem' }}
    >
      {value}
    </Typography>
  </Box>
);

export default function InvoiceList() {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [selectedInvoice, setSelectedInvoice] = React.useState<Invoice | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuInvoice, setMenuInvoice] = React.useState<Invoice | null>(null);
  const openMenu = Boolean(anchorEl);

  React.useEffect(() => {
    const savedData = localStorage.getItem('hotel_invoices');
    if (savedData) {
      setInvoices(JSON.parse(savedData));
    }
  }, []);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, invoice: Invoice) => {
    setAnchorEl(event.currentTarget);
    setMenuInvoice(invoice);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuInvoice(null);
  };

  const handleOpenDrawer = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDrawerOpen(true);
  };

  const handleDelete = () => {
    if (menuInvoice) {
      const updated = invoices.filter(inv => inv.id !== menuInvoice.id);
      setInvoices(updated);
      localStorage.setItem('hotel_invoices', JSON.stringify(updated));
      handleCloseMenu();
    }
  };

 const handlePrint = (invoice: Invoice) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.title = `Invoice - ${invoice.id}`;
      printWindow.document.body.innerHTML = `
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; padding: 40px; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #b48c50; padding-bottom: 20px; margin-bottom: 30px; }
              .hotel-name { color: #b48c50; font-size: 28px; font-weight: bold; margin: 0; letter-spacing: 2px; }
              .invoice-title { font-size: 18px; color: #666; text-transform: uppercase; margin-top: 5px; }
              .info-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
              .info-box h3 { color: #b48c50; font-size: 14px; text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid #eee; }
              .info-box p { margin: 5px 0; font-size: 14px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th { background-color: #f9f9f9; color: #b48c50; text-align: left; padding: 12px; border-bottom: 2px solid #eee; }
              td { padding: 12px; border-bottom: 1px solid #eee; font-size: 14px; }
              .total-row { font-weight: bold; font-size: 18px; color: #b48c50; }
              .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 class="hotel-name">LUXURY STAY</h1>
              <div class="invoice-title">Official Guest Invoice</div>
            </div>

            <div class="info-section">
              <div class="info-box">
                <h3>Guest Information</h3>
                <p><strong>Name:</strong> ${invoice.guest}</p>
                <p><strong>ID/Passport:</strong> ${invoice.idCard || 'N/A'}</p>
                <p><strong>Room No:</strong> ${invoice.room} (${invoice.roomType || 'Standard'})</p>
              </div>
              <div class="info-box" style="text-align: right;">
                <h3>Invoice Details</h3>
                <p><strong>Invoice ID:</strong> ${invoice.id}</p>
                <p><strong>Date:</strong> ${invoice.date}</p>
                <p><strong>Status:</strong> ${invoice.status}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: center;">Stay Duration</th>
                  <th style="text-align: center;">Guests</th>
                  <th style="text-align: right;">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Accommodation Services - Room ${invoice.room}</td>
                  <td style="text-align: center;">${invoice.stayDays || 0} Night(s)</td>
                  <td style="text-align: center;">${invoice.totalPeople || 0} Person(s)</td>
                  <td style="text-align: right;">$${invoice.amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="3" style="text-align: right; padding-top: 30px;">Subtotal:</td>
                  <td style="text-align: right; padding-top: 30px;">$${invoice.amount.toFixed(2)}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3" style="text-align: right;">Grand Total (USD):</td>
                  <td style="text-align: right;">$${invoice.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div class="footer">
              <p>Thank you for choosing Luxury Stay. We hope you had a pleasant stay.</p>
              <p>Managed By: ${invoice.staff || 'System Administrator'}</p>
            </div>
          </body>
        </html>
      `;
      printWindow.document.close();
      // Thoda wait taake images/styles load ho jayein (optional)
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const filteredInvoices = invoices.filter((inv) => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', p: 3 }}>
      
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>Invoices</Typography>
          <Typography variant="body2" color="text.secondary">Billing Management / History</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate('/dashboard/billing/create')}
          sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#eee' }, px: 3, borderRadius: '8px', fontWeight: 'bold', textTransform: 'none' }}
        >
          Create New Invoice
        </Button>
      </Stack>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField 
          placeholder="Search by Invoice ID or Guest..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: '400px', bgcolor: '#1a1a1a', borderRadius: '8px',
            "& .MuiOutlinedInput-root": { 
                "& fieldset": { borderColor: "#333" },
                "&:hover fieldset": { borderColor: "#444" }
            },
            "& input": { color: '#fff' }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }
          }}
        />
      </Box>

      {/* Table Section */}
      <TableContainer 
        component={Paper} 
        variant="outlined" 
        sx={{ 
          bgcolor: '#121212', 
          borderColor: '#333', 
          borderRadius: '12px',
          overflowX: 'auto',
          "&::-webkit-scrollbar": { height: '8px' },
          "&::-webkit-scrollbar-thumb": { bgcolor: '#333', borderRadius: '10px' }
        }}
      >
        <Table sx={{ minWidth: 1300 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1a1a1a' }}>
              <TableCell sx={headerStyle}>Invoice ID</TableCell>
              <TableCell sx={headerStyle}>Guest Name</TableCell>
              <TableCell sx={headerStyle}>ID Card/Passport</TableCell>
              <TableCell sx={headerStyle}>Staff (Managed By)</TableCell>
              <TableCell sx={headerStyle}>Room No</TableCell>
              <TableCell sx={headerStyle}>Room Type</TableCell>
              <TableCell sx={headerStyle} align="center">Total People</TableCell>
              <TableCell sx={headerStyle} align="center">Days of Stay</TableCell>
              <TableCell sx={headerStyle}>Date</TableCell>
              <TableCell sx={headerStyle}>Amount</TableCell>
              <TableCell sx={headerStyle}>Status</TableCell>
              <TableCell sx={headerStyle} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((row) => (
              <TableRow 
                key={row.id} 
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: 'rgba(180, 140, 80, 0.03)' } 
                }}
              >
                <TableCell sx={cellStyle}>{row.id}</TableCell>
                <TableCell sx={cellStyle}>{row.guest}</TableCell>
                <TableCell sx={{ ...cellStyle, color: '#ccc' }}>{row.idCard || '---'}</TableCell>
                <TableCell sx={{ ...cellStyle, color: '#ccc' }}>{row.staff || '---'}</TableCell>
                <TableCell sx={{ ...cellStyle, color: '#b48c50', fontWeight: 'bold' }}>{row.room}</TableCell>
                <TableCell sx={{ ...cellStyle, color: '#ccc' }}>{row.roomType || '---'}</TableCell>
                <TableCell sx={cellStyle} align="center">{row.totalPeople || 0}</TableCell>
                <TableCell sx={cellStyle} align="center">{row.stayDays || 0}</TableCell>
                <TableCell sx={cellStyle}>{row.date}</TableCell>
                <TableCell sx={{ ...cellStyle, fontWeight: 'bold' }}>${row.amount.toFixed(2)}</TableCell>
                <TableCell sx={cellStyle}>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.03)', 
                      color: row.status === 'Paid' ? '#4caf50' : '#ff9800', 
                      border: '1px solid #333',
                      fontSize: '0.7rem',
                      height: '24px'
                    }} 
                  />
                </TableCell>
                <TableCell align="right" sx={cellStyle}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" sx={{ color: '#b48c50', bgcolor: 'rgba(180,140,80,0.1)' }} onClick={() => handleOpenDrawer(row)}>
                      <VisibilityRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#ccc', bgcolor: 'rgba(255,255,255,0.05)' }} onClick={() => handlePrint(row)}>
                      <PrintRoundedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#fff' }} onClick={(e) => handleOpenMenu(e, row)}>
                      <MoreVertRoundedIcon fontSize="inherit" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}
        PaperProps={{ sx: { bgcolor: '#1a1a1a', color: '#fff', border: '1px solid #333' } }}>
        <MenuItem onClick={() => { handleCloseMenu(); navigate('/dashboard/billing/create', { state: { editData: menuInvoice } }); }}>
          <ListItemIcon><EditRoundedIcon fontSize="small" sx={{ color: '#b48c50' }} /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: '#ff5252' }}>
          <ListItemIcon><DeleteOutlineRoundedIcon fontSize="small" sx={{ color: '#ff5252' }} /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* --- Premium Detail Drawer --- */}
      <Drawer 
        anchor="right" 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{ 
          sx: { 
            width: { xs: '100%', sm: 450 }, 
            bgcolor: '#121212', 
            color: '#fff', 
            p: 0,
            borderLeft: '1px solid #333',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
          } 
        }}
      >
        {selectedInvoice && (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #222', bgcolor: '#1a1a1a' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#b48c50', letterSpacing: '1px' }}>INVOICE DETAILS</Typography>
                  <Typography variant="caption" color="text.secondary">Review billing and guest information</Typography>
                </Box>
                <IconButton onClick={() => setIsDrawerOpen(false)} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' }}><CloseRoundedIcon /></IconButton>
              </Stack>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
              <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                <Paper sx={{ flex: 1, p: 2, bgcolor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}>
                  <Typography variant="caption" color="text.secondary" display="block">Total Amount</Typography>
                  <Typography variant="h5" sx={{ color: '#b48c50', fontWeight: 'bold' }}>${selectedInvoice.amount.toFixed(2)}</Typography>
                </Paper>
                <Paper sx={{ flex: 1, p: 2, bgcolor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px' }}>
                  <Typography variant="caption" color="text.secondary" display="block">Payment Status</Typography>
                  <Chip label={selectedInvoice.status} sx={{ mt: 0.5, bgcolor: 'transparent', color: selectedInvoice.status === 'Paid' ? '#4caf50' : '#ff9800', border: '1px solid currentColor', fontWeight: 'bold' }} />
                </Paper>
              </Stack>

              <Typography variant="subtitle2" sx={{ color: '#b48c50', mb: 2, fontWeight: 'bold' }}>GUEST & STAY INFO</Typography>
              <Stack spacing={2.5}>
                <DetailRow label="Invoice ID" value={selectedInvoice.id} />
                <DetailRow label="Guest Full Name" value={selectedInvoice.guest} />
                <DetailRow label="ID Card / Passport" value={selectedInvoice.idCard || 'N/A'} />
                <Divider sx={{ borderColor: '#222', my: 1 }} />
                <Stack direction="row" spacing={2}>
                  <DetailRow label="Room No" value={selectedInvoice.room} sx={{ flex: 1 }} />
                  <DetailRow label="Room Type" value={selectedInvoice.roomType || 'N/A'} sx={{ flex: 1 }} />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <DetailRow label="Stay Duration" value={`${selectedInvoice.stayDays || 0} Days`} sx={{ flex: 1 }} />
                  <DetailRow label="Total People" value={selectedInvoice.totalPeople || 0} sx={{ flex: 1 }} />
                </Stack>
                <Divider sx={{ borderColor: '#222', my: 1 }} />
                <DetailRow label="Managed By (Staff)" value={selectedInvoice.staff || 'System'} />
                <DetailRow label="Billing Date" value={selectedInvoice.date} />
              </Stack>
            </Box>

            <Box sx={{ p: 3, bgcolor: '#1a1a1a', borderTop: '1px solid #333' }}>
              <Button fullWidth variant="contained" startIcon={<PrintRoundedIcon />} onClick={() => handlePrint(selectedInvoice)} sx={{ bgcolor: '#b48c50', color: '#fff', py: 1.5, borderRadius: '8px', fontWeight: 'bold', '&:hover': { bgcolor: '#8e6f3e' } }}>Print Official Invoice</Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}