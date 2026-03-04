import * as React from 'react';
import { 
  Box, Typography, Paper, Stack, Button, TextField, MenuItem, 
  Divider, Grid as Grid, InputAdornment 
} from '@mui/material';
import SplitscreenRoundedIcon from '@mui/icons-material/SplitscreenRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLocation, useNavigate } from 'react-router-dom';


// --- Types ---
type InvoiceStatus = 'Paid' | 'Pending';
type RoomType = 'Single' | 'Double' | 'Suite';

interface Invoice {
  id: string;
  guest: string;
  room: string;
  date: string;
  amount: number;
  status: string;
  staff?: string;
  idCard?: string;
  roomType?: RoomType;
  stayDays?: number;
  totalPeople?: number;
  paymentMethod?: string;
  extraService?: string;
  servicePrice?: number;
  roomPrice?: number;
}

export default function InvoiceForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.editData as Invoice | undefined;
  const isEditMode = Boolean(editData);
  

  const [formData, setFormData] = React.useState({
    invoiceNumber: '', 
    guestName: '',
    idCard: '',
    staffName: '',
    totalPeople: 1,
    roomNumber: '',
    roomType: 'Single' as RoomType,
    stayDays: 1,
    roomPrice: 0,
    extraService: '',
    servicePrice: 0,
    paymentMethod: 'Cash',
    isPaid: 'Pending' as InvoiceStatus
  });

  // Generate Invoice once
 React.useEffect(() => {
    if (isEditMode && editData) {
      // Edit mode mein agar status cash/card hai toh dropdown mein 'Paid' dikhayen
      const initialPaidStatus: InvoiceStatus = 
        editData.status.toLowerCase() === 'pending' ? 'Pending' : 'Paid';

      setFormData({
        invoiceNumber: editData.id,
        guestName: editData.guest,
        idCard: editData.idCard || '',
        staffName: editData.staff || '',
        totalPeople: editData.totalPeople || 1,
        roomNumber: editData.room,
        roomType: (editData.roomType as RoomType) || 'Single',
        stayDays: editData.stayDays || 1,
        roomPrice: editData.roomPrice || 0,
        extraService: editData.extraService || '',
        servicePrice: editData.servicePrice || 0,
        paymentMethod: editData.paymentMethod || 'Cash',
        isPaid: initialPaidStatus
      });
    } else {
      setFormData(prev => ({
        ...prev,
        invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`
      }));
    }
  }, [isEditMode, editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalAmount = (Number(formData.roomPrice) * Number(formData.stayDays)) + Number(formData.servicePrice);

// 🚀 Logic to determine status for Storage
  const getFinalStatus = (): string => {
    return formData.isPaid === 'Paid' 
      ? formData.paymentMethod.toLowerCase() 
      : 'pending';
  };
const handleFinalize = () => {
    if (!formData.guestName || !formData.roomNumber) {
      alert("Please fill required fields!");
      return;
    }

    const newInvoice: Invoice = {
      id: formData.invoiceNumber,
      guest: formData.guestName,
      room: formData.roomNumber,
      date: new Date().toLocaleDateString(),
      amount: totalAmount,
      status: getFinalStatus(), // No 'any' here
      staff: formData.staffName,
      idCard: formData.idCard,
      roomType: formData.roomType,
      stayDays: formData.stayDays,
      totalPeople: formData.totalPeople,
      paymentMethod: formData.paymentMethod,
      extraService: formData.extraService,
      servicePrice: Number(formData.servicePrice),
      roomPrice: Number(formData.roomPrice)
    };

    const existingInvoices: Invoice[] = JSON.parse(localStorage.getItem('hotel_invoices') || '[]');
    localStorage.setItem('hotel_invoices', JSON.stringify([newInvoice, ...existingInvoices]));
    navigate('/dashboard/billing/list');
  };

   const handleUpdate = () => {
    const savedData = localStorage.getItem('hotel_invoices');
    if (!savedData) return;
    const existingInvoices: Invoice[] = JSON.parse(savedData);

    const updatedInvoices = existingInvoices.map((inv): Invoice => 
      inv.id === formData.invoiceNumber 
        ? { 
            ...inv, 
            guest: formData.guestName, 
            room: formData.roomNumber, 
            amount: totalAmount, 
            status: getFinalStatus(), // No 'any' here
            paymentMethod: formData.paymentMethod,
            staff: formData.staffName,
            idCard: formData.idCard,
            roomType: formData.roomType,
            stayDays: formData.stayDays,
            totalPeople: formData.totalPeople,
            roomPrice: Number(formData.roomPrice),
            servicePrice: Number(formData.servicePrice),
            extraService: formData.extraService
          } 
        : inv
    );

    localStorage.setItem('hotel_invoices', JSON.stringify(updatedInvoices));
    navigate('/dashboard/billing/list');
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
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
            {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
          </Typography>
          <Typography variant="body2" color="text.secondary">Billing / {isEditMode ? 'Update' : 'New Entry'}</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<SplitscreenRoundedIcon />} sx={{ color: '#fff', borderColor: '#444' }} onClick={() => navigate('/dashboard/billing/list')}>Invoice List</Button>
          {!isEditMode ? (
            <Button variant="contained" onClick={handleFinalize} endIcon={<ArrowForwardRoundedIcon />} sx={{ bgcolor: '#b48c50', '&:hover': { bgcolor: '#8e6f3e' }, px: 4 }}>
              Process
            </Button>
          ) : (
            <>
              <Button variant="contained" color="error" startIcon={<CloseRoundedIcon />} onClick={() => navigate('/dashboard/billing/list')}>Cancel</Button>
              <Button variant="contained" onClick={handleUpdate} startIcon={<SaveRoundedIcon />} sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' }, px: 4 }}>
                Update
              </Button>
            </>
          )}
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
                <TextField {...inputStyle} fullWidth label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} placeholder="John Doe" />
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth label="ID Card / Passport" name="idCard"  onChange={handleChange} value={formData.idCard} placeholder="CNIC or Passport No" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField {...inputStyle} fullWidth label="Staff Name (Managed By)" name="staffName" onChange={handleChange} value={formData.staffName} placeholder="Receptionist Name" />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField {...inputStyle} fullWidth label="Room Number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
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
                 {...inputStyle} fullWidth type="number" label="Price per Night" name="roomPrice" value={formData.roomPrice} onChange={handleChange}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> }}}
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
                <TextField {...inputStyle} fullWidth multiline rows={1} label="Service Description" name="extraService" value={formData.extraService} onChange={handleChange} placeholder="Describe services..." />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField {...inputStyle}
                  fullWidth type="number" label="Service Fee" name="servicePrice" value={formData.servicePrice} onChange={handleChange}
                  slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
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