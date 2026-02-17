import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Grid, Paper, Avatar } from '@mui/material';
import ChatBubble from '../components/ChatBubble';
import FeedbackModal from '../components/FeedbackModal';
import { TbRobot } from "react-icons/tb";

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

    const userMsg = { role: 'You', text: query, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const cleanInput = query.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => item.question.toLowerCase().trim().replace(/\?$/, "") === cleanInput);

    const botMsg = { 
      role: 'Soul AI', 
      text: foundMatch ? foundMatch.response : "Sorry, Did not understand your query!", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleSaveToHistory = (feedbackData) => {
    const history = JSON.parse(localStorage.getItem("soul_history") || "[]");
    history.push({ id: Date.now(), chat: messages, rating: feedbackData.rating, feedback: feedbackData.text, date: new Date().toLocaleDateString() });
    localStorage.setItem("soul_history", JSON.stringify(history));
    setMessages([]);
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'white' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
        {messages.length === 0 ? (
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', mt: 10 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 500 }}>How Can I Help You Today?</Typography>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#D7C7F4', mb: 8 }}>
               <TbRobot size={50} color="black" />
            </Avatar>
            <Grid container spacing={3}>
              {botData.slice(0, 4).map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper elevation={1} onClick={() => handleAsk(item.question)} sx={{ p: 3, cursor: 'pointer', borderRadius: '10px', '&:hover': { bgcolor: '#F5F5F5' } }}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.question}</Typography>
                    <Typography variant="body2" color="textSecondary">Get instant answers</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} onFeedback={() => {}} />
            ))}
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>

      {/* Input Section - Specific Button Colors from Image */}
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAsk(); }} sx={{ p: 4, display: 'flex', gap: 2 }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Bot AI..." variant="outlined" />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#9747FF', '&:hover': { bgcolor: '#7E36D9' }, px: 4 }}>Ask</Button>
        <Button type="button" variant="outlined" onClick={() => setOpenModal(true)} disabled={messages.length === 0} sx={{ borderColor: '#9747FF', color: '#9747FF', px: 4 }}>Save</Button>
      </Box>

      <FeedbackModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSaveToHistory} />
    </Box>
  );
};

export default ChatPage;
