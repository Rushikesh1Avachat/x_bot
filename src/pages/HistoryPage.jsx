// src/pages/HistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Logic: Load from localStorage
    const data = JSON.parse(localStorage.getItem('soul_history') || '[]');
    setHistory(data);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Conversation History</Typography>
      {history.map((session) => (
        <Paper key={session.id} sx={{ p: 2, mb: 2, bgcolor: '#AF9FCD33' }}>
          <Typography variant="caption">{session.date}</Typography>
          {session.chat.map((m, i) => (
            <Typography key={i} variant="body2">
              <strong>{m.role}:</strong> {m.text}
            </Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
};

export default HistoryPage;