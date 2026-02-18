import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <Box sx={{ width: 280, p: 3, bgcolor: '#F8F5FF', height: '100%' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 5, color: '#9747FF' }}>
        Bot AI
      </Typography>

      <Button
        fullWidth
        component={RouterLink}
        to="/"
        sx={{
          mb: 2,
          py: 1.5,
          justifyContent: 'flex-start',
          textTransform: 'none',
          fontWeight: 600,
          color: '#9747FF',
          borderColor: '#9747FF',
          borderRadius: 2,
          '&:hover': { bgcolor: '#F0E8FF' },
        }}
      >
        New Chat
      </Button>

      <Button
        fullWidth
        component={RouterLink}
        to="/history"
        sx={{
          py: 1.5,
          justifyContent: 'flex-start',
          textTransform: 'none',
          fontWeight: 600,
          color: '#9747FF',
          borderColor: '#9747FF',
          borderRadius: 2,
          '&:hover': { bgcolor: '#F0E8FF' },
        }}
      >
        Past Conversations
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#9747FF' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Bot AI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Desktop sidebar */}
      <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 280, flexShrink: 0 }}>
        {drawer}
      </Box>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: 280 } }}
      >
        {drawer}
      </Drawer>

      {/* Page content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}