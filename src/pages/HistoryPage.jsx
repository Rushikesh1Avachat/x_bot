import React from "react";
import { Box, Typography, Stack, Paper, Avatar } from "@mui/material";

const HistoryPage = () => {
  // Requirement 3: Ensure data is pulled from localStorage for persistence
  const historySessions = JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <Box sx={{ p: 4, bgcolor: "#FBFAD21A", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontFamily: 'Ubuntu', fontWeight: 700, textAlign: 'center', mb: 4 }}>
        Conversation History
      </Typography>

      {historySessions.length === 0 ? (
        // Requirement: Show "No conversations yet" when empty
        <Typography sx={{ textAlign: 'center', mt: 10 }}>No conversations yet.</Typography>
      ) : (
        <Stack spacing={4} sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Past Conversations</Typography>
          
          {historySessions.map((session, sIdx) => (
            // Only render if session and messages exist to prevent the 'map' error
            session && session.messages ? (
              <Paper key={session.id || sIdx} sx={{ 
                p: 3, 
                borderRadius: '20px', 
                background: 'linear-gradient(90deg, #BFABE2 0%, #DADAFA 100%)',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
              }}>
                <Stack spacing={3}>
                  {session.messages.map((msg, mIdx) => (
                    <Stack key={mIdx} direction="row" spacing={2} alignItems="flex-start">
                      <Avatar sx={{ bgcolor: msg.role === "You" ? '#9747FF' : '#D7C7F4' }}>
                        {msg.role === "You" ? "U" : "AI"}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold" variant="body2">{msg.role}</Typography>
                        <Typography variant="body1">{msg.text}</Typography>
                        <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>

                {session.feedback && session.feedback.comment && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                    <Typography variant="body2">
                      <strong>Feedback:</strong> {session.feedback.comment}
                    </Typography>
                  </Box>
                )}
              </Paper>
            ) : null // Skip old/invalid data formats
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default HistoryPage;