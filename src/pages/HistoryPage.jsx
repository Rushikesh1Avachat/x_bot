import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Paper, Box, Avatar, Stack 
} from '@mui/material';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('soul_history') || '[]');
    setHistory(data);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 71, 255, 0.2) 100%)',
      py: 4 
    }}>
      <Container maxWidth="md">
        {/* Title matches image_08ddd5.jpg */}
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: 400, color: '#000' }}>
          Conversation History
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>
          Today's Chats
        </Typography>

        <Stack spacing={2}>
          {history.map((session) => (
            <Paper 
              key={session.id} 
              elevation={0} 
              sx={{ 
                p: 2.5, 
                borderRadius: '16px', 
                background: '#D7C7F4', // Specific purple from image_08d9b4.jpg
                mb: 1
              }}
            >
              {session.chat.map((m, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, mb: i === session.chat.length - 1 ? 0 : 3 }}>
                  {/* Profile Icon Styling */}
                  <Avatar 
                    src={m.role === 'You' ? "/user-avatar.png" : "/ai-logo.png"} 
                    sx={{ 
                      width: 60, 
                      height: 60, 
                      border: '1px solid #fff',
                      boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    {m.role === 'You' ? 'Y' : 'S'}
                  </Avatar>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    {/* Bold Role names */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1 }}>
                      {m.role}
                    </Typography>
                    
                    <Typography variant="body1" sx={{ mt: 0.5, color: '#000', fontSize: '1rem' }}>
                      {m.text}
                    </Typography>
                    
                    {/* Inline Timestamp and Star Row */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.8 }}>
                      <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.85rem' }}>
                        {m.time}
                      </Typography>

                      {/* Black Star Rating */}
                      {m.role === 'Soul AI' && m.rating > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map((starIndex) => (
                            <Typography 
                              key={starIndex} 
                              sx={{ 
                                fontSize: '18px', 
                                lineHeight: 1,
                                color: '#000',
                                mr: 0.3
                              }}
                            >
                              {/* Unicode Stars matching the screenshot style */}
                              {starIndex <= m.rating ? '★' : '☆'}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>

                    {/* Feedback section */}
                    {m.role === 'Soul AI' && m.feedback && (
                      <Typography variant="body2" sx={{ mt: 1.5, fontSize: '0.95rem' }}>
                        <span style={{ fontWeight: 800 }}>Feedback:</span> {m.feedback}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HistoryPage;