import * as React from 'react';
import { 
  Box, Typography, Paper, TextField, MenuItem, 
  Button, Grid, Stack, Divider 
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';

// TS Interface for Form Data
interface RoomFormData {
  roomNo: string;
  roomType: string;
  cleaningStatus: string;
  inventoryStatus: string;
  pricePerNight: string;
  floor: string;
}

export default function AddRooms() {
  const [formData, setFormData] = React.useState<RoomFormData>({
    roomNo: '',
    roomType: 'Single',
    cleaningStatus: 'Cleaned/Done',
    inventoryStatus: 'Done',
    pricePerNight: '',
    floor: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Room Added:', formData);
  };

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
        <AddCircleOutlineIcon sx={{ color: '#b48c50', fontSize: 32 }} />
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
          Add New Room
        </Typography>
      </Stack>

      <Paper sx={{ 
        p: 4, 
        bgcolor: 'rgba(255, 255, 255, 0.02)', 
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
        backgroundImage: 'none'
      }}>
        <form onSubmit={handleSubmit}>
          {/* Spacing updated for better grid flow */}
          <Grid container spacing={3}>
            
            {/* Room Number */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ color: '#b48c50', mb: 1, fontWeight: 'bold' }}>ROOM NUMBER</Typography>
              <TextField
                fullWidth
                name="roomNo"
                placeholder="e.g. 3024"
                value={formData.roomNo}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}}
              />
            </Grid>

            {/* Cleaning Status */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ color: '#b48c50', mb: 1, fontWeight: 'bold' }}>CLEANING STATUS</Typography>
              <TextField
                select
                fullWidth
                name="cleaningStatus"
                value={formData.cleaningStatus}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}}
              >
                <MenuItem value="Cleaned">Cleaned</MenuItem>
                <MenuItem value="Dirty">Uncleaned </MenuItem>
                <MenuItem value="Cleaning In Progress">Cleaning In Progress</MenuItem>
                <MenuItem value="Already Cleaned">Already Cleaned </MenuItem>
              </TextField>
            </Grid>

            {/* Room Type */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ color: '#b48c50', mb: 1, fontWeight: 'bold' }}>ROOM TYPE</Typography>
              <TextField
                select
                fullWidth
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
                <MenuItem value="Suite">Suite</MenuItem>
                <MenuItem value="Deluxe">Deluxe</MenuItem>
              </TextField>
            </Grid>

            {/* Inventory Status */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ color: '#b48c50', mb: 1, fontWeight: 'bold' }}>INVENTORY STATUS</Typography>
              <TextField
                select
                fullWidth
                name="inventoryStatus"
                value={formData.inventoryStatus}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}}
              >
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="Add">Add </MenuItem>
              </TextField>
            </Grid>

            {/* Price */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ color: '#b48c50', mb: 1, fontWeight: 'bold' }}>PRICE PER NIGHT ($)</Typography>
              <TextField
                fullWidth
                name="pricePerNight"
                type="number"
                placeholder="e.g. 150"
                value={formData.pricePerNight}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}}
              />
            </Grid>

            {/* Floor */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ color: '#b48c50', mb: 1, fontWeight: 'bold' }}>FLOOR</Typography>
              <TextField
                fullWidth
                name="floor"
                placeholder="e.g. 3rd Floor"
                value={formData.floor}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.03)' }}}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button 
              variant="outlined" 
              sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', borderRadius: '10px' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="contained" 
              startIcon={<SaveIcon />}
              sx={{ 
                bgcolor: '#b48c50', 
                color: 'black', 
                fontWeight: 'bold',
                borderRadius: '10px',
                '&:hover': { bgcolor: '#947240' }
              }}
            >
              Save Room
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}