import React from "react";
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TbEdit } from "react-icons/tb";

const Layout = ({ onNewChat }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'white' }}>
      {/* Sidebar - Matches image_24907e.png */}
      <Box sx={{ width: 280, borderRight: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, bgcolor: '#D7C7F4', m: 2, borderRadius: '10px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { onNewChat(); navigate("/"); }}>
          <TbEdit size={24} style={{ marginRight: 10 }} />
          <Typography variant="h6">New Chat</Typography>
        </Box>

        <List sx={{ px: 2 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton 
              selected={location.pathname === "/"} 
              onClick={() => navigate("/")}
              sx={{ borderRadius: '10px', bgcolor: location.pathname === "/" ? '#D7C7F4' : 'transparent' }}
            >
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton 
              selected={location.pathname === "/history"} 
              onClick={() => navigate("/history")}
              sx={{ borderRadius: '10px' }}
            >
              <ListItemText primary="Past Conversations" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ p: 3, color: '#9747FF', fontWeight: 'bold' }}>Bot AI</Typography>
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;