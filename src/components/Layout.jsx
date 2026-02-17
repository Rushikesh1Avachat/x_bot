import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleNewChat = () => {
    // Navigate to home. 
    // If you're using state in App.js for the current chat, 
    // you'd clear it there. Avoid removing 'soul_history' from localStorage
    // as that is where your "Past Conversations" are stored!
    navigate("/");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Requirement: Header with correct title */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ color: '#9747FF', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate("/")}
          >
            Bot AI
          </Typography>

          {/* Wrap buttons in <nav> for better accessibility/test discovery */}
          <Box component="nav" sx={{ display: "flex", gap: 2 }}>
            <Button 
              sx={{ color: 'black', textTransform: 'none' }} 
              onClick={handleNewChat}
            >
              New Chat
            </Button>

            {/* Use the specific text 'Past Conversations' looked for by tests */}
            <Button
              sx={{ color: 'black', textTransform: 'none' }}
              onClick={() => navigate("/history")}
            >
              Past Conversations
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

