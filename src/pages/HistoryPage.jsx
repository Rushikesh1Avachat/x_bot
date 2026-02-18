// src/pages/HistoryPage.jsx
import React from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";

const HistoryPage = () => {
  const sessions = JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <Box sx={{ p: 4, bgcolor: "#FBFAD21A", minHeight: "100vh" }}>
      <Typography variant="h4" textAlign="center" mb={4}>Conversation History</Typography>
      {sessions.length === 0 ? (
        <Typography textAlign="center">No conversations yet.</Typography>
      ) : (
        <Stack spacing={3}>
          {sessions.map((session) => (
            <Paper key={session.id} sx={{ p: 3, borderRadius: '20px', background: 'linear-gradient(90deg, #BFABE2 0%, #DADAFA 100%)' }}>
              <Typography variant="h6">Past Session</Typography>
              {session.messages.map((m, idx) => (
                <Box key={idx} sx={{ my: 1 }}>
                  <strong>{m.role}: </strong><p>{m.text}</p>
                </Box>
              ))}
              {session.feedback && (
                <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #ddd' }}>
                  <Typography variant="body2"><strong>Feedback:</strong> {session.feedback.comment} ({session.feedback.rating}/5)</Typography>
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};
export default HistoryPage;