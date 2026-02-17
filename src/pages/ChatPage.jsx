import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton, Grid, Container } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import { MdThumbUpOffAlt, MdThumbDownOffAlt } from 'react-icons/md';
import FeedbackModal from "../components/FeedbackModal"
const ChatPage = ({ botData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [activeMsgIndex, setActiveMsgIndex] = useState(null);

  // Logic to handle question matching
  const getBotResponse = (userInput) => {
    const clean = (str) => str.toLowerCase().trim().replace(/[?]$/, "");
    const match = botData.find(item => clean(item.question) === clean(userInput));
    return match ? match.response : "As an AI Language Model, I don't have the details";
  };

  const handleAsk = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { 
      role: 'You', 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const botMsg = { 
      role: 'Soul AI', 
      text: getBotResponse(input), 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: '' 
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  // Logic for LocalStorage persistence
  const handleSaveChat = () => {
    if (messages.length === 0) return;
    const history = JSON.parse(localStorage.getItem('soul_history') || '[]');
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      chat: messages
    };
    localStorage.setItem('soul_history', JSON.stringify([...history, newEntry]));
    alert("Conversation saved to Past Conversations!");
  };

  return (
    <Container maxWidth="lg" sx={{ height: '90vh', display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography variant="h4" sx={{ color: '#9747FF', mb: 4, fontWeight: 'bold', fontFamily: 'Ubuntu' }}>Bot AI</Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.length === 0 ? (
          <Box textAlign="center" mt={10}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>How Can I Help You Today?</Typography>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#D7C7F4', mb: 4 }}>
               <TbRobot size={50} color="#3C3C3C" />
            </Avatar>
            <Grid container spacing={2}>
              {/* Suggestion Cards */}
              {["Hi, how are you", "What is a Promise in JavaScript?"].map((q, idx) => (
                <Grid item xs={6} key={idx}>
                  <Paper 
                    sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: '#f0f0f0' } }} 
                    onClick={() => { setInput(q); }}
                  >
                    <Typography fontWeight="bold">{q}</Typography>
                    <Typography variant="caption" color="textSecondary">Get instant answers</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          messages.map((msg, i) => (
            <Paper 
              key={i} 
              elevation={0} 
              sx={{ 
                p: 2, mb: 2, 
                bgcolor: msg.role === 'You' ? '#FFFFFF' : '#AF9FCD33', 
                borderRadius: '20px',
                border: '1px solid #E0E0E0',
                '&:hover .actions': { opacity: 1 }
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: msg.role === 'You' ? '#9747FF' : '#D7C7F4' }}>
                  {msg.role === 'You' ? 'Y' : <TbRobot />}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight="bold">{msg.role}</Typography>
                  <Typography variant="body1">{msg.text}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                    {msg.role === 'Soul AI' && (
                      <Box className="actions" sx={{ opacity: 0, transition: '0.2s' }}>
                        <IconButton size="small"><MdThumbUpOffAlt fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={() => { setActiveMsgIndex(i); setOpenFeedback(true); }}>
                          <MdThumbDownOffAlt fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                  {msg.feedback && (
                    <Typography variant="body2" sx={{ mt: 1 }}><strong>Feedback:</strong> {msg.feedback}</Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Box>

      {/* Input Area */}
      <Box component="form" onSubmit={handleAsk} sx={{ display: 'flex', gap: 2 }}>
        <TextField 
          fullWidth value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..." sx={{ bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black', px: 4 }}>Ask</Button>
        <Button variant="contained" onClick={handleSaveChat} sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Save</Button>
      </Box>

      <FeedbackModal 
        open={openFeedback} 
        onClose={() => setOpenFeedback(false)} 
        onSubmit={(text) => {
          const updated = [...messages];
          updated[activeMsgIndex].feedback = text;
          setMessages(updated);
        }}
      />
    </Container>
  );
};

export default ChatPage;