import { Routes, Route, Link } from "react-router-dom";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      {/* Requirement 8: Use <header> tag and correct title */}
      <header>
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid #eee' 
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ color: '#9747FF', fontWeight: 'bold', fontFamily: 'Ubuntu' }}
          >
            Bot AI
          </Typography>

          <Stack direction="row" spacing={2}>
            {/* Requirement 6 & 7: Buttons must act as links with specific hrefs */}
            <Button 
              component={Link} 
              to="/" 
              variant="text" 
              sx={{ color: '#000', textTransform: 'none' }}
            >
              New Chat
            </Button>
            <Button 
              component={Link} 
              to="/history" 
              variant="text" 
              sx={{ color: '#000', textTransform: 'none' }}
            >
              Past Conversations
            </Button>
          </Stack>
        </Box>
      </header>

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Routes>
          {/* Requirement 1-3, 9-10: Handled in ChatPage */}
          <Route path="/" element={<ChatPage />} />
          
          {/* Requirement 4-5: Handled in HistoryPage via /history route */}
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
