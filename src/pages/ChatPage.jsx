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
import ChatBubble from '../components/ChatBubble';

const DEFAULT_RESPONSE = "Sorry, Did not understand your query!";

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll when number of messages changes
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog.length]);

useEffect(() => {
  if (chatLog.length === 0) {
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setChatLog([
      {
        role: 'Soul AI',
        text: 'How Can I Help You Today?',
        time,
      },
    ]);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // ← suppression is safe here

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    setChatLog((prev) => [...prev, { role: 'You', text: userText, time }]);

    // Find exact match (case-insensitive + trimmed)
    const found = mockData.find(
      (item) => item.question.trim().toLowerCase() === userText.toLowerCase().trim()
    );

    const botResponse = found ? found.response : DEFAULT_RESPONSE;

    // Add bot message (small delay for realism)
    setTimeout(() => {
      setChatLog((prev) => [...prev, { role: 'Soul AI', text: botResponse, time }]);
    }, 400);

    setInput('');
  };

  const handleSave = () => {
    if (chatLog.length < 2) return;
    setModalOpen(true);
  };

  const handleFeedbackSubmit = ({ rating, comment }) => {
    const firstUserMsg = chatLog.find((m) => m.role === 'You')?.text || '';
    const title = firstUserMsg.slice(0, 40) || 'New conversation';

    const session = {
      id: Date.now(),
      title,
      messages: [...chatLog],
      feedback: { rating, comment: comment.trim() || '(no comment)' },
      timestamp: new Date().toISOString(),
    };

    const previous = JSON.parse(localStorage.getItem('conversations') || '[]');
    localStorage.setItem('conversations', JSON.stringify([session, ...previous]));

    // Reset chat after save
    setChatLog([]);
    setModalOpen(false);
  };

  const handleThumbsFeedback = (msgId, type) => {
    console.log(`Feedback: ${type} on message ${msgId}`);
    // Optional: save thumbs-up/down per message here
  };

  return (
    <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 2 }}>
      {/* Messages / Welcome area */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 3 }}>
        {chatLog.length <= 1 ? (
          <Box textAlign="center" mt={8}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 4,
                bgcolor: '#9747FF',
              }}
            >
              <SmartToyIcon fontSize="large" />
            </Avatar>

            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#333' }}>
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
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Get immediate AI generated response
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Stack spacing={3}>
            {chatLog.map((msg, index) => (
              <ChatBubble
                key={index}
                message={{ ...msg, id: index }} // ← pass id so thumbs work
                onFeedback={handleThumbsFeedback}
              />
            ))}
            <div ref={scrollRef} />
          </Stack>
        )}
      </Box>

      {/* Input + buttons */}
      <Box component="form" onSubmit={handleAsk}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TextField
            fullWidth
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            size="medium"
          />

          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              bgcolor: '#9747FF',
              color: 'white',
              minWidth: 100,
              py: 1.5,
            }}
            disabled={!input.trim()}
          >
            Ask
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={handleSave}
            disabled={chatLog.length === 0}
            sx={{
              minWidth: 100,
              py: 1.5,
              borderColor: '#9747FF',
              color: '#9747FF',
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      {/* Feedback Modal */}
      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFeedbackSubmit} // ← now used!
      />
    </Container>
  );
}