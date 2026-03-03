import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Link from '@mui/material/Link'; // 🟢 Link add kiya
import { useNavigate } from 'react-router-dom'; // 🟢 Navigation ke liye

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const navigate = useNavigate(); // 🟢 Hook initialize kiya

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {/* 🟢 Dashboard ko clickable banaya */}
      <Link
        underline="hover"
        color="inherit"
        sx={{ 
          cursor: 'pointer', 
          fontSize: '0.875rem',
          '&:hover': { color: '#b48c50' } // Hamara gold color hover par
        }}
        onClick={() => navigate('/dashboard')} // Yahan apna main path check kar lein
      >
        Dashboard
      </Link>

      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.875rem' }}>
        Home
      </Typography>
    </StyledBreadcrumbs>
  );
}
