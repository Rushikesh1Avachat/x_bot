import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: 250, bgcolor: "#f3e8ff", p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Bot AI
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
          onClick={() => navigate("/")}
        >
          New Chat
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/history")}
        >
          Past Conversations
        </Button>
      </Box>

      <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
    </Box>
  );
};

export default Layout;
