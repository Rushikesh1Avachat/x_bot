import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, Grid } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import FeedbackModal from '../components/FeedbackModal';

const ChatPage = ({ botData = [] }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = (textOverride) => {
    const query = typeof textOverride === 'string' ? textOverride : input;
    if (!query.trim()) return;

    const userMsg = { 
      role: 'You', 
      text: query, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    // Logical requirement: Match question from static JSON data
    const cleanInput = query.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => 
      item.question.toLowerCase().trim().replace(/\?$/, "") === cleanInput
    );

    const botMsg = { 
      role: 'Soul AI', 
      // Requirement: Default message if question is not present
      text: foundMatch ? foundMatch.response : "Sorry, Did not understand your query!", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  // Requirement: Persistence using localStorage
  const handleSaveToHistory = (feedbackData) => {
    const history = JSON.parse(localStorage.getItem("soul_history") || "[]");
    history.push({
      id: Date.now(),
      chat: messages, 
      rating: feedbackData.rating,
      feedback: feedbackData.text,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("soul_history", JSON.stringify(history));
    setMessages([]); // Clears screen for "New Chat" logic
    setOpenModal(false);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 3, background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 71, 255, 0.2) 100%)' }}>
      
      {/* Requirement: Display Bot AI header with correct title */}
      <header>
        <Typography variant="h5" sx={{ color: '#9747FF', mb: 2, fontWeight: 'bold' }}>
          Bot AI
        </Typography>
      </header>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, px: { md: 10 } }}>
        {messages.length === 0 ? (
          // Landing Page with Suggestion Cards
          <Box textAlign="center" sx={{ mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 500 }}>How Can I Help You Today?</Typography>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#D7C7F4', mb: 6 }}>
               <TbRobot size={50} color="#3C3C3C" />
            </Avatar>
            
            <Grid container spacing={2} justifyContent="center">
              {[
                { q: "Hi, what is the weather", s: "Get immediate AI generated response" },
                { q: "Hi, what is my location", s: "Get immediate AI generated response" },
                { q: "Hi, what is the temperature", s: "Get immediate AI generated response" },
                { q: "Hi, how are you", s: "Get immediate AI generated response" }
              ].map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper 
                    onClick={() => handleAsk(item.q)}
                    sx={{ p: 2, textAlign: 'left', cursor: 'pointer', '&:hover': { bgcolor: '#f0f0f0' }, borderRadius: '10px' }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.q}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.s}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          // Active Chat Messages
          messages.map((msg, i) => (
            <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'rgba(215, 199, 244, 0.1)', borderRadius: '20px', border: '1px solid #E0E0E0' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: msg.role === 'You' ? '#9747FF' : '#D7C7F4' }}>
                  {msg.role === 'You' ? 'Y' : <TbRobot color="#3C3C3C" />}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    <span>{msg.role}</span>
                  </Typography>
                  <Typography component="p" variant="body1" sx={{ my: 0.5 }}>
                    {msg.text}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                </Box>
              </Box>
            </Paper>
          ))
        )}
        <div ref={bottomRef} />
      </Box>

      {/* Input Field and Submission Logic */}
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAsk(); }} sx={{ display: 'flex', gap: 2, px: { md: 10 } }}>
        <TextField 
          fullWidth 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Bot AI..." 
          sx={{ bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Ask</Button>
        <Button type="button" variant="contained" onClick={() => setOpenModal(true)} disabled={messages.length === 0} sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Save</Button>
      </Box>

      <FeedbackModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSaveToHistory} />
    </Box>
  );
};

export default ChatPage;