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
import mockData from '../api/data.json';
import FeedbackModal from '../components/FeedbackModal';

const DEFAULT_RESPONSE = "Sorry, Did not understand your query!";

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const endRef = useRef(null);

  // Welcome message – run only if chat is empty (no useEffect needed)
  if (messages.length === 0) {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setMessages([
      {
        role: 'Soul AI',
        text: 'How Can I Help You Today?',
        time,
      },
    ]);
  }

  // Auto-scroll – this one is fine as-is (or add [messages.length] if you want)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { role: 'You', text: userText, time }]);

    const found = mockData.find(
      (item) => item.question.trim().toLowerCase() === userText.toLowerCase().trim()
    );

    const botReply = found ? found.response : DEFAULT_RESPONSE;

    setMessages((prev) => [...prev, { role: 'Soul AI', text: botReply, time }]);

    setInput('');
  };

  const handleSave = () => {
    if (messages.length < 2) return;
    setModalOpen(true);
  };

  const handleFeedbackSubmit = ({ rating, comment }) => {
    const title = messages.find((m) => m.role === 'You')?.text?.slice(0, 40) || 'New Chat';

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

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100%',
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f9f9fb',
      }}
    >
      {messages.length <= 1 ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 140,
              height: 140,
              mb: 5,
              bgcolor: '#9747FF',
              boxShadow: '0 12px 40px rgba(151,71,255,0.3)',
            }}
          >
            <SmartToyIcon sx={{ fontSize: 80, color: 'white' }} />
          </Avatar>

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: '#1a1a1a',
              mb: 7,
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              lineHeight: 1.2,
            }}
          >
            How Can I Help You Today?
          </Typography>

          <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 900 }}>
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
                    p: 3.5,
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                    },
                  }}
                  onClick={() => setInput(q)}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{ mb: 1, color: '#1a1a1a' }}
                  >
                    {q}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                    Get immediate AI generated response
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Stack spacing={3} sx={{ mb: 4 }}>
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
                  p: 2.5,
                  bgcolor: msg.role === 'You' ? '#f0f0f0' : '#D7C7F433',
                  borderRadius: msg.role === 'You' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                  boxShadow: '0 3px 12px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 0.8 }}>
                  {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                </Typography>

                <p style={{ margin: '6px 0 10px 0', lineHeight: 1.5 }}>
                  {msg.text}
                </p>

                <Typography variant="caption" color="text.secondary">
                  {msg.time}
                </Typography>
              </Paper>
            </Box>
          ))}
          <div ref={endRef} />
        </Stack>
      )}

      <Box
        component="form"
        onSubmit={handleAsk}
        sx={{
          position: 'sticky',
          bottom: 0,
          bgcolor: 'white',
          p: 2,
          borderTop: '1px solid #eee',
          zIndex: 10,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            fullWidth
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#fafafa',
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              bgcolor: '#9747FF',
              minWidth: 120,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { bgcolor: '#7C3AED' },
            }}
            disabled={!input.trim()}
          >
            Ask
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={handleSave}
            disabled={messages.length < 2}
            sx={{
              minWidth: 120,
              py: 1.5,
              borderRadius: 3,
              borderColor: '#9747FF',
              color: '#9747FF',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#7C3AED',
                bgcolor: '#F8F5FF',
              },
            }}
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