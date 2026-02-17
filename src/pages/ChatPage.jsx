import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, Grid, IconButton } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import { ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';
import FeedbackModal from '../components/FeedbackModal';

const ChatPage = ({ botData }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(null);

  const handleAsk = (e, customInput) => {
    if (e) e.preventDefault();
    const query = customInput || input;
    if (!query.trim()) return;

    const clean = (str) => str.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(item => clean(item.question) === clean(query));
    
    // Requirement: Set specific time format
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = { role: 'You', text: query, time };
    
    const botMsg = { 
      role: 'Soul AI', 
      // Requirement: Specific default response
      text: foundMatch ? foundMatch.response : "Sorry, Did not understand your query!", 
      time,
      rating: 0,
      feedback: ''
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleFeedbackClick = (index) => {
    setActiveMessageIndex(index);
    setIsFeedbackOpen(true);
  };

  const handleFeedbackSubmit = (text) => {
    const updatedMessages = [...messages];
    updatedMessages[activeMessageIndex].feedback = text;
    setMessages(updatedMessages);
  };

  const handleSave = () => {
    if (messages.length === 0) return;
    const history = JSON.parse(localStorage.getItem('soul_history') || '[]');
    history.push({ 
      id: Date.now(), 
      chat: messages, 
      date: new Date().toLocaleDateString() 
    });
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
          <Box sx={{ textAlign: 'center', mt: 4 }}>
             <Typography variant="h4" sx={{ mb: 4 }}>How Can I Help You Today?</Typography>
             <Avatar sx={{ width: 80, height: 80, mx: 'auto', bgcolor: 'white', mb: 4, boxShadow: 2 }}>
                <TbRobot size={50} color="#3C3C3C" />
             </Avatar>
             <Grid container spacing={2} sx={{ maxWidth: '800px', mx: 'auto' }}>
               {botData.map((item) => (
                 <Grid item xs={12} sm={6} key={item.id}>
                   <Paper 
                    onClick={() => handleAsk(null, item.question)} 
                    sx={{ p: 2, cursor: 'pointer', borderRadius: '12px', '&:hover': { bgcolor: '#f5f5f5' } }}
                   >
                     <Typography fontWeight="bold">{item.question}</Typography>
                     <Typography variant="caption" color="textSecondary">Get immediate AI response</Typography>
                   </Paper>
                 </Grid>
               ))}
             </Grid>
          </Box>
        ) : (
          <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
            {messages.map((msg, i) => (
              <Paper 
                key={i} 
                elevation={0} 
                sx={{ 
                    p: 2, mb: 2, bgcolor: '#D7C7F4', borderRadius: '20px', 
                    position: 'relative', 
                    '&:hover .feedback-icons': { visibility: 'visible', opacity: 1 } 
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ width: 50, height: 50, bgcolor: 'white', border: '1px solid #ddd' }}>
                    {msg.role === 'You' ? 'Y' : <TbRobot color="black" size={30} />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    {/* Requirement: Role in <span> */}
                    <Typography variant="subtitle2" fontWeight="bold">
                        <span>{msg.role}</span>
                    </Typography>

                    {/* Requirement: AI Response in <p> */}
                    <Typography component="p" variant="body1" sx={{ my: 0.5 }}>
                        {msg.text}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="textSecondary">{msg.time}</Typography>
                      
                      {msg.role === 'Soul AI' && (
                        <Box 
                            className="feedback-icons" 
                            sx={{ visibility: 'hidden', opacity: 0, transition: '0.3s', display: 'flex' }}
                        >
                          <IconButton size="small" onClick={() => handleFeedbackClick(i)}>
                            <ThumbUpOutlined fontSize="inherit" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleFeedbackClick(i)}>
                            <ThumbDownOutlined fontSize="inherit" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    {msg.feedback && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
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
      <Box 
        component="form" 
        onSubmit={handleAsk} 
        sx={{ display: 'flex', gap: 2, maxWidth: '900px', mx: 'auto', width: '100%' }}
      >
        <TextField 
            fullWidth 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            // Requirement: Exact Placeholder
            placeholder="Message Bot AI..." 
            sx={{ bgcolor: 'white', borderRadius: '8px' }} 
        />
        {/* Requirement: type="submit" */}
        <Button type="submit" variant="contained" sx={{ bgcolor: '#D7C7F4', color: 'black', px: 4 }}>
            Ask
        </Button>
        {/* Requirement: type="button" */}
        <Button type="button" variant="contained" onClick={handleSave} sx={{ bgcolor: '#D7C7F4', color: 'black', px: 4 }}>
            Save
        </Button>
      </Box>

      <FeedbackModal 
        open={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        onSubmit={handleFeedbackSubmit} 
      />
    </Box>
  );
};

export default ChatPage;