import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import { TbRobot } from 'react-icons/tb'; // Import React Icon

const ChatPage = ({ botData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleAsk = (e) => {
    e.preventDefault(); 
    if (!input.trim()) return;

    // Normalization logic to match JSON questions
    const clean = (str) => str.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => clean(item.question) === clean(input));

    const userMsg = { 
      role: 'You', 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const botMsg = { 
      role: 'Soul AI', 
      // Fallback message if no match found
      text: foundMatch ? foundMatch.response : "As an AI Language Model, I don't have the details", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem('soul_history') || '[]');
    history.push({ id: Date.now(), chat: messages, date: new Date().toLocaleDateString() });
    localStorage.setItem('soul_history', JSON.stringify(history));
    alert("Conversation saved!");
  };

  return (
    <Box sx={{ height: '85vh', display: 'flex', flexDirection: 'column', p: 3, fontFamily: 'Ubuntu' }}>
      <Typography variant="h4" sx={{ color: '#9747FF', mb: 4, fontWeight: 'bold' }}>Bot AI</Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.length === 0 ? (
          <Box textAlign="center" mt={10}>
            <Typography variant="h5" sx={{ mb: 2 }}>How Can I Help You Today?</Typography>
            {/* Replaced image with React Icon in an Avatar */}
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#D7C7F4', border: '1px solid #D9D9D9' }}>
               <TbRobot size={50} color="#3C3C3C" />
            </Avatar>
          </Box>
        ) : (
          messages.map((msg, i) => (
            <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: msg.role === 'You' ? '#FFFFFF' : '#AF9FCD33', borderRadius: '20px' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar sx={{ bgcolor: msg.role === 'You' ? '#9747FF' : '#D7C7F4' }}>
                  {msg.role === 'You' ? 'Y' : <TbRobot />}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">{msg.role}</Typography>
                  <Typography variant="body1">{msg.text}</Typography>
                  <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Box>

      <Box component="form" onSubmit={handleAsk} sx={{ display: 'flex', gap: 2 }}>
        <TextField 
          fullWidth 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..." 
          sx={{ bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black', '&:hover': { bgcolor: '#9747FF' } }}>Ask</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Save</Button>
      </Box>
    </Box>
  );
};

export default ChatPage;