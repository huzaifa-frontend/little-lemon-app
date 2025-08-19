import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home as HomeIcon,
  Restaurant as RestaurantIcon,
  Info as InfoIcon,
  Email as EmailIcon,
  ShoppingBag as ShoppingBagIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #495e57 0%, #3a4c47 100%)',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 70%, rgba(244, 206, 20, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  backdropFilter: 'blur(10px)',
}));

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavLink = styled(Link)(({ theme, active }) => ({
  color: 'white',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '80%' : '0%',
    height: '2px',
    background: 'linear-gradient(90deg, #f4ce14, #ffea61)',
    boxShadow: '0 0 8px rgba(244, 206, 20, 0.6)',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
  },

  '&:hover': {
    color: '#f4ce14',
    transform: 'translateY(-2px)',
    '&::before': {
      width: '80%',
    },
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  marginLeft: 'auto',
}));

const IconLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  padding: theme.spacing(1),
  borderRadius: '50%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',

  '&:hover': {
    color: '#f4ce14',
    transform: 'scale(1.2) rotate(5deg)',
    background: 'rgba(244, 206, 20, 0.1)',
    boxShadow: '0 0 15px rgba(244, 206, 20, 0.3)',
  },
}));

const AnimatedMenuIcon = styled(IconButton)(({ open }) => ({
  color: 'white',
  transition: 'all 0.3s ease',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  '&:hover': {
    background: 'rgba(244, 206, 20, 0.1)',
    transform: open ? 'rotate(180deg) scale(1.1)' : 'rotate(0deg) scale(1.1)',
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: 'linear-gradient(135deg, #495e57 0%, #3a4c47 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 30% 70%, rgba(244, 206, 20, 0.1) 0%, transparent 50%)',
      pointerEvents: 'none',
    },
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  borderBottom: '1px solid rgba(244, 206, 20, 0.2)',
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  background: active ? 'rgba(244, 206, 20, 0.1)' : 'transparent',
  border: active ? '1px solid rgba(244, 206, 20, 0.3)' : '1px solid transparent',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: 'rgba(244, 206, 20, 0.15)',
    transform: 'translateX(8px)',
  },

  '& .MuiListItemIcon-root': {
    color: active ? '#f4ce14' : 'white',
    minWidth: '40px',
    transition: 'color 0.3s ease',
  },

  '& .MuiListItemText-primary': {
    color: active ? '#f4ce14' : 'white',
    fontWeight: active ? 600 : 500,
    transition: 'color 0.3s ease',
  },
}));

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/menu', label: 'Menu', icon: RestaurantIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
  { path: '/contact', label: 'Contact', icon: EmailIcon },
];

const iconItems = [
  { path: '/cart', icon: ShoppingBagIcon, label: 'Cart' },
  { path: '/profile', icon: PersonIcon, label: 'Profile' },
];

function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setTimeout(() => setDrawerOpen(false), 300);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <AnimatedMenuIcon
              open={drawerOpen}
              onClick={handleDrawerToggle}
              aria-label="Toggle menu"
            >
              {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            </AnimatedMenuIcon>
          )}

          {/* Desktop Navigation */}
          <NavContainer>
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={item.path}>
                  <NavLink
                    to={item.path}
                    active={isActive(item.path)}
                    onClick={handleLinkClick}
                  >
                    <IconComponent sx={{ fontSize: 20 }} />
                    {item.label}
                  </NavLink>
                </Zoom>
              );
            })}
          </NavContainer>

          {/* Right Side Icons */}
          <IconContainer>
            {iconItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Zoom in={true} style={{ transitionDelay: `${(index + 4) * 100}ms` }} key={item.path}>
                  <IconLink to={item.path} onClick={handleLinkClick}>
                    <IconComponent sx={{ fontSize: 24 }} />
                  </IconLink>
                </Zoom>
              );
            })}
          </IconContainer>

          {/* Mobile Drawer */}
          <StyledDrawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DrawerHeader>

            <List sx={{ position: 'relative', zIndex: 1 }}>
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Fade in={drawerOpen} style={{ transitionDelay: `${index * 100}ms` }} key={item.path}>
                    <StyledListItem
                      component={Link}
                      to={item.path}
                      onClick={handleLinkClick}
                      active={isActive(item.path)}
                    >
                      <ListItemIcon>
                        <IconComponent />
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </StyledListItem>
                  </Fade>
                );
              })}

              {/* Mobile Icons in Drawer */}
              {iconItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Fade in={drawerOpen} style={{ transitionDelay: `${(index + 4) * 100}ms` }} key={item.path}>
                    <StyledListItem
                      component={Link}
                      to={item.path}
                      onClick={handleLinkClick}
                      active={isActive(item.path)}
                    >
                      <ListItemIcon>
                        <IconComponent />
                      </ListItemIcon>
                      <ListItemText primary={item.label} />
                    </StyledListItem>
                  </Fade>
                );
              })}
            </List>
          </StyledDrawer>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Nav;