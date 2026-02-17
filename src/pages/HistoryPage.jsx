import React from 'react';
import { Box, Typography, Paper, Rating } from '@mui/material';
import ChatBubble from '../components/ChatBubble';

const HistoryPage = () => {
  // Requirement 1 & 2
  const history = JSON.parse(localStorage.getItem("soul_history") || "[]");

  return (
    <Box sx={{ p: 4, bgcolor: '#FAF9FF', minHeight: '100vh', overflowY: 'auto' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>Conversation History</Typography>
      
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Today's Chats</Typography>
        
        {history.length === 0 ? (
          <Typography align="center" color="textSecondary">No history found.</Typography>
        ) : (
          [...history].reverse().map((session) => (
            <Paper key={session.id} sx={{ p: 3, mb: 4, borderRadius: '20px', border: '1px solid #E0E0E0' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {session.chat.map((msg, i) => (
                  <ChatBubble key={i} message={msg} onFeedback={() => {}} />
                ))}
              </Box>

              {/* Feedback and Rating */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255, 255, 255, 0.6)', borderRadius: '15px', border: '1px dashed #D7C7F4' }}>
                {session.rating > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight="bold">Rating:</Typography>
                    <Rating value={session.rating} readOnly size="small" />
                  </Box>
                )}
                {session.feedback && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <span style={{ fontWeight: 'bold' }}>Feedback: </span>{session.feedback}
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

