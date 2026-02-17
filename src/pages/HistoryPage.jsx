import React, { useEffect, useState } from 'react';
import { 
  Container, Typography, Paper, Box, Avatar, Stack 
} from '@mui/material';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Requirements: Load persistent messages from localStorage
    const data = JSON.parse(localStorage.getItem('soul_history') || '[]');
    setHistory(data);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 71, 255, 0.2) 100%)',
      pt: 8, // Matching the high header placement
      pb: 4 
    }}>
      <Container maxWidth="md">
        {/* Header styling matching image_08ddd5.jpg */}
        <Typography variant="h4" align="center" sx={{ mb: 6, fontWeight: 500, color: '#000', fontFamily: 'Ubuntu, sans-serif' }}>
          Conversation History
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 400, color: '#000', px: 1 }}>
          Today's Chats
        </Typography>

        <Stack spacing={3}>
          {history.length === 0 ? (
            <Typography align="center" color="textSecondary">No history found.</Typography>
          ) : (
            history.map((session) => (
              <Paper 
                key={session.id} 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: '16px', 
                  background: 'rgba(215, 199, 244, 0.5)', // Transparent lavender matching
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  mb: 1
                }}
              >
                {session.chat.map((m, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2, mb: i === session.chat.length - 1 ? 0 : 4 }}>
                    <Avatar 
                      src={m.role === 'You' ? "/user-avatar.png" : "/ai-logo.png"} 
                      sx={{ 
                        width: 55, 
                        height: 55, 
                        border: '1px solid #fff',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.08)'
                      }}
                    >
                      {m.role === 'You' ? 'Y' : 'S'}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '1rem' }}>
                        {m.role}
                      </Typography>
                      
                      <Typography component="p" variant="body1" sx={{ mt: 0.5, color: '#333', lineHeight: 1.5 }}>
                        {m.text}
                      </Typography>
                      
                      {/* Interaction Meta (Time + Rating) */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8rem' }}>
                          {m.time}
                        </Typography>

                        {/* Rating stars matching image_12cb3d.png */}
                        {m.role === 'Soul AI' && m.rating > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                              <Typography 
                                key={starIndex} 
                                sx={{ 
                                  fontSize: '18px', 
                                  color: '#000',
                                  mr: 0.3,
                                  lineHeight: 1
                                }}
                              >
                                {starIndex <= m.rating ? '★' : '☆'}
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>

                      {/* Feedback row matching image_12cb3d.png */}
                      {m.role === 'Soul AI' && m.feedback && (
                        <Typography variant="body2" sx={{ mt: 1.5, color: '#000' }}>
                          <span style={{ fontWeight: 800 }}>Feedback:</span> {m.feedback}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Paper>
            ))
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default HistoryPage;





