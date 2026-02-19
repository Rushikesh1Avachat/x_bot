import { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const drawerWidth = 280;

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box sx={{ width: drawerWidth, height: '100%', p: 3, bgcolor: '#F8F5FF' }}>
      {/* Bot AI title – matches Figma exactly */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mb: 6,
          color: '#9747FF',
          textAlign: 'center',
        }}
      >
        Bot AI
      </Typography>

      {/* New Chat – outlined when not active */}
      <Button
        fullWidth
        component={RouterLink}
        to="/"
        variant={location.pathname === '/' ? 'contained' : 'outlined'}
        sx={{
          mb: 2,
          py: 1.8,
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 3,
          borderColor: '#9747FF',
          color: location.pathname === '/' ? 'white' : '#9747FF',
          bgcolor: location.pathname === '/' ? '#9747FF' : 'transparent',
          borderWidth: 2,
          '&:hover': {
            bgcolor: location.pathname === '/' ? '#7C3AED' : '#F0E8FF',
            borderColor: '#7C3AED',
            boxShadow: '0 4px 12px rgba(151,71,255,0.15)',
          },
        }}
      >
        New Chat
      </Button>

      {/* Past Conversations – filled purple when active */}
      <Button
        fullWidth
        component={RouterLink}
        to="/history"
        variant={location.pathname === '/history' ? 'contained' : 'outlined'}
        sx={{
          py: 1.8,
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 3,
          borderColor: '#9747FF',
          color: location.pathname === '/history' ? 'white' : '#9747FF',
          bgcolor: location.pathname === '/history' ? '#9747FF' : 'transparent',
          borderWidth: 2,
          '&:hover': {
            bgcolor: location.pathname === '/history' ? '#7C3AED' : '#F0E8FF',
            borderColor: '#7C3AED',
            boxShadow: '0 4px 12px rgba(151,71,255,0.15)',
          },
        }}
      >
        Past Conversations
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Desktop sidebar – always visible on large screens */}
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            borderRight: '1px solid #E0D4FF',
            bgcolor: '#F8F5FF',
          }}
        >
          {sidebarContent}
        </Box>
      )}

      {/* Mobile drawer – slides in */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#F8F5FF' },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile top bar with hamburger */}
        {isMobile && (
          <AppBar position="fixed" sx={{ bgcolor: '#9747FF' }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Bot AI
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Page content (ChatPage or HistoryPage) */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            mt: isMobile ? '64px' : 0,
            overflowY: 'auto',
            bgcolor: '#F9F9FB',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}