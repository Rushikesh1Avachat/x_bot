import React, { useEffect, useState } from "react";
import { Container, Typography, Paper, Stack, Box, Rating } from "@mui/material";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("conversations")) || [];
    setHistory(saved);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 4, fontWeight: 'bold', fontFamily: 'Ubuntu' }}>
        Conversation History
      </Typography>
      
      {history.length === 0 ? (
        <Typography textAlign="center">No saved conversations yet.</Typography>
      ) : (
        <Stack spacing={4}>
          {history.map((conv) => (
            <Paper key={conv.id} sx={{ p: 3, borderRadius: '20px', background: 'linear-gradient(90deg, #BFABE2 0%, #DADAFA 100%)' }}>
              {conv.messages.map((msg, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {msg.role === "Soul AI" ? <span>Soul AI</span> : <span>You</span>}
                  </Typography>
                  <p style={{ margin: '4px 0' }}>{msg.text}</p>
                  <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                </Box>
              ))}
              {conv.rating > 0 && (
                <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <Rating value={conv.rating} readOnly size="small" />
                  {conv.feedback && <Typography variant="body2">Feedback: {conv.feedback}</Typography>}
                </Box>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default HistoryPage;







