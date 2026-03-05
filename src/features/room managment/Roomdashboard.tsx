import * as React from 'react';
import { 
  Box, Typography, Paper, Chip, Stack, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  TextField, InputAdornment,
  Grid
} from '@mui/material';
import RoomIcon from '@mui/icons-material/MeetingRoomRounded';
import CleaningServicesIcon from '@mui/icons-material/CleaningServicesRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import EventAvailableIcon from '@mui/icons-material/EventAvailableRounded';
import InventoryIcon from '@mui/icons-material/Inventory2Rounded';
import KingBedIcon from '@mui/icons-material/KingBedRounded';
import SearchIcon from '@mui/icons-material/Search'; // Search Icon
import { type SvgIconComponent } from '@mui/icons-material';

// --- TypeScript Interfaces ---
interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
  icon: SvgIconComponent;
}

interface RoomData {
  id: string;
  no: string;
  guest: string;
  type: string;
  status: 'Available' | 'Occupied' | 'Cleaning' | 'Maintenance';
  stay: string;
  people: number;
}

const StatCard = ({ title, value, color, icon: Icon }: StatCardProps) => (
  <Paper sx={{ 
    p: 2, borderRadius: '15px', bgcolor: 'rgba(255, 255, 255, 0.03)', 
    borderLeft: `5px solid ${color}`, minHeight: '100px' 
  }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: color }}>{value}</Typography>
      </Box>
      <Icon sx={{ fontSize: 40, color: 'rgba(255,255,255,0.1)' }} />
    </Stack>
  </Paper>
);

export default function Roomdashboard() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [rooms] = React.useState<RoomData[]>([
    { id: '1', no: '101', guest: 'John Doe', type: 'Single', status: 'Occupied', stay: '3 Days', people: 1 },
    { id: '2', no: '110', guest: 'Sarah Khan', type: 'Double', status: 'Available', stay: '-', people: 0 },
    { id: '3', no: '201', guest: 'None', type: 'Suite', status: 'Cleaning', stay: '-', people: 0 },
  ]);

  // Logic to filter rooms based on search
  const filteredRooms = rooms.filter(room => 
    room.no.includes(searchTerm) || 
    room.guest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}>
        Room Management Overview
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard title="Total Cleaning" value="12" color="#ff9800" icon={CleaningServicesIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard title="Rooms Busy" value="08" color="#f44336" icon={RoomIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard title="Available Soon" value="05" color="#4caf50" icon={EventAvailableIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard title="Low Inventory" value="02" color="#e91e63" icon={InventoryIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard title="Reservations" value="15" color="#2196f3" icon={PeopleIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard title="Suites Booked" value="04" color="#9c27b0" icon={KingBedIcon} />
        </Grid>
      </Grid>

      {/* Header with Search Box Right Aligned */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Live Room Status & Occupancy
        </Typography>
        
        <TextField
          size="small"
          placeholder="Search by Room or Guest..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: '300px',
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
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}>
            <TableRow>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ROOM NO</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>GUEST NAME</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>ROOM TYPE</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>STAY DURATION</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>PEOPLE</TableCell>
              <TableCell sx={{ color: '#b48c50', fontWeight: 'bold' }}>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>{room.no}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{room.guest}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{room.type}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{room.stay}</TableCell>
                <TableCell sx={{ color: 'rgba(255,255,255,0.7)' }}>{room.people}</TableCell>
                <TableCell>
                  <Chip 
                    label={room.status.toUpperCase()} 
                    size="small"
                    sx={{ 
                      bgcolor: room.status === 'Available' ? 'rgba(76, 175, 80, 0.15)' : 
                               room.status === 'Occupied' ? 'rgba(244, 67, 54, 0.15)' : 'rgba(255, 152, 0, 0.15)',
                      color: room.status === 'Available' ? '#4caf50' : 
                             room.status === 'Occupied' ? '#f44336' : '#ff9800',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      borderRadius: '4px'
                    }} 
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}