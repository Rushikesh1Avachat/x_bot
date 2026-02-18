import { Routes, Route } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
      <Container maxWidth="md">
        <Box textAlign="center" my={3}>
          <Typography variant="h4">
            Bot AI
          </Typography>
        </Box>

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Container>
   
  );
}

export default App;

