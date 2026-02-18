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
import PersonIcon from '@mui/icons-material/Person';
import data from '../api/data.json';
import FeedbackModal from '../components/FeedbackModal';

const DEFAULT_RESPONSE = "Sorry, Did not understand your query!";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  // Welcome message on mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'Soul AI',
          text: 'How Can I Help You Today?',
        },
      ]);
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { role: 'You', text: userText, time },
    ]);

    // Exact match (trim + lowercase)
    const found = data.find(
      (item) => item.question.trim().toLowerCase() === userText.toLowerCase().trim()
    );

    const botText = found ? found.response : DEFAULT_RESPONSE;

    setMessages((prev) => [
      ...prev,
      { role: 'Soul AI', text: botText, time },
    ]);

    setInput('');
  };

  const handleSave = () => {
    if (messages.length < 2) return;
    setModalOpen(true);
  };

  const handleFeedbackSubmit = ({ rating, comment }) => {
    const firstUser = messages.find((m) => m.role === 'You')?.text || '';
    const title = firstUser.slice(0, 40) + (firstUser.length > 40 ? '...' : '') || 'New Chat';

    const session = {
      id: Date.now(),
      title,
      messages: [...messages],
      feedback: { rating, comment: comment.trim() || '' },
      timestamp: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem('conversations') || '[]');
    localStorage.setItem('conversations', JSON.stringify([session, ...prev]));

    // Reset chat (New Chat effect)
    setMessages([]);
    setModalOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 3 }}>
      {/* Welcome + suggestions */}
      {messages.length <= 1 ? (
        <Box textAlign="center" mt={6}>
          <Avatar
            sx={{ width: 100, height: 100, mx: 'auto', mb: 3, bgcolor: '#9747FF' }}
          >
            <SmartToyIcon fontSize="large" />
          </Avatar>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            How Can I Help You Today?
          </Typography>

          <Grid container spacing={2} justifyContent="center" mt={4}>
            {[
              "Hi, what is the weather",
              "Hi, what is my location",
              "Hi, what is the temperature",
              "Hi, how are you",
            ].map((q, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    cursor: 'pointer',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                  }}
                  onClick={() => setInput(q)}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {q}
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
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 3 }}>
          <Stack spacing={2.5}>
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: msg.role === 'You' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%',
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: msg.role === 'You' ? '#f0f0f0' : '#D7C7F433',
                    borderRadius:
                      msg.role === 'You' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                  </Typography>

                  {msg.role === 'Soul AI' ? (
                    <p style={{ margin: '6px 0 8px 0', lineHeight: 1.5 }}>
                      {msg.text}
                    </p>
                  ) : (
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {msg.text}
                    </Typography>
                  )}

                  <Typography variant="caption" color="text.secondary">
                    {msg.time}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={scrollRef} />
          </Stack>
        </Box>
      )}

      {/* Input form */}
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
            sx={{ bgcolor: '#D7C7F4', color: '#000', minWidth: 100 }}
            disabled={!input.trim()}
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
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </Container>
  );
}