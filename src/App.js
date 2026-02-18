import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [view, setView] = useState('chat');

  const handleNewChat = () => {
    setView('chat');
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ bgcolor: '#9747FF' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Bot AI
          </Typography>

          <Button 
            color="inherit" 
            onClick={handleNewChat}
            sx={{ mr: 2, textTransform: 'none' }}
          >
            New Chat
          </Button>

          <Button 
            color="inherit" 
            onClick={() => setView('history')}
            sx={{ textTransform: 'none' }}
          >
            Past Conversations
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: '#F9F9FB' }}>
        {view === 'chat' ? <ChatPage /> : <HistoryPage />}
      </Box>
    </Box>
  );
}