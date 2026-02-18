import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import data from '../api/data.json';
import FeedbackModal from '../components/FeedbackModal';
import ChatBubble from '../components/ChatBubble';

const DEFAULT_RESPONSE = "Sorry, Did not understand your query!";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const endRef = useRef(null);

  // Welcome message – only once
  useEffect(() => {
    if (messages.length === 0) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([{ role: 'Soul AI', text: 'How Can I Help You Today?', time }]);
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { role: 'You', text: userText, time }]);

    const found = data.find(item => 
      item.question.trim().toLowerCase() === userText.toLowerCase().trim()
    );

    const botReply = found ? found.response : DEFAULT_RESPONSE;

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'Soul AI', text: botReply, time }]);
    }, 300);

    setInput('');
  };

  const handleSave = () => {
    if (messages.length < 2) return;
    setModalOpen(true);
  };

  const handleFeedbackSubmit = ({ rating, comment }) => {
    const title = messages.find(m => m.role === 'You')?.text?.slice(0, 40) || 'New Chat';

    const session = {
      id: Date.now(),
      title,
      messages: [...messages],
      feedback: { rating, comment: comment.trim() || '' },
      timestamp: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem('conversations') || '[]');
    localStorage.setItem('conversations', JSON.stringify([session, ...prev]));

    setMessages([]);
    setModalOpen(false);
  };

  const handleThumbs = (id, type) => {
    console.log(`Thumbs ${type} on ${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ height: '100%', py: 4, px: { xs: 2, md: 4 } }}>
      {messages.length <= 1 ? (
        <Box textAlign="center" mt={8}>
          <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 3, bgcolor: '#9747FF' }}>
            <SmartToyIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            How Can I Help You Today?
          </Typography>

          <Grid container spacing={2} justifyContent="center" mt={5}>
            {[
              'Hi, what is the weather',
              'Hi, what is my location',
              'Hi, what is the temperature',
              'Hi, how are you',
            ].map((q, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 },
                  }}
                  onClick={() => setInput(q)}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {q}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    Get immediate AI generated response
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 4 }}>
          <Stack spacing={3}>
            {messages.map((msg, i) => (
              <ChatBubble
                key={i}
                message={{ ...msg, id: i }}
                onFeedback={handleThumbs}
              />
            ))}
            <div ref={endRef} />
          </Stack>
        </Box>
      )}

      <Box component="form" onSubmit={handleAsk}>
        <Stack direction="row" spacing={1.5} alignItems="center">
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
            sx={{ bgcolor: '#9747FF', color: 'white', minWidth: 100 }}
            disabled={!input.trim()}
          >
            Ask
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={handleSave}
            disabled={messages.length < 2}
            sx={{ minWidth: 100, borderColor: '#9747FF', color: '#9747FF' }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </Container>
  );
}