import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              Bot AI
            </Typography>

            <Button component="a" href="/"   variant="contained"
                    size="large">
              New Chat
            </Button>

            <Button component="a" href="/history"  variant="contained" size="large">
              Past Conversations
            </Button>
          </Toolbar>
        </AppBar>
      </header>

      <Box sx={{ p: 4 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
