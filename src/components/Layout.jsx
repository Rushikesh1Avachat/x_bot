import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography, useMediaQuery, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
// Import the image from your assets folder
import botLogo from "../assets/bot.png";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (
    <Box sx={{ width: 280, height: "100%", bgcolor: "white" }}>
      <Box 
        onClick={() => { navigate("/"); setMobileOpen(false); }}
        sx={{ 
          p: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          bgcolor: '#D7C7EB', 
          cursor: 'pointer',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Using the imported image variable here */}
          <Box 
            component="img" 
            src={botLogo} 
            alt="Bot AI Logo" 
            sx={{ width: 30, height: 30, borderRadius: '50%' }} 
          />
          <Typography variant="h6" sx={{ fontWeight: "400", fontSize: '1rem' }}>
            New Chat
          </Typography>
        </Box>
        <Box component="span" sx={{ fontSize: '1.2rem' }}>📝</Box>
      </Box>
      
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => { navigate("/history"); setMobileOpen(false); }}
            sx={{ 
              bgcolor: location.pathname === "/history" ? "#D7C7EB" : "transparent", 
              borderRadius: '10px',
              textAlign: 'center',
              '&:hover': { bgcolor: '#c4b5d6' }
            }}
          >
            <ListItemText 
              primary="Past Conversations" 
              primaryTypographyProps={{ fontWeight: 'bold', fontSize: '0.9rem' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isMobile ? (
        <>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center', width: '100%', position: 'absolute', zIndex: 1 }}>
            <IconButton onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>
            <Typography variant="h5" sx={{ ml: 1, color: "#9c27b0", fontWeight: "bold" }}>Bot AI</Typography>
          </Box>
          <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)}>{sidebar}</Drawer>
        </>
      ) : (
        <Box sx={{ borderRight: "1px solid #ddd" }}>{sidebar}</Box>
      )}
      <Box sx={{ flexGrow: 1, p: 3, mt: isMobile ? 6 : 0, bgcolor: "#FBF7FF" }}>
        {!isMobile && <Typography variant="h4" sx={{ color: "#9c27b0", fontWeight: "bold", mb: 3 }}>Bot AI</Typography>}
        {children}
      </Box>
    </Box>
  );
}