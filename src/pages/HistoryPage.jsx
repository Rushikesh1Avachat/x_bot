import React from 'react';
import { Box, Typography, Paper, Avatar, Rating } from '@mui/material';
import { TbRobot } from 'react-icons/tb';

const HistoryPage = () => {
  // Pulling from the required storage key
  const history = JSON.parse(localStorage.getItem("soul_history") || "[]");

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9F8FF' }}>
      {/* 1. Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 500 }}>
          Conversation History
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '900px' }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Today's Chats
          </Typography>

          {history.length === 0 ? (
            <Typography color="textSecondary">No saved conversations yet.</Typography>
          ) : (
            history.map((session) => (
              <Paper 
                key={session.id} 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: '15px', 
                  bgcolor: 'rgba(215, 199, 244, 0.4)', // The light purple background from your image
                }}
              >
                {/* Loop through the messages within this specific saved session */}
                {session.chat.map((msg, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2, mb: index % 2 === 0 ? 2 : 0 }}>
                    <Avatar sx={{ bgcolor: msg.role === 'You' ? '#9747FF' : '#D7C7F4' }}>
                      {msg.role === 'You' ? 'Y' : <TbRobot color="black" />}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        <span>{msg.role}</span>
                      </Typography>
                      
                      <Typography component="p" variant="body1">
                        {msg.text}
                      </Typography>

                      <Typography variant="caption" color="textSecondary" sx={{ mr: 2 }}>
                        {msg.time}
                      </Typography>

                      {/* Display Rating and Feedback only for the AI response in history */}
                      {msg.role === 'Soul AI' && session.rating > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Rating value={session.rating} readOnly size="small" />
                          {session.feedback && (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              <strong>Feedback:</strong> {session.feedback}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryPage;




