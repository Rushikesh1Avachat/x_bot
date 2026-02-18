import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,

  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Stack,
} from '@mui/material';

export default function FeedbackView() {
  const [conversations, setConversations] = useState([]);
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('conversations');
    if (saved) {
      const parsed = JSON.parse(saved);
      setConversations(parsed);
    }
  }, []);

  const filtered = conversations.filter(conv => 
    filterRating === 'all' || conv.feedback?.rating === Number(filterRating)
  );

  if (conversations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h6" color="text.secondary">
          No feedback yet. Save some conversations first!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        All Feedback Across Conversations
      </Typography>

      {/* Filter by rating */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Filter by Rating</InputLabel>
        <Select
          value={filterRating}
          label="Filter by Rating"
          onChange={(e) => setFilterRating(e.target.value)}
        >
          <MenuItem value="all">All Ratings</MenuItem>
          <MenuItem value={5}>5 Stars</MenuItem>
          <MenuItem value={4}>4 Stars</MenuItem>
          <MenuItem value={3}>3 Stars</MenuItem>
          <MenuItem value={2}>2 Stars</MenuItem>
          <MenuItem value={1}>1 Star</MenuItem>
        </Select>
      </FormControl>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" align="center">
          No feedback matches the selected rating.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {filtered.map((conv) => (
            <Paper
              key={conv.id}
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: '#F8F5FF',
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {conv.title || 'Conversation'}
              </Typography>

              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {new Date(conv.timestamp).toLocaleString()}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Rating value={conv.feedback.rating} readOnly precision={0.5} size="small" />
                <Typography variant="body2" color="text.primary">
                  {conv.feedback.rating} / 5
                </Typography>
              </Box>

              {conv.feedback.comment && (
                <Typography variant="body2" sx={{ color: '#444' }}>
                  "{conv.feedback.comment}"
                </Typography>
              )}

              {/* Optional: show preview of last message */}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Last message: {conv.messages[conv.messages.length - 1]?.text?.slice(0, 80)}...
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}