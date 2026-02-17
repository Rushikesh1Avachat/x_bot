import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('soul_history') || '[]');
    setHistory(data);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold' }}>
        Conversation History
      </Typography>
      {history.length === 0 ? (
        <Typography color="textSecondary">No past conversations found.</Typography>
      ) : (
        history.map((session) => (
          <Paper key={session.id} sx={{ p: 3, mb: 3, bgcolor: '#AF9FCD11', borderRadius: 3 }}>
            <Typography variant="caption" fontWeight="bold" color="primary">{session.date}</Typography>
            {session.chat.map((m, i) => (
              <Box key={i} sx={{ mt: 1.5 }}>
                <Typography variant="body2">
                  <strong style={{ color: m.role === 'bot' ? '#9747FF' : '#3C3C3C' }}>
                    {m.role === 'bot' ? 'Soul AI' : 'You'}:
                  </strong> {m.text}
                </Typography>
              </Box>
            ))}
          </Paper>
        ))
      )}
    </Container>
  );
};

export default HistoryPage;