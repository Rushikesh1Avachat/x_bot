import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleNewChat = () => {
    localStorage.removeItem("bot_conversations");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            Bot AI
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button color="inherit" onClick={handleNewChat}>
              New Chat
            </Button>

            <Button
              color="inherit"
              onClick={() => navigate("/history")}
            >
              Past Conversations
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
};

export default Layout;

