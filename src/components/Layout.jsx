import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <AppBar position="static" sx={{ bgcolor: '#D7C7F4', color: '#000' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Ubuntu' }}>
              Bot AI
            </Typography>

            <Button component={Link} to="/" variant="text" sx={{ color: 'inherit', mr: 2 }}>
              New Chat
            </Button>

            <Button component={Link} to="/history" variant="text" sx={{ color: 'inherit' }}>
              Past Conversations
            </Button>
          </Toolbar>
        </AppBar>
      </header>

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;