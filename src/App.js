import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HistoryPage from "./pages/HistoryPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('chat_history');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(history));
  }, [history]);

  const addChatToHistory = (newChat) => {
    // Requirements 2 & 3: Save to history and persist
    setHistory(prev => [newChat, ...prev]);
  };

  const startNewChat = () => {
    // Requirement 4: Start a new conversation
    localStorage.removeItem("conversations"); // Clear active chat from storage
    window.location.href = "/"; // Force refresh to clear states or navigate
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar - Requirements 4, 5, 6, 7 */}
      <Box sx={{ width: 240, borderRight: '1px solid #ddd', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>Bot AI</Typography>
        
        {/* Requirement 4: New Chat Button */}
        <Button onClick={startNewChat} variant="contained" fullWidth sx={{ bgcolor: '#af9cf3' }}>
          New Chat
        </Button>
        
        {/* Requirement 5 & 7: Navigation to History */}
        <Button component={Link} to="/history" variant="outlined" fullWidth>
          Past Conversations
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {/* Requirement 8: Header with correct title */}
        <Box component="header" sx={{ p: 2, borderBottom: '1px solid #eee', bgcolor: '#fff' }}>
          <Typography variant="h6" color="primary" fontWeight="bold">Bot AI</Typography>
        </Box>

        <Routes>
          <Route path="/" element={<ChatPage onSave={addChatToHistory} />} />
          <Route path="/history" element={<HistoryPage history={history} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;