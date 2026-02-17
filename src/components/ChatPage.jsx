import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, IconButton } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import { MdThumbUpOffAlt, MdThumbDownOffAlt } from 'react-icons/md'; // Icons for feedback
import FeedbackModal from './FeedbackModal'; // Import your new modal

const ChatPage = ({ botData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(null);

  const handleAsk = (e) => {
    e.preventDefault(); 
    if (!input.trim()) return;

    const clean = (str) => str.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => clean(item.question) === clean(input));

    const userMsg = { 
      role: 'You', 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    const botMsg = { 
      role: 'Soul AI', 
      // Requirement: Show default message if not present in JSON
      text: foundMatch ? foundMatch.response : "As an AI Language Model, I don't have the details", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      feedback: null // Store feedback per message
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  const handleFeedbackClick = (index) => {
    setActiveMessageIndex(index);
    setOpenFeedback(true);
  };

  const handleFeedbackSubmit = (text) => {
    const updatedMessages = [...messages];
    updatedMessages[activeMessageIndex].feedback = text;
    setMessages(updatedMessages);
    // Requirement: Persistent storage for feedback could be added here
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
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: '#D7C7F4', border: '1px solid #D9D9D9' }}>
               <TbRobot size={50} color="#3C3C3C" />
            </Avatar>
          </Box>
        ) : (
          messages.map((msg, i) => (
            <Paper 
              key={i} 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 2, 
                bgcolor: msg.role === 'You' ? '#FFFFFF' : '#AF9FCD33', 
                borderRadius: '20px',
                position: 'relative',
                '&:hover .feedback-icons': { opacity: 1 } // Show icons on hover
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
                    
                    {/* Feedback triggers */}
                    {msg.role === 'Soul AI' && (
                      <Box className="feedback-icons" sx={{ opacity: 0, transition: '0.3s' }}>
                        <IconButton size="small"><MdThumbUpOffAlt fontSize="small" /></IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleFeedbackClick(i)}
                        >
                          <MdThumbDownOffAlt fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                  {msg.feedback && (
                    <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: '#555' }}>
                      <strong>Feedback:</strong> {msg.feedback}
                    </Typography>
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
          fullWidth 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..." 
          sx={{ bgcolor: 'white' }}
        />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black', '&:hover': { bgcolor: '#9747FF' } }}>Ask</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#D7C7F4', color: 'black' }}>Save</Button>
      </Box>

      {/* Modal Integration */}
      <FeedbackModal 
        open={openFeedback} 
        onClose={() => setOpenFeedback(false)} 
        onSubmit={handleFeedbackSubmit}
      />
    </Box>
  );
};

export default ChatPage;