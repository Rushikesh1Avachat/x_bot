import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Grid, Avatar } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import ChatBubble from '../components/ChatBubble';
import FeedbackModal from '../components/FeedbackModal';

const ChatPage = ({ botData = [] }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = (queryText) => {
    const query = typeof queryText === 'string' ? queryText : input;
    if (!query.trim()) return;

    const userMsg = { 
      role: 'You', 
      text: query, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const cleanInput = query.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => 
      item.question.toLowerCase().trim().replace(/\?$/, "") === cleanInput
    );

    const botMsg = { 
      role: 'Soul AI', 
      text: foundMatch ? foundMatch.response : "Sorry, Did not understand your query!", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleSaveToHistory = (feedbackData) => {
    // Requirement: Persistent localStorage using 'soul_history' key
    const history = JSON.parse(localStorage.getItem("soul_history") || "[]");
    history.push({
      id: Date.now(),
      chat: messages, 
      rating: feedbackData.rating,
      feedback: feedbackData.text,
      date: new Date().toLocaleDateString()
    });
    localStorage.setItem("soul_history", JSON.stringify(history));
    setMessages([]); // Logic for 'New Chat' button to start fresh
    setOpenModal(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', height: '100vh', background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 71, 255, 0.2) 100%)' }}>
      <header>
        <Typography variant="h5" sx={{ color: '#9747FF', mb: 2, fontWeight: 'bold' }}>Bot AI</Typography>
      </header>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, px: { md: 10 } }}>
        {messages.length === 0 ? (
          <Box textAlign="center" sx={{ mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>How Can I Help You Today?</Typography>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#D7C7F4', mb: 6 }}><TbRobot size={50} color="black" /></Avatar>
            <Grid container spacing={2}>
              {botData.slice(0, 4).map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper elevation={1} onClick={() => handleAsk(item.question)} sx={{ p: 2, cursor: 'pointer', borderRadius: '10px' }}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.question}</Typography>
                    <Typography variant="body2" color="textSecondary">Get immediate AI generated response</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          messages.map((msg, i) => (
            <ChatBubble key={i} message={msg} onFeedback={(type) => console.log(type)} />
          ))
        )}
        <div ref={bottomRef} />
      </Box>

      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAsk(); }} sx={{ display: 'flex', gap: 2, px: { md: 10 } }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Bot AI..." sx={{ bgcolor: 'white' }} />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Ask</Button>
        <Button type="button" variant="contained" onClick={() => setOpenModal(true)} disabled={messages.length === 0} sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Save</Button>
      </Box>

      <FeedbackModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSaveToHistory} />
    </Box>
  );
};
export default ChatPage