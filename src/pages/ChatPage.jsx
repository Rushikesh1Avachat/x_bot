import React, { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Grid, Paper, Typography, Avatar } from '@mui/material';
import axios from 'axios';
import { TbRobot } from 'react-icons/tb'; // Using the React Icon we discussed
import ChatBubble from '../components/ChatBubble';
import FeedbackModal from '../components/FeedbackModal';

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);

  // Fetch all 54 questions on mount
  useEffect(() => {
    axios.get('/api/data.json')
      .then(res => setData(res.data))
      .catch(err => console.error("Error loading JSON:", err));
  }, []);

  const handleAsk = (e) => {
    if (e) e.preventDefault(); // Requirement: Handles type="submit"
    if (!input.trim()) return;

    // Normalization: Remove trailing '?' and lowercase for better matching
    const cleanStr = (str) => str.toLowerCase().trim().replace(/\?$/, "");
    const userQuery = cleanStr(input);
    
    const match = data.find(item => cleanStr(item.question) === userQuery);

    const userMsg = { 
      role: 'user', 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const botMsg = { 
      role: 'bot', 
      // Requirement: Returns specific match or standard fallback
      text: match ? match.response : "As an AI Language Model, I don't have the details", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  const saveToHistory = () => {
    if (messages.length === 0) return;
    const history = JSON.parse(localStorage.getItem('soul_history') || '[]');
    history.push({ 
      id: Date.now(), 
      timestamp: new Date().toLocaleString(),
      chat: messages 
    });
    localStorage.setItem('soul_history', JSON.stringify(history));
    setMessages([]);
    alert("Chat Saved to Past Conversations!");
  };

  return (
    <Container maxWidth="md" sx={{ height: '90vh', display: 'flex', flexDirection: 'column', py: 2, fontFamily: 'Ubuntu' }}>
      
      {/* Bot Header Title */}
      <Typography variant="h4" sx={{ color: '#9747FF', mb: 2, fontWeight: 'bold' }}>Bot AI</Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, px: 1 }}>
        {messages.length === 0 ? (
          <Box textAlign="center" mt={5}>
            <Typography variant="h5" fontWeight="bold">How Can I Help You Today?</Typography>
            
            {/* Unified Bot Icon */}
            <Avatar sx={{ width: 60, height: 60, mx: 'auto', my: 3, bgcolor: '#D7C7F4' }}>
              <TbRobot size={40} color="#3C3C3C" />
            </Avatar>

            <Grid container spacing={2}>
              {/* Suggestion Chips: First 4 questions from JSON */}
              {data.slice(0, 4).map(item => (
                <Grid item xs={6} key={item.id}>
                  <Paper 
                    elevation={1}
                    sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: '#F0F0F0' }, borderRadius: 2 }} 
                    onClick={() => setInput(item.question)}
                  >
                    <Typography fontWeight="bold" variant="body2">{item.question}</Typography>
                    <Typography variant="caption" color="textSecondary">Get instant answers</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          messages.map((m, i) => (
            <ChatBubble 
              key={i} 
              message={m} 
              onOpenFeedback={() => setOpenFeedback(true)} 
            />
          ))
        )}
      </Box>

      {/* Input Form Area */}
      <Box component="form" onSubmit={handleAsk} sx={{ display: 'flex', gap: 2, pb: 2 }}>
        <TextField 
          fullWidth 
          placeholder="Message Bot AI..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          sx={{ bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#9747FF', '&:hover': { bgcolor: '#7B39D1' } }}>
          Ask
        </Button>
        <Button type="button" variant="outlined" color="secondary" onClick={saveToHistory}>
          Save
        </Button>
      </Box>

      {/* Feedback Dialog */}
      <FeedbackModal 
        open={openFeedback} 
        onClose={() => setOpenFeedback(false)} 
        onSubmit={(feedback) => {
          console.log("User Feedback:", feedback);
          alert("Thank you for your feedback!");
        }}
      />
    </Container>
  );
};

export default ChatPage;