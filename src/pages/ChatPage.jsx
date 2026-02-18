// src/pages/ChatPage.jsx
import { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Grid, Container, Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import mockData from '../api/data.json';
import FeedbackModal from '../components/FeedbackModal';

const DEFAULT_RESPONSE = "Sorry, Did not understand your query!";

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. Show welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: "Soul AI", 
        text: "How Can I Help You Today?" 
      }]);
    }
  }, []);

  // 9 + 10. Handle typing & form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();

    // Add user message
    setMessages(prev => [...prev, { role: "You", text: userMessage }]);

    // 2 + 3. Find response (exact match after trim + lowercase)
    const match = mockData.find(item => 
      item.question.trim().toLowerCase() === userMessage.toLowerCase().trim()
    );

    const botReply = match ? match.response : DEFAULT_RESPONSE;

    // Add bot reply
    setMessages(prev => [...prev, { role: "Soul AI", text: botReply }]);

    setInput("");
  };

  const handleSave = () => {
    if (messages.length < 2) return;
    setShowModal(true);
  };

  const handleFeedback = ({ rating, comment }) => {
    // 5. Save conversation + feedback
    const conversation = {
      id: Date.now(),
      title: messages[1]?.text?.slice(0, 40) || "New Chat", // first user message
      messages: [...messages],
      feedback: { rating, comment: comment.trim() || "" },
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("conversations") || "[]");
    localStorage.setItem("conversations", JSON.stringify([conversation, ...existing]));

    // Clear current chat → acts as "New Chat"
    setMessages([]);
    setShowModal(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* 8. Header – must contain "Bot AI" */}
      <Typography variant="h4" gutterBottom align="center">
        Bot AI
      </Typography>

      {/* Welcome / Suggestions */}
      {messages.length <= 1 ? (
        <Box textAlign="center" mt={6}>
          <Typography variant="h5" gutterBottom>
            How Can I Help You Today?
          </Typography>

          <Grid container spacing={2} justifyContent="center" mt={4}>
            {mockData.slice(0, 4).map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper
                  elevation={2}
                  sx={{ p: 3, cursor: 'pointer' }}
                  onClick={() => setInput(item.question)}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.question}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Get immediate AI generated response
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Stack spacing={2} sx={{ mb: 4 }}>
          {messages.map((msg, i) => (
            <Paper
              key={i}
              sx={{
                p: 2,
                alignSelf: msg.role === 'You' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                bgcolor: msg.role === 'You' ? '#e3f2fd' : '#f3e5f5',
                borderRadius: msg.role === 'You' 
                  ? '20px 20px 0 20px' 
                  : '20px 20px 20px 0',
              }}
            >
              <Typography variant="subtitle2" fontWeight="bold">
                {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
              </Typography>

              {msg.role === 'Soul AI' ? (
                <p style={{ margin: '8px 0', lineHeight: 1.5 }}>
                  {msg.text}
                </p>
              ) : (
                <Typography>{msg.text}</Typography>
              )}
            </Paper>
          ))}
        </Stack>
      )}

      {/* 9 + 10. Input form */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ minWidth: 100 }}
          >
            Ask
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={handleSave}
            disabled={messages.length < 2}
            sx={{ minWidth: 100 }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      <FeedbackModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFeedback}
      />
    </Container>
  );
}