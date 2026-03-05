import * as React from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TextField, 
  InputAdornment, Chip, Stack, IconButton, Menu, MenuItem 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BuildIcon from '@mui/icons-material/Build';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

// TS Interface - No 'any' used
interface RoomIssue {
  id: number;
  roomNo: string;
  issue: string;
  category: 'Cleaning' | 'Maintenance' | 'Supplies';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Resolved';
}

export default function RoomInventory() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = React.useState<number | null>(null);

  const [issues] = React.useState<RoomIssue[]>([
    { id: 1, roomNo: '302', issue: 'Full cleaning required', category: 'Cleaning', priority: 'Medium', status: 'Pending' },
    { id: 2, roomNo: '305', issue: 'AC not cooling / Gas leak', category: 'Maintenance', priority: 'High', status: 'In Progress' },
    { id: 3, roomNo: '205', issue: 'Bed sheets and towels change', category: 'Supplies', priority: 'Low', status: 'Pending' },
    { id: 4, roomNo: '108', issue: 'Washroom tap leaking', category: 'Maintenance', priority: 'Medium', status: 'Resolved' },
  ]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  // Error fix karne ke liye function jo selectedRoom use karega
  const handleAction = (actionName: string) => {
    if (selectedRoom) {
      console.log(`Performing ${actionName} on Issue ID: ${selectedRoom}`);
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}>
        Room Inventory & Maintenance
      </Typography>

      {/* Search Header */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 3 }}>
        <TextField
          size="small"
          placeholder="Search by Room No..."
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

      {/* Expanded Grid */}
      <TableContainer component={Paper} sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.02)', 
        borderRadius: '15px',
        border: '1px solid rgba(255,255,255,0.05)',
        backgroundImage: 'none'
      }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}>
            <TableRow>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>NO</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ROOM NO</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ISSUE DESCRIPTION</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>CATEGORY</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>PRIORITY</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold', textAlign: 'center' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues
              .filter(item => item.roomNo.includes(searchTerm))
              .map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell sx={{ color: 'rgba(255,255,255,0.5)' }}>{item.id}</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>{item.roomNo}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{item.issue}</TableCell>
                  <TableCell>
                    <Chip label={item.category} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ 
                      color: item.priority === 'High' ? '#f44336' : item.priority === 'Medium' ? '#ff9800' : '#4caf50',
                      fontWeight: 'bold'
                    }}>
                      {item.priority}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={item.status} 
                      size="small" 
                      color={item.status === 'Resolved' ? 'success' : item.status === 'In Progress' ? 'warning' : 'error'} 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <IconButton onClick={(e) => handleMenuOpen(e, item.id)} sx={{ color: 'white' }}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Inventory Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { bgcolor: '#1e1e1e', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }
        }}
      >
        <MenuItem onClick={() => handleAction('Start Fixing')}>
          <BuildIcon sx={{ fontSize: 18, mr: 1, color: '#ff9800' }} /> Start Fixing
        </MenuItem>
        <MenuItem onClick={() => handleAction('Mark Resolved')}>
          <CheckCircleIcon sx={{ fontSize: 18, mr: 1, color: '#4caf50' }} /> Mark Resolved
        </MenuItem>
        <MenuItem onClick={() => handleAction('Urgent Note')}>
          <PriorityHighIcon sx={{ fontSize: 18, mr: 1, color: '#f44336' }} /> Urgent Note
        </MenuItem>
      </Menu>
    </Box>
  );
}