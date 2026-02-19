import { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";
import data from "../api/data.json";
import ChatBubble from "../components/ChatBubble";
import FeedbackModal from "../components/FeedbackModal";
import botLogo from "../assets/bot.png";
export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);

  const getBotResponse = (q) => {
    const found = data.find(item => item.question.toLowerCase() === q.toLowerCase());
    return found ? found.response : "As an AI Language Model, I don't have the details";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const botRes = getBotResponse(input);
    setMessages([...messages, { text: input, isBot: false }, { text: botRes, isBot: true }]);
    setInput("");
  };

  const handleSave = () => {
    if (messages.length === 0) return;
    const history = JSON.parse(localStorage.getItem("conversations")) || [];
    history.push({ id: Date.now(), messages, timestamp: new Date().toLocaleString() });
    localStorage.setItem("conversations", JSON.stringify(history));
    setOpenFeedback(true);
  };

  return (
    <Box sx={{ height: "80vh", display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: "10vh" }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'medium' }}>
              How Can I Help You Today?
            </Typography>
         <Box 
  component="img" 
  src={botLogo} 
  alt="Bot Logo"
  sx={{ 
    width: 60, 
    height: 60, 
    borderRadius: '50%', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
    mb: 6 
  }} 
/>
            {/* 2x2 Grid Layout */}
            <Grid container spacing={2} sx={{ maxWidth: 800, mx: 'auto' }}>
              {[
                { q: "Hi, what is the weather", d: "Get immediate AI generated response" },
                { q: "Hi, what is my location", d: "Get immediate AI generated response" },
                { q: "Hi, what is the temperature", d: "Get immediate AI generated response" },
                { q: "Hi, how are you", d: "Get immediate AI generated response" }
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.q}> 
                  <Paper 
                    elevation={0}
                    onClick={() => setInput(item.q)}
                    sx={{ 
                      p: 3, 
                      cursor: 'pointer', 
                      textAlign: 'left',
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                      '&:hover': { bgcolor: '#f5f5f5' } 
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.q}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.d}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg.text} isBot={msg.isBot} />
            ))}
          </Box>
        )}
      </Box>

      {/* Input Area */}
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: 'flex', gap: 2, mt: 2, p: 2, alignItems: 'center' }}
      >
        <TextField 
          fullWidth 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Message Bot AI..." 
          variant="outlined"
          sx={{ bgcolor: 'white' }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ bgcolor: '#D7C7EB', color: 'black', px: 4, '&:hover': { bgcolor: '#c4b5d6' } }}
        >
          Ask
        </Button>
        <Button 
          type="button" 
          variant="contained" 
          onClick={handleSave}
          sx={{ bgcolor: '#D7C7EB', color: 'black', px: 4, '&:hover': { bgcolor: '#c4b5d6' } }}
        >
          Save
        </Button>
      </Box>

      <FeedbackModal 
        open={openFeedback} 
        onClose={() => { setOpenFeedback(false); setMessages([]); }} 
        onSubmit={(f) => {
          const h = JSON.parse(localStorage.getItem("conversations"));
          h[h.length - 1].feedback = f;
          localStorage.setItem("conversations", JSON.stringify(h));
        }} 
      />
    </Box>
  );
}