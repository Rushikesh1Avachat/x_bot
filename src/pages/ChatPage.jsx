import React, { useState} from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
} from "@mui/material";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ChatBubble from "../components/ChatBubble";
import dataJSON from "../api/data.json";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const getBotResponse = (question) => {
    const found = dataJSON.find(
      (item) => item.question.toLowerCase().trim() === question.toLowerCase().trim()
    );
    return found ? found.response : "Sorry, Did not understand your query!";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Using Date.now() as a simple unique ID for feedback tracking
    const userMessage = { id: Date.now(), role: "You", text: input, time };
    const botMessage = { id: Date.now() + 1, role: "Soul AI", text: getBotResponse(input), time };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput(""); 
  };

  // ADDED: Simple handler to satisfy the prop requirement
  const handleFeedback = (id, type) => {
    console.log(`Feedback for message ${id}: ${type}`);
    // You can extend this to update message state if needed
  };

  const handleSaveClick = () => {
    if (messages.length > 0) setOpenModal(true);
  };

  const handleFinalSave = () => {
    const previous = JSON.parse(localStorage.getItem("conversations")) || [];
    const newConversation = {
      id: Date.now(),
      messages: messages,
      rating: rating,
      feedback: feedbackText,
    };
    localStorage.setItem("conversations", JSON.stringify([newConversation, ...previous]));
    
    setMessages([]);
    setRating(0);
    setFeedbackText("");
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '90vh', bgcolor: '#F9F9FF' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: { xs: 2, md: 4 } }}>
        {messages.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h4" sx={{ fontFamily: 'Ubuntu', fontWeight: 'bold', mb: 1 }}>
              How Can I Help You Today?
            </Typography>
            <Box component="img" src="/bot-logo.png" sx={{ width: 80, mb: 4, borderRadius: '50%', boxShadow: 3 }} />
            <Grid container spacing={2}>
              {dataJSON.slice(0, 4).map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper 
                    elevation={0} 
                    sx={{ p: 3, cursor: 'pointer', borderRadius: '12px', border: '1px solid #E0E0E0', '&:hover': { bgcolor: '#F0EFFF' } }}
                    onClick={() => setInput(item.question)}
                  >
                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.question}</Typography>
                    <Typography variant="body2" color="text.secondary">Get immediate AI response</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Stack spacing={2}>
            {messages.map((msg, i) => (
              <ChatBubble 
                key={i} 
                message={msg} 
                onFeedback={handleFeedback} // FIXED: Prop passed here
              />
            ))}
          </Stack>
        )}
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, borderTop: '1px solid #EEE' }}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Message Bot AI…" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: '#000' }}>Ask</Button>
          <Button variant="contained" onClick={handleSaveClick} sx={{ bgcolor: '#D7C7F4', color: '#000' }}>Save</Button>
        </Stack>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightbulbOutlinedIcon /> Provide Additional Feedback
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Rating size="large" value={rating} onChange={(e, val) => setRating(val)} sx={{ mb: 3 }} />
          <TextField fullWidth multiline rows={4} placeholder="Write feedback..." value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleFinalSave}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatPage;


