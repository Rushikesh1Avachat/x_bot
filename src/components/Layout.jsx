import React from "react";
import { AppBar, Toolbar, Typography, Container, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      {/* Requirement 8: Use <header> semantic tag for the test runner */}
      <header>
        <AppBar position="static" sx={{ bgcolor: '#D7C7F4', color: '#000' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Requirement 8: Correct Title is "Bot AI" (not Soul AI here) */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Ubuntu' }}>
              Bot AI
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Requirement 6 & 7: Navigation links with correct hrefs */}
              <Button 
                component={Link} 
                to="/" 
                sx={{ color: 'inherit', textTransform: 'none' }}
              >
                New Chat
              </Button>
              
              <Button 
                component={Link} 
                to="/history" 
                sx={{ color: 'inherit', textTransform: 'none' }}
              >
                Past Conversations
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </header>

      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;