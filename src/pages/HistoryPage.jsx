import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  ListItem,
  Avatar,
  Rating,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function HistoryPage() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('conversations');
    if (saved) {
      const parsed = JSON.parse(saved);
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
    <Box sx={{ maxWidth: 900, mx: 'auto', px: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Conversation History
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
        Today's Chats
      </Typography>

      {conversations.map((conv) => (
        <Paper
          key={conv.id}
          elevation={3}
          sx={{
            mb: 2,
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: '#F8F5FF',
          }}
        >
          <ListItem sx={{ py: 2.5, px: 3, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Box sx={{ width: '100%', mb: 1.5 }}>
              {conv.messages.slice(-2).map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 1,
                    p: 2,
                    borderRadius: msg.role === 'You' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    bgcolor: msg.role === 'You' ? '#FFFFFF' : '#EDE7FF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: msg.role === 'You' ? '#FF6B6B' : '#9747FF' }}>
                      {msg.role === 'You' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {msg.text?.slice(0, 90)}{msg.text?.length > 90 ? '...' : ''}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {conv.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(conv.timestamp).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                  {' • '}
                  {conv.messages.length} messages
                </Typography>
              </Box>

              {conv.feedback && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={conv.feedback.rating} readOnly size="small" sx={{ color: '#FFB400' }} />
                  {conv.feedback.comment && (
                    <Typography variant="caption" color="text.secondary">
                      "{conv.feedback.comment.slice(0, 40)}..."
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </ListItem>
        </Paper>
      ))}
    </Box>
  );
}