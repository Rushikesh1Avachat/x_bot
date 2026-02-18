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
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import HistoryIcon from '@mui/icons-material/History';

const drawerWidth = 280;

export default function Layout({ children, currentView, onViewChange }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box sx={{ width: drawerWidth, height: '100%', p: 3, bgcolor: '#F8F5FF' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 5, color: '#9747FF' }}>
        Bot AI
      </Typography>

      <Button
        fullWidth
        variant={currentView === 'chat' ? 'contained' : 'outlined'}
        startIcon={<ChatBubbleOutlineIcon />}
        onClick={() => {
          onViewChange('chat');
          if (isMobile) setMobileOpen(false);
        }}
        sx={{
          mb: 2,
          py: 1.8,
          justifyContent: 'flex-start',
          textTransform: 'none',
          fontWeight: 600,
          bgcolor: currentView === 'chat' ? '#9747FF' : 'transparent',
          color: currentView === 'chat' ? 'white' : '#9747FF',
          borderColor: '#9747FF',
          borderRadius: 2,
          '&:hover': { bgcolor: currentView === 'chat' ? '#7C3AED' : '#F0E8FF' },
        }}
      >
        New Chat
      </Button>

      <Button
        fullWidth
        variant={currentView === 'history' ? 'contained' : 'outlined'}
        startIcon={<HistoryIcon />}
        onClick={() => {
          onViewChange('history');
          if (isMobile) setMobileOpen(false);
        }}
        sx={{
          py: 1.8,
          justifyContent: 'flex-start',
          textTransform: 'none',
          fontWeight: 600,
          bgcolor: currentView === 'history' ? '#9747FF' : 'transparent',
          color: currentView === 'history' ? 'white' : '#9747FF',
          borderColor: '#9747FF',
          borderRadius: 2,
          '&:hover': { bgcolor: currentView === 'history' ? '#7C3AED' : '#F0E8FF' },
        }}
      >
        Past Conversations
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{ width: drawerWidth, flexShrink: 0, borderRight: '1px solid #E0D4FF' }}>
          {sidebarContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: '#F8F5FF' },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {isMobile && (
          <AppBar position="fixed" sx={{ bgcolor: '#9747FF' }}>
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Bot AI
              </Typography>
            </Toolbar>
          </AppBar>
        )}

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