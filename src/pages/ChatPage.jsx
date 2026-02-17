import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, Grid, IconButton } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import { ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material'; // Icons for rating
import FeedbackModal from '../components/FeedbackModal'; // Import your modal component

const ChatPage = ({ botData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  // State for Feedback Modal
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(null);

  const handleAsk = (e, customInput) => {
    if (e) e.preventDefault();
    const query = customInput || input;
    if (!query.trim()) return;

    const clean = (str) => str.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => clean(item.question) === clean(query));
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = { role: 'You', text: query, time };
    const botMsg = { 
      role: 'Soul AI', 
      text: foundMatch ? foundMatch.response : "As an AI Language Model, I don't have the details", 
      time,
      rating: 0,      // Initialize rating
      feedback: ''    // Initialize feedback text
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  // Function to handle opening the modal
  const handleFeedbackClick = (index) => {
    setActiveMessageIndex(index);
    setIsFeedbackOpen(true);
  };

  // Function to save the feedback into the message state
  const handleFeedbackSubmit = (text) => {
    const updatedMessages = [...messages];
    updatedMessages[activeMessageIndex].feedback = text;
    // You can also set a default rating here if Liked vs Disliked
    setMessages(updatedMessages);
  };

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem('soul_history') || '[]');
    history.push({ id: Date.now(), chat: messages, date: new Date().toLocaleDateString() });
    localStorage.setItem('soul_history', JSON.stringify(history));
    alert("Conversation saved!");
  };

  return (
    <Box sx={{ 
      height: '90vh', display: 'flex', flexDirection: 'column', p: 3, 
      background: 'linear-gradient(180deg, rgba(215, 199, 244, 0.2) 0%, rgba(151, 71, 255, 0.2) 100%)' 
    }}>
      <Typography variant="h4" sx={{ color: '#9747FF', mb: 2, fontWeight: 'bold' }}>Bot AI</Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, px: 1 }}>
        {messages.length === 0 ? (
          /* Landing View Code ... (Omitted for brevity, keep your existing Grid here) */
          <Box sx={{ textAlign: 'center', mt: 4 }}>
             <Typography variant="h4" sx={{ mb: 4 }}>How Can I Help You Today?</Typography>
             <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'white', mb: 4 }}><TbRobot size={50} color="#3C3C3C" /></Avatar>
             <Grid container spacing={2}>
               {botData.map((item) => (
                 <Grid item xs={6} key={item.id}>
                   <Paper onClick={() => handleAsk(null, item.question)} sx={{ p: 2, cursor: 'pointer', borderRadius: '12px', border: '1px solid #E0E0E0' }}>
                     <Typography fontWeight="bold">{item.question}</Typography>
                   </Paper>
                 </Grid>
               ))}
             </Grid>
          </Box>
        ) : (
          /* Chat View */
          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            {messages.map((msg, i) => (
              <Paper key={i} elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'white', borderRadius: '15px', border: '1px solid #E0E0E0', position: 'relative', '&:hover .feedback-icons': { opacity: 1 } }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ bgcolor: msg.role === 'You' ? '#9747FF' : '#D7C7F4' }}>
                    {msg.role === 'You' ? 'Y' : <TbRobot color="black" />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">{msg.role}</Typography>
                    <Typography variant="body1" sx={{ my: 0.5 }}>{msg.text}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                      
                      {/* Rating Icons for Bot Only */}
                      {msg.role === 'Soul AI' && (
                        <Box className="feedback-icons" sx={{ display: 'flex', opacity: 0.5, transition: '0.3s' }}>
                          <IconButton size="small" onClick={() => handleFeedbackClick(i)}>
                            <ThumbUpOutlined fontSize="inherit" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleFeedbackClick(i)}>
                            <ThumbDownOutlined fontSize="inherit" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    {/* Show saved feedback if it exists */}
                    {msg.feedback && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic', color: '#555' }}>
                        <strong>Feedback:</strong> {msg.feedback}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      {/* Input Form */}
      <Box component="form" onSubmit={handleAsk} sx={{ display: 'flex', gap: 2, maxWidth: '900px', mx: 'auto', width: '100%' }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question here..." sx={{ bgcolor: 'white', borderRadius: '8px' }} />
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black', px: 4 }}>Ask</Button>
        <Button variant="contained" onClick={handleSave} sx={{ bgcolor: '#D7C7F4', color: 'black', px: 4 }}>Save</Button>
      </Box>

      {/* The same to same Modal */}
      <FeedbackModal 
        open={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        onSubmit={handleFeedbackSubmit} 
      />
    </Box>
  );
};

export default ChatPage;