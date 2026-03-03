import * as React from 'react';
import { 
  Box, Typography, Paper, Stack, Button, TextField, MenuItem, 
  Divider, Grid as Grid, InputAdornment 
} from '@mui/material';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';

export default function InvoiceForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    invoiceNumber: '', 
    guestName: '',
    idCard: '',
    staffName: '',
    totalPeople: 1,
    roomNumber: '',
    roomType: 'Single',
    stayDays: 1,
    roomPrice: 0,
    extraService: '',
    servicePrice: 0,
    paymentMethod: 'Cash',
    isPaid: 'Pending'
  });

  // Generate Invoice once
  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalAmount = (Number(formData.roomPrice) * Number(formData.stayDays)) + Number(formData.servicePrice);

  const handleFinalize = () => {
    if (!formData.guestName || !formData.roomNumber || !formData.idCard) {
      alert("Please fill Guest Name, ID Card and Room Number!");
      return;
    }
    navigate('/dashboard/billing');
  };
  
  const inputStyle = {
    InputLabelProps: { 
      shrink: true, 
      style: { color: '#b48c50', marginTop: '-8px' } 
    },
    sx: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#333" },
        "&:hover fieldset": { borderColor: "#b48c50" },
      },
      "& .MuiInputBase-input": { color: "#fff" }
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', p: 3 }}>
      
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>Create Invoice</Typography>
          <Typography variant="body2" color="text.secondary">Billing / New Entry</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<PrintRoundedIcon />} sx={{ color: '#fff', borderColor: '#444' }}>Draft</Button>
          <Button 
            variant="contained" 
            onClick={handleFinalize}
            endIcon={<ArrowForwardRoundedIcon />} 
            sx={{ bgcolor: '#b48c50', '&:hover': { bgcolor: '#8e6f3e' }, px: 4 }}
          >
            Process & Save
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* 📋 LEFT SIDE: Inputs */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper variant="outlined" sx={{ p: 4, borderRadius: '12px', bgcolor: '#121212', borderColor: '#333' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#b48c50' }}>Guest & Room Information</Typography>
            
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth label="Invoice Number" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth label="Guest Name" name="guestName" onChange={handleChange} placeholder="John Doe" />
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth label="ID Card / Passport" name="idCard" onChange={handleChange} placeholder="CNIC or Passport No" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth label="Staff Name (Managed By)" name="staffName" onChange={handleChange} placeholder="Receptionist Name" />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField {...inputStyle} fullWidth label="Room Number" name="roomNumber" onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField {...inputStyle} select fullWidth label="Room Type" name="roomType" value={formData.roomType} onChange={handleChange}>
                  <MenuItem value="Single">Single Room</MenuItem>
                  <MenuItem value="Double">Double Room</MenuItem>
                  <MenuItem value="Suite">Suite</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField {...inputStyle} fullWidth type="number" label="Total People" name="totalPeople" value={formData.totalPeople} onChange={handleChange} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth type="number" label="Days of Stay" name="stayDays" value={formData.stayDays} onChange={handleChange} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField 
                 {...inputStyle} fullWidth type="number" label="Price per Night" name="roomPrice" onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} select fullWidth label="Payment Method" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Card">Card</MenuItem>
                  <MenuItem value="Online">Online Transfer</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} select fullWidth label="Status" name="isPaid" value={formData.isPaid} onChange={handleChange}>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1, borderColor: '#333' }} />
                <Typography variant="subtitle1" sx={{ mb: 2, mt: 1, fontWeight: 'bold', color: '#b48c50' }}>Extra Services</Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField {...inputStyle} fullWidth multiline rows={1} label="Service Description" name="extraService" onChange={handleChange} placeholder="Describe services..." />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField {...inputStyle}
                  fullWidth type="number" label="Service Fee" name="servicePrice" onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* 🧾 RIGHT SIDE: Live Summary (Updated with Room Type & Total People) */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: '12px', position: 'sticky', top: 24, bgcolor: '#1a1a1a', borderColor: '#b48c50' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: '#b48c50' }}>Live Summary</Typography>
            
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">INVOICE</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formData.invoiceNumber || '---'}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">GUEST NAME</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{formData.guestName || '---'}</Typography>
                </Grid>
                
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">ROOM NO.</Typography>
                  <Typography variant="body2">{formData.roomNumber || '---'}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">ROOM TYPE</Typography>
                  <Typography variant="body2" sx={{ color: '#b48c50' }}>{formData.roomType}</Typography>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">STAY</Typography>
                  <Typography variant="body2">{formData.stayDays} Day(s)</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">ID CARD</Typography>
                  <Typography variant="body2">{formData.idCard || '---'}</Typography>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">STAFF</Typography>
                  <Typography variant="body2">{formData.staffName || '---'}</Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">METHOD</Typography>
                  <Typography variant="body2">{formData.paymentMethod}</Typography>
                </Grid>

                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">STATUS</Typography>
                  <Typography variant="body2" sx={{ color: formData.isPaid === 'Paid' ? '#4caf50' : '#ff9800', fontWeight: 'bold' }}>
                    {formData.isPaid}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="caption" color="text.secondary">TOTAL PEOPLE</Typography>
                  <Typography variant="body2">{formData.totalPeople}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: '#333' }} />

              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>EXTRA SERVICES</Typography>
                <Box sx={{ p: 1.5, bgcolor: '#252525', borderRadius: '8px', minHeight: '60px', border: '1px dashed #444' }}>
                  <Typography variant="body2">{formData.extraService || 'No services added'}</Typography>
                </Box>
              </Box>

              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Room Charges:</Typography>
                  <Typography variant="body2">${(Number(formData.roomPrice) * Number(formData.stayDays)).toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Service Fee:</Typography>
                  <Typography variant="body2">${Number(formData.servicePrice).toFixed(2)}</Typography>
                </Box>
              </Stack>

              <Divider sx={{ borderColor: '#b48c50', borderBottomWidth: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Bill</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#b48c50' }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}