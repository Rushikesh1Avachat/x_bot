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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import mockData from '../api/data.json';
import FeedbackModal from '../components/FeedbackModal';  // ← import the separate component

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Find exact match (case-insensitive)
    const found = mockData.find(
      (item) => item.question.toLowerCase().trim() === userText.toLowerCase().trim()
    );

    const botResponse = found
      ? found.response
      : "Sorry, Did not understand your query!";

    setChatLog((prev) => [
      ...prev,
      { role: "You", text: userText, time },
      { role: "Soul AI", text: botResponse, time },
    ]);

    setInput("");
  };

  const handleSave = () => {
    if (chatLog.length === 0) return;
    setModalOpen(true);
  };

  const handleFeedbackSubmit = ({ rating, comment }) => {
    // Save chat + feedback to localStorage
    const session = {
      id: Date.now(),
      title: chatLog[0]?.text?.slice(0, 40) || "New conversation",
      messages: [...chatLog],
      feedback: { rating, comment: comment.trim() || "(no comment)" },
      timestamp: new Date().toISOString(),
    };

    const previous = JSON.parse(localStorage.getItem("conversations") || "[]");
    localStorage.setItem("conversations", JSON.stringify([session, ...previous]));

    // Reset chat after save
    setChatLog([]);
    setModalOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column', py: 2 }}>
      {/* Messages / Welcome area */}
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 3 }}>
        {chatLog.length === 0 ? (
          <Box textAlign="center" mt={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              How Can I Help You Today?
            </Typography>

            <Grid container spacing={2} justifyContent="center" mt={4}>
              {mockData.slice(0, 8).map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2.5,
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                    }}
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
          <Stack spacing={2.5}>
            {chatLog.map((msg, index) => (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  maxWidth: '82%',
                  alignSelf: msg.role === 'You' ? 'flex-end' : 'flex-start',
                  bgcolor: msg.role === 'You' ? '#f0f0f0' : '#D7C7F433',
                  borderRadius:
                    msg.role === 'You' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                </Typography>

                <p style={{ margin: '6px 0 8px 0', lineHeight: 1.5 }}>
                  {msg.text}
                </p>

                <Typography variant="caption" color="text.secondary">
                  {msg.time}
                </Typography>
              </Paper>
            ))}
            <div ref={scrollRef} />
          </Stack>
        )}
      </Box>

      {/* Input form */}
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
            sx={{ bgcolor: '#D7C7F4', color: '#000', minWidth: 100 }}
            disabled={!input.trim()}
          >
            Ask
          </Button>

          <Button
            variant="outlined"
            onClick={handleSave}
            disabled={chatLog.length === 0}
            sx={{ minWidth: 100 }}
          >
            Save
          </Button>
        </Stack>
      </Box>

      {/* Feedback Modal */}
      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </Container>
  );
};

export default ChatPage;