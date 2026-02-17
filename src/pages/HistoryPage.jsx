import React from 'react';
import { Box, Typography, Paper, Rating } from '@mui/material';
import ChatBubble from '../components/ChatBubble';

const HistoryPage = () => {
  // Requirement: Fetch persistent data from localStorage
  const history = JSON.parse(localStorage.getItem("soul_history") || "[]");

  return (
    <Box sx={{ 
      p: 4, 
      bgcolor: '#FAF9FF', // Matching the light lavender background
      minHeight: '100vh', 
      overflowY: 'auto' 
    }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: '500' }}>
        Conversation History
      </Typography>
      
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: '600' }}>
          Today's Chats
        </Typography>
        
        {history.length === 0 ? (
          <Typography align="center" color="textSecondary">
            No saved conversations found.
          </Typography>
        ) : (
          // Reverse to show most recent sessions first
          [...history].reverse().map((session) => (
            <Paper 
              key={session.id} 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: '20px', 
                background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 71, 255, 0.1) 100%)', // Gradient styling
                border: '1px solid #E0E0E0'
              }}
            >
              {/* Render every message in this specific chat session */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {session.chat.map((msg, i) => (
                  <ChatBubble 
                    key={i} 
                    message={msg} 
                    onFeedback={() => {}} // Noop function to prevent crash in history view
                  />
                ))}
              </Box>

              {/* Feedback and Rating Section matching image design */}
              <Box sx={{ 
                mt: 3, 
                p: 2, 
                bgcolor: 'rgba(255, 255, 255, 0.6)', 
                borderRadius: '15px',
                border: '1px dashed #D7C7F4'
              }}>
                {session.rating > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Rating:</Typography>
                    <Rating value={session.rating} readOnly size="small" />
                  </Box>
                )}
                
                {session.feedback && (
                  <Typography variant="body2">
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Feedback: </Box>
                    {session.feedback}
                  </Typography>
                )}
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default HistoryPage;



