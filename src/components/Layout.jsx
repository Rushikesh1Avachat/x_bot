import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  useMediaQuery, 
  Avatar 
} from '@mui/material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { TbRobot } from 'react-icons/tb'; // Unified robot icon

const drawerWidth = 280;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Chat', path: '/' },
    { text: 'Past Conversations', path: '/history' }
  ];

  const drawerContent = (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      
      {/* --- NEW CHAT BRANDING --- */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          mb: 4, 
          cursor: 'pointer', 
          p: 1.5, 
          borderRadius: 2, 
          bgcolor: '#D7C7F4', // Theme primary light
          '&:hover': { bgcolor: '#AF9FCD' } 
        }} 
        onClick={() => navigate('/')}
      >
        <Avatar sx={{ bgcolor: 'white', width: 35, height: 35 }}>
          <TbRobot size={24} color="#9747FF" />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Ubuntu' }}>
          New Chat
        </Typography>
      </Box>

      {/* --- NAVIGATION --- */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{ 
                borderRadius: 2, 
                mb: 1,
                '&.Mui-selected': { 
                  bgcolor: '#D7C7F4', 
                  '&:hover': { bgcolor: '#AF9FCD' } 
                } 
              }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontFamily: 'Ubuntu', 
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal' 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* --- BOTTOM IDENTITY CARD --- */}
      <Box sx={{ 
        mt: 'auto', 
        p: 2, 
        bgcolor: '#AF9FCD33', // Subtle purple background
        borderRadius: 2, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2 
      }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: '#D7C7F4' }}>
          <TbRobot size={25} color="#3C3C3C" />
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight="bold" sx={{ fontFamily: 'Ubuntu' }}>
            Soul AI Assistant
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Ready to help
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9F9F9' }}>
      {/* Sidebar - Persistent for Desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': { 
              width: drawerWidth, 
              borderRight: '1px solid #E0E0E0', 
              boxShadow: 'none' 
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          p: 0 // Padding removed so ChatPage can manage its own layout
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default Layout;