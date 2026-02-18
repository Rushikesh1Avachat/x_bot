import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Rating,
  Stack,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function HistoryPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('conversations');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Sort newest first
      parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setConversations(parsed);
    }
  }, []);

  if (conversations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <SmartToyIcon sx={{ fontSize: 80, color: 'action.disabled', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No conversations yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 3 }, py: 4 }}>
      {/* Page title */}
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3, color: '#1a1a1a' }}>
        Conversation History
      </Typography>

      {/* Today's Chats section */}
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Today's Chats
      </Typography>

      <Stack spacing={3}>
        {conversations.map((conv) => (
          <Paper
            key={conv.id}
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: '#F8F5FF', // light purple from Figma
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(151,71,255,0.18)',
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              {/* Title + timestamp + message count */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#333' }}>
                  {conv.title || 'Untitled Chat'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(conv.timestamp).toLocaleString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: 'numeric',
                    month: 'short',
                  })}
                  {' • '}
                  {conv.messages.length} messages
                </Typography>
              </Box>

              <Divider sx={{ mb: 2, borderColor: '#E0D4FF' }} />

              {/* Message previews – last 2 messages */}
              {conv.messages.slice(-2).map((msg, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: msg.role === 'You' ? '#FF6B6B' : '#9747FF',
                      }}
                    >
                      {msg.role === 'You' ? (
                        <PersonIcon fontSize="small" />
                      ) : (
                        <SmartToyIcon fontSize="small" />
                      )}
                    </Avatar>

                    <Typography variant="subtitle2" fontWeight={600}>
                      {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.6,
                      color: '#444',
                      pl: 6, // indent under avatar
                    }}
                  >
                    {msg.text?.slice(0, 100)}
                    {msg.text?.length > 100 ? '...' : ''}
                  </Typography>
                </Box>
              ))}

              {/* Feedback display */}
              {conv.feedback && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Rating
                    value={conv.feedback.rating}
                    readOnly
                    precision={0.5}
                    size="small"
                    sx={{ color: '#FFB400' }}
                  />
                  {conv.feedback.comment && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      "{conv.feedback.comment.slice(0, 60)}
                      {conv.feedback.comment.length > 60 ? '...' : '"'}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}