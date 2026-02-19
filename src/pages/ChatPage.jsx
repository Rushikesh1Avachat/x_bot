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
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import mockData from '../api/data.json';
import FeedbackModal from '../components/FeedbackModal';

const DEFAULT_RESPONSE = "Sorry, Did not understand your query!";

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredMsgId, setHoveredMsgId] = useState(null);
  const endRef = useRef(null);

  // Welcome message – only once
  if (messages.length === 0) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([{ id: 'welcome', role: 'Soul AI', text: 'How Can I Help You Today?', time }]);
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = { id: Date.now(), role: 'You', text: userText, time };
    setMessages((prev) => [...prev, userMsg]);

    const found = mockData.find(
      (item) => item.question.trim().toLowerCase() === userText.toLowerCase().trim()
    );

    const botReply = found ? found.response : DEFAULT_RESPONSE;
    const botMsg = { id: Date.now() + 1, role: 'Soul AI', text: botReply, time };

    setMessages((prev) => [...prev, botMsg]);

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
    <Container maxWidth="md" sx={{ height: '100%', py: 4, px: { xs: 2, md: 4 }, bgcolor: '#F9F9FB' }}>
      {messages.length <= 1 ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Avatar sx={{ width: 140, height: 140, mb: 5, bgcolor: '#9747FF', boxShadow: '0 12px 40px rgba(151,71,255,0.3)' }}>
            <SmartToyIcon sx={{ fontSize: 80, color: 'white' }} />
          </Avatar>

          <Typography variant="h4" fontWeight="bold" sx={{ color: '#1a1a1a', mb: 7 }}>
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
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 32px rgba(0,0,0,0.1)' },
                  }}
                  onClick={() => setInput(q)}
                >
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
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
        <Stack spacing={3} sx={{ mb: 4 }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                alignSelf: msg.role === 'You' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                position: 'relative',
              }}
              onMouseEnter={() => msg.role !== 'You' && setHoveredMsgId(msg.id)}
              onMouseLeave={() => setHoveredMsgId(null)}
            >
              <Paper
                sx={{
                  p: 2.5,
                  bgcolor: msg.role === 'You' ? '#e0e0e0' : '#2D2D44',
                  color: msg.role === 'You' ? '#000' : '#fff',
                  borderRadius: msg.role === 'You' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
                  <Avatar sx={{ bgcolor: msg.role === 'You' ? '#FF6B6B' : '#9747FF' }}>
                    {msg.role === 'You' ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                  </Typography>
                  <Typography variant="caption" sx={{ ml: 'auto', color: 'text.secondary' }}>
                    {msg.time}
                  </Typography>
                </Box>

                <p style={{ margin: '6px 0', lineHeight: 1.5 }}>{msg.text}</p>

                {msg.role === 'Soul AI' && hoveredMsgId === msg.id && (
                  <Box sx={{ position: 'absolute', bottom: -30, right: 0, display: 'flex', gap: 1 }}>
                    <IconButton size="small" onClick={() => console.log('Like')}>
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => console.log('Dislike')}>
                      <ThumbDownIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
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
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <Stack direction="row" spacing={1.5}>
          <TextField
            fullWidth
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ bgcolor: '#9747FF' }}>
            Ask
          </Button>
          <Button type="button" variant="outlined" onClick={handleSave} disabled={messages.length < 2}>
            Save
          </Button>
        </Stack>
      </Box>

      <FeedbackModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleFeedbackSubmit} />
    </Container>
  );
}