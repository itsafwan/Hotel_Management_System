import * as React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, Menu, MenuItem,
  Stack, TextField, InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

interface Room {
  id: number;
  roomNo: string;
  type: string;
  issue: string;
  status: 'Free' | 'Busy' | 'Maintenance';
  floor: string;
}

const roomData: Room[] = [
  { id: 1, roomNo: '102', type: 'Single', issue: 'Cleaned', status: 'Free', floor: '2nd' },
  { id: 2, roomNo: '220', type: 'Double', issue: 'Cleaning in Progress', status: 'Busy', floor: '3rd' },
  { id: 3, roomNo: '305', type: 'Suite', issue: 'Plumbing Issue', status: 'Maintenance', floor: '3rd' },
];

export default function RoomList() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = React.useState<null | number>(null);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  const handleEdit = () => {
    console.log("Editing Room ID:", selectedRoom);
    handleCloseMenu();
  };

  const handleDelete = () => {
    console.log("Deleting Room ID:", selectedRoom);
    handleCloseMenu();
  };

  const getStatusChip = (status: Room['status']) => {
    const config: Record<Room['status'], { bg: string; text: string }> = {
      'Free': { bg: 'rgba(76, 175, 80, 0.1)', text: '#4caf50' },
      'Busy': { bg: 'rgba(244, 67, 54, 0.1)', text: '#f44336' },
      'Maintenance': { bg: 'rgba(255, 152, 0, 0.1)', text: '#ff9800' },
    };
    const style = config[status];
    return <Chip label={status} sx={{ bgcolor: style.bg, color: style.text, fontWeight: 'bold', borderRadius: '8px' }} />;
  };

  return (
    <Box sx={{ p: 3, width: '100%', minHeight: '100vh' }}>
      {/* Header with Search Bar */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        spacing={2} 
        sx={{ mb: 4 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
          Rooms List
        </Typography>

        <TextField
          placeholder="Search by Room or Status..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: { xs: '100%', sm: '300px' },
            bgcolor: 'rgba(255,255,255,0.05)',
            borderRadius: '10px',
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
              '&:hover fieldset': { borderColor: '#b48c50' },
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
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
        backgroundImage: 'none',
        overflow: 'hidden'
      }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(180, 140, 80, 0.1)' }}>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>NO</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>ROOM NO</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>ROOM TYPE</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>ROOM ISSUE</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>STATUS</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>FLOOR</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }} align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomData
              .filter(r => r.roomNo.includes(searchTerm) || r.status.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((room, index) => (
              <TableRow key={room.id} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }, transition: '0.3s' }}>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{index + 1}</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{room.roomNo}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{room.type}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{room.issue}</TableCell>
                <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{getStatusChip(room.status)}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{room.floor}</TableCell>
                <TableCell align="center" sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <IconButton onClick={(e) => handleOpenMenu(e, room.id)} sx={{ color: 'white' }}>
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
        onClose={handleCloseMenu}
        PaperProps={{
          sx: { 
            bgcolor: '#1a1a1a', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '150px'
          }
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 1.5 }}>
          <EditIcon fontSize="small" sx={{ color: '#b48c50' }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ gap: 1.5, color: '#f44336' }}>
          <DeleteIcon fontSize="small" /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}