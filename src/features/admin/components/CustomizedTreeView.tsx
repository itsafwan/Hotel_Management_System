import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

export default function CustomizedTreeView() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', p: 2, flexGrow: 1 }}>
      <Typography component="h2" variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        Hotel Floor Map
      </Typography>
      <SimpleTreeView>
        <TreeItem itemId="floor-1" label="Floor 1 (Standard)">
          <TreeItem itemId="room-101" label="Room 101 - Booked" />
          <TreeItem itemId="room-102" label="Room 102 - Available" />
        </TreeItem>
        <TreeItem itemId="floor-2" label="Floor 2 (Deluxe)">
          <TreeItem itemId="room-201" label="Room 201 - Booked" />
          <TreeItem itemId="room-202" label="Room 202 - Available" />
        </TreeItem>
      </SimpleTreeView>
    </Card>
  );
}
