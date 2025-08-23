import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import logoUrl from '../../assets/1.png';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#F4CE14',
  position: 'relative',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
}));

const StyledLogo = styled('img')(({ theme }) => ({
  width: '180px',
  height: 'auto',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
  '&:hover': {
    transform: 'scale(1.05) translateY(-2px)',
    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
  },
  [theme.breakpoints.down('sm')]: {
    width: '140px',
  },
}));

// GlowEffect component removed entirely

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
          <LogoContainer>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <StyledLogo
                src={logoUrl}
                alt="Little Lemon Logo"
              />
            </Link>
          </LogoContainer>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Header;