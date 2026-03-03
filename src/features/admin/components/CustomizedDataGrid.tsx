import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Room #', width: 90 },
  { field: 'guest', headerName: 'Guest Name', flex: 1, minWidth: 150 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 130,
    renderCell: (params) => (
      <span style={{ 
        color: params.value === 'Checked In' ? '#4caf50' : '#ff9800',
        fontWeight: 'bold' 
      }}>
        {params.value}
      </span>
    )
  },
  { field: 'checkIn', headerName: 'Check In', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 110 },
];

const rows = [
  { id: '101', guest: 'John Doe', status: 'Checked In', checkIn: '2026-03-01', amount: '$200' },
  { id: '204', guest: 'Jane Smith', status: 'Pending', checkIn: '2026-03-02', amount: '$450' },
  { id: '305', guest: 'Ali Khan', status: 'Checked In', checkIn: '2026-03-01', amount: '$300' },
  { id: '108', guest: 'Sarah Wilson', status: 'Checked In', checkIn: '2026-02-28', amount: '$150' },
  { id: '402', guest: 'Mike Ross', status: 'Pending', checkIn: '2026-03-03', amount: '$500' },
];

export default function CustomizedDataGrid() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 0,
          color: 'white',
          '& .MuiDataGrid-cell': { borderBottom: '1px solid #333' },
          '& .MuiDataGrid-columnHeaders': { backgroundColor: '#1e1e1e', color: 'white' },
        }}
      />
    </div>
  );
}