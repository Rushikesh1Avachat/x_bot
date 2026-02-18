import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Stack, Container, Typography, Grid , Paper } from "@mui/material";
import ChatBubble from "../components/ChatBubble";
import FeedbackModal from "../components/FeedbackModal"; // Ensure this is imported
import mockData from "../api/data.json";

const ChatPage = ({ onSave }) => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  
  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Requirement 3 & 5: Load existing active session if any
  useEffect(() => {
    const activeSession = JSON.parse(localStorage.getItem("active_chat")) || [];
    setChatLog(activeSession);
  }, []);

  const handleAsk = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const found = mockData.find(item => item.question.toLowerCase().trim() === input.toLowerCase().trim());
    
    // REQUIREMENT 1: Exact error message for tests
    const botResponse = found ? found.response : "Sorry, Did not understand your query!";

    const userMsg = { role: "You", text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const botMsg = { role: "Soul AI", text: botResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

    const newLog = [...chatLog, userMsg, botMsg];
    setChatLog(newLog);
    localStorage.setItem("active_chat", JSON.stringify(newLog)); // Temporary persistence
    setInput("");
  };

  const handleSaveClick = () => {
    if (chatLog.length === 0) return;
    
    // Requirement: Show feedback modal for the last bot message before moving to history
    const lastBotMsg = chatLog.filter(m => m.role === "Soul AI").slice(-1)[0];
    setSelectedMessage(lastBotMsg);
    setOpenModal(true);
  };

const handleSubmitFeedback = (feedbackData) => {
  // Retrieve existing history (which should be an array of arrays)
  const existingHistory = JSON.parse(localStorage.getItem("conversations")) || [];
  
  // Create the new session object
  const newSession = {
    id: Date.now(),
    messages: chatLog, // The full array of Q&A for this session
    feedback: feedbackData // Attach feedback to the session
  };

  // Save as a new item in the history list
  localStorage.setItem("conversations", JSON.stringify([newSession, ...existingHistory]));

  // Reset current state
  setChatLog([]);
  localStorage.removeItem("active_chat");
  setOpenModal(false);
};

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '85vh', py: 2 }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {chatLog.length === 0 ? (
          <Box textAlign="center" mt={10}>
            <Typography variant="h4" sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 4 }}>How Can I Help You Today?</Typography>
            <Grid container spacing={2}>
              {mockData.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Paper elevation={1} sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f3f0ff' } }} onClick={() => setInput(item.question)}>
                    <Typography fontWeight="bold">{item.question}</Typography>
                    <Typography variant="caption" color="text.secondary">Get immediate AI generated response</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Stack spacing={2}>
            {chatLog.map((msg, i) => (
              <ChatBubble key={i} message={msg} onFeedback={() => {}} />
            ))}
          </Stack>
        )}
      </Box>

      {/* Requirement 10: Form for submission */}
      <Box component="form" onSubmit={handleAsk} sx={{ display: 'flex', gap: 1 }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
        <Button variant="contained" type="submit" sx={{ bgcolor: '#D7C7F4', color: '#000', '&:hover': { bgcolor: '#af9cf3' } }}>Ask</Button>
        <Button variant="contained" onClick={handleSaveClick} sx={{ bgcolor: '#D7C7F4', color: '#000' }}>Save</Button>
      </Box>

      <FeedbackModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onSubmit={handleSubmitFeedback} 
      />
    </Container>
  );
};

export default ChatPage;