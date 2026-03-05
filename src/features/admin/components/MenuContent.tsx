import * as React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Stack, Collapse } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeRounded as HomeRoundedIcon,
  PeopleRounded as PeopleRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
  AccountBalanceWalletRounded as AccountBalanceWalletRoundedIcon,
  ExpandLess,
  ExpandMore,
  ManageAccountsRounded as ManageAccountsRoundedIcon,
  PersonAddAlt1Rounded as PersonAddAlt1RoundedIcon,
  ListAltRounded as ListAltRoundedIcon,
  AssessmentRounded as AssessmentRoundedIcon,
  FactCheckRounded as FactCheckRoundedIcon,
  HistoryEduRounded as HistoryEduRoundedIcon,
  CleaningServicesRounded as CleaningServicesIcon,
  BarChartRounded as BarChartIcon,
  MeetingRoomRounded as RoomIcon,
  ReceiptLongRounded as ReceiptIcon,
  DashboardRounded as DashboardIcon,
  AddRounded as AddRoundedIcon, // Add icon yahan shamil kar diya
  EventAvailableRounded as EventAvailableIcon, // Reservations ke liye behtar icon
} from '@mui/icons-material';


export default function MenuContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // States for collapse logic
  const [openAccounts, setOpenAccounts] = React.useState(false);
  const [openRooms, setOpenRooms] = React.useState(false);
  const [openGuest, setOpenGuest] = React.useState(false);
  const [openHousekeeping, setOpenHousekeeping] = React.useState(false);
  // Path check updated for nested routing
  const [openBilling, setOpenBilling] = React.useState(location.pathname.includes('/billing'));
  const [openAnalytics, setOpenAnalytics] = React.useState(false);

  const childItemStyle = {
    pl: 4, 
    py: 0.4,
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
        backgroundColor: 'rgba(2, 136, 209, 0.08)',
        color: '#0288d1',
    },
    '& .MuiListItemText-primary': {
      fontSize: '0.75rem', 
    }
  };

  const mainItemStyle = (path?: string) => ({
    borderRadius: '8px',
    mb: 0.2,
    mx: 1,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: path && location.pathname === path ? 'rgba(2, 136, 209, 0.12)' : 'transparent',
    '&.Mui-selected': {
        backgroundColor: 'rgba(2, 136, 209, 0.2)',
        color: '#0288d1',
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '& .MuiListItemText-primary': { 
      fontSize: '0.82rem', 
      fontWeight: 500,
    },
    '& .MuiListItemIcon-root': {
        color: 'inherit',
        minWidth: 32
    }
  });

  return (
    <Stack sx={{ flexGrow: 1, mt: 2, height: '100%', overflowY: 'auto' }}>
      <List dense sx={{ p: 0 }}>
        
        {/* 1. OVERVIEW */}
        <ListItemButton 
          selected={location.pathname === '/dashboard'} 
          onClick={() => navigate('/dashboard')}
          sx={mainItemStyle('/dashboard')}
        >
          <ListItemIcon><HomeRoundedIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Overview" />
        </ListItemButton>

        {/* 2. STAFF MANAGEMENT */}
        <ListItemButton onClick={() => setOpenAccounts(!openAccounts)} sx={mainItemStyle()}>
          <ListItemIcon><ManageAccountsRoundedIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Staff Management" />
          {openAccounts ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>
        <Collapse in={openAccounts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={childItemStyle} onClick={() => navigate('/staff/create')}>
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><PersonAddAlt1RoundedIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Create Account" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 3. ROOM MANAGEMENT */}
        <ListItemButton onClick={() => setOpenRooms(!openRooms)} sx={mainItemStyle()}>
          <ListItemIcon><RoomIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Room Management" />
          {openRooms ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>
        <Collapse in={openRooms} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    {/* 1. Room Dashboard */}
    <ListItemButton sx={childItemStyle} onClick={() => navigate('/dashboard/rooms')}>
      <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
        <DashboardIcon sx={{ fontSize: 16 }} />
      </ListItemIcon>
      <ListItemText primary="Room Dashboard" />
    </ListItemButton>

    {/* 2. Reservations */}
    <ListItemButton sx={childItemStyle} onClick={() => navigate('/dashboard/rooms/reservations')}>
      <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
        <EventAvailableIcon sx={{ fontSize: 16 }} />
      </ListItemIcon>
      <ListItemText primary="Reservations" />
    </ListItemButton>

    {/* 3. Inventory */}
    <ListItemButton sx={childItemStyle} onClick={() => navigate('/dashboard/rooms/inventory')}>
      <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
        <FactCheckRoundedIcon sx={{ fontSize: 16 }} />
      </ListItemIcon>
      <ListItemText primary="Room Inventory" />
    </ListItemButton>

    {/* 4. Add Rooms */}
    <ListItemButton sx={childItemStyle} onClick={() => navigate('/dashboard/rooms/addrooms')}>
      <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
        <AddRoundedIcon sx={{ fontSize: 16 }} />
      </ListItemIcon>
      <ListItemText primary="Add Rooms" />
    </ListItemButton>

    {/* 5. Rooms List */}
    <ListItemButton sx={childItemStyle} onClick={() => navigate('/dashboard/rooms/roomslist')}>
      <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
        <ListAltRoundedIcon sx={{ fontSize: 16 }} />
      </ListItemIcon>
      <ListItemText primary="Rooms List" />
    </ListItemButton>
  </List>
</Collapse>

        {/* 4. GUEST PROFILES */}
        <ListItemButton onClick={() => setOpenGuest(!openGuest)} sx={mainItemStyle()}>
          <ListItemIcon><PeopleRoundedIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Guest Profiles" />
          {openGuest ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>
        <Collapse in={openGuest} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={childItemStyle}>
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><ListAltRoundedIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Guest List" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 5. HOUSEKEEPING */}
        <ListItemButton onClick={() => setOpenHousekeeping(!openHousekeeping)} sx={mainItemStyle()}>
          <ListItemIcon><CleaningServicesIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Housekeeping" />
          {openHousekeeping ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>
        <Collapse in={openHousekeeping} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={childItemStyle}>
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><FactCheckRoundedIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Status Tasks" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 6. BILLING (Paths Updated for Nested Routing) */}
        <ListItemButton 
          onClick={() => setOpenBilling(!openBilling)} 
          selected={location.pathname.includes('/billing')}
          sx={mainItemStyle()}
        >
          <ListItemIcon><AccountBalanceWalletRoundedIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Billing & Invoices" />
          {openBilling ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>
        <Collapse in={openBilling} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Navigates to /dashboard/billing */}
            <ListItemButton selected={location.pathname === '/dashboard/billing'} sx={childItemStyle} onClick={() => navigate('/dashboard/billing')}>
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><DashboardIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Billing Dashboard" />
            </ListItemButton>

            {/* Navigates to Invoice Form (Create Invoice) */}
            <ListItemButton 
              selected={location.pathname === '/dashboard/billing/create'} 
              sx={childItemStyle} 
              onClick={() => navigate('/dashboard/billing/create')}
            >
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><HistoryEduRoundedIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Create Invoice" />
            </ListItemButton>


            <ListItemButton selected={location.pathname === '/dashboard/billing/list'} sx={childItemStyle} onClick={() => navigate('/dashboard/billing/list')}>
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><ReceiptIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Invoice List" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 7. ANALYTICS */}
        <ListItemButton onClick={() => setOpenAnalytics(!openAnalytics)} sx={mainItemStyle()}>
          <ListItemIcon><BarChartIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Analytics & Report" />
          {openAnalytics ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
        </ListItemButton>
        <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={childItemStyle}>
              <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}><AssessmentRoundedIcon sx={{ fontSize: 16 }} /></ListItemIcon>
              <ListItemText primary="Performance" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* 8. SETTINGS */}
        <ListItemButton onClick={() => navigate('/settings')} sx={mainItemStyle('/settings')}>
          <ListItemIcon><SettingsRoundedIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="System Admin" />
        </ListItemButton>

      </List>
    </Stack>
  );
}
