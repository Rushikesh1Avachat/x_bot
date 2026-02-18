import React, { useState } from "react";
import { Box, TextField, Button, Stack, Container, Typography, Grid, Paper } from "@mui/material";
import mockData from "../api/data.json";
import FeedbackModal from "../components/FeedbackModal";

const ChatPage = ({ onSave }) => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Requirement 1, 2, 3, 7, 8: Unified Ask Logic
  const handleAsk = (e) => {
    e.preventDefault(); // Crucial for Requirement 8: Handle form submission
    if (!input.trim()) return;

    // Search logic for Requirements 2 & 3
    const found = mockData.find(
      (item) => item.question.toLowerCase().trim() === input.toLowerCase().trim()
    );

    // Requirement 2: Exact error message
    const botResponse = found 
      ? found.response 
      : "Sorry, Did not understand your query!";

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Update local state to show message in UI
    setChatLog((prev) => [
      ...prev,
      { role: "You", text: input, time },
      { role: "Soul AI", text: botResponse, time },
    ]);
    
    // Requirement 7: Clear input field after typing
    setInput("");
  };

  // Requirement 4 & 5: Unified Save and Persistence Logic
  const handleSaveSession = (feedback) => {
    const session = { 
      id: Date.now(), 
      messages: chatLog, 
      feedback // Subjective feedback and rating
    };

    // Requirement 4: Persistent across refreshes
    const existing = JSON.parse(localStorage.getItem("conversations")) || [];
    localStorage.setItem("conversations", JSON.stringify([session, ...existing])); 

    // Sync with App state if prop exists
    if (onSave) onSave(session);

    // Reset UI for New Chat
    setChatLog([]);
    setOpenModal(false);
  };

  return (
    <Container sx={{ py: 2, height: '85vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {chatLog.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>How Can I Help You Today?</Typography>
            <Grid container spacing={2}>
              {mockData.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Paper elevation={2} sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f3f0ff' } }} onClick={() => setInput(item.question)}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.question}</Typography>
                    <Typography variant="caption">Get immediate AI generated response</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Stack spacing={2}>
            {chatLog.map((msg, i) => (
              <Box key={i} sx={{ p: 2, bgcolor: msg.role === "You" ? '#f0f0f0' : '#D7C7F433', borderRadius: 2 }}>
                {/* Requirement: Use <span> for names */}
                <Typography variant="subtitle2" fontWeight="bold">
                  {msg.role === "Soul AI" ? <span>Soul AI</span> : <span>You</span>}
                </Typography>
                
                {/* Requirement: Use <p> for AI response */}
                <p style={{ margin: '8px 0' }}>{msg.text}</p>
                
                <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Requirement 8: Form for submission */}
      <Box component="form" onSubmit={handleAsk} sx={{ display: 'flex', gap: 1 }}>
        <TextField 
          fullWidth 
          placeholder="Message Bot AI…" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} // Requirement 7
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: '#000' }}>
          Ask
        </Button>
        <Button 
          type="button" 
          variant="outlined" 
          onClick={() => setOpenModal(true)} 
          disabled={chatLog.length === 0}
        >
          Save
        </Button>
      </Box>

      <FeedbackModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSaveSession} />
    </Container>
  );
};

export default ChatPage;