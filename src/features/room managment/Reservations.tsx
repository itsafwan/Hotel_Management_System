import * as React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TextField, 
  InputAdornment, Chip, Stack, IconButton, Menu, MenuItem 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

// Interface for Reservation Data
interface Reservation {
  id: string;
  guestName: string;
  idPassport: string;
  roomType: string;
  totalPeople: number;
  email: string;
  roomsBooked: number;
  stayDuration: number;
}

export default function Reservations() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // State for Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const [reservations] = React.useState<Reservation[]>([
    { 
      id: '1', guestName: 'Safwan', idPassport: 'pk 42102252', 
      roomType: 'Single', totalPeople: 3, email: 'safwan@gmail.com', 
      roomsBooked: 2, stayDuration: 3
    },
    { 
      id: '2', guestName: 'john', idPassport: 'usa 53415', 
      roomType: 'Double', totalPeople: 2, email: 'john@gmail.com', 
      roomsBooked: 1, stayDuration: 5
    },
    { 
      id: '3', guestName: 'ali', idPassport: 'india 321564', 
      roomType: 'Suite', totalPeople: 1, email: 'ali@gmail.com', 
      roomsBooked: 3, stayDuration: 2
    },
  ]);

  // Handle Menu Open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  // Handle Menu Close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleAction = (action: string) => {
    console.log(`${action} clicked for ID: ${selectedId}`);
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}>
        Reservations List
      </Typography>

      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search by name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: '350px',
            '& .MuiOutlinedInput-root': {
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: '10px',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <TableContainer component={Paper} sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.02)', 
        borderRadius: '15px',
        border: '1px solid rgba(255,255,255,0.05)',
        backgroundImage: 'none'
      }}>
        <Table sx={{ minWidth: 1100 }}>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
            <TableRow>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>NAME</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ID/PASSPORT</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ROOM TYPE</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>PEOPLES</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>EMAIL</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ROOMS</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>STAY DAYS</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', textAlign: 'center' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              .filter(res => res.guestName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((res) => (
                <TableRow key={res.id} hover>
                  <TableCell sx={{ color: '#fff' }}>{res.id}</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 500 }}>{res.guestName}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{res.idPassport}</TableCell>
                  <TableCell>
                    <Chip label={res.roomType} size="small" variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }} />
                  </TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{res.totalPeople}</TableCell>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>{res.email}</TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{res.roomsBooked}</TableCell>
                  <TableCell sx={{ color: '#fff', textAlign: 'center' }}>{res.stayDuration}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton 
                      onClick={(e) => handleMenuOpen(e, res.id)}
                      sx={{ color: 'white' }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { 
            bgcolor: '#1e1e1e', 
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '150px'
          }
        }}
      >
        <MenuItem onClick={() => handleAction('Accepted')} sx={{ '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.1)' } }}>
          <CheckCircleIcon sx={{ fontSize: 18, mr: 1, color: '#4caf50' }} /> Accept
        </MenuItem>
        <MenuItem onClick={() => handleAction('Declined')} sx={{ '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}>
          <CancelIcon sx={{ fontSize: 18, mr: 1, color: '#f44336' }} /> Decline
        </MenuItem>
        <MenuItem onClick={() => handleAction('Waiting')} sx={{ '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.1)' } }}>
          <AccessTimeFilledIcon sx={{ fontSize: 18, mr: 1, color: '#ff9800' }} /> Wait
        </MenuItem>
      </Menu>
    </Box>
  );
}