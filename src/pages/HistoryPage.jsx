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
    <Box sx={{ maxWidth: 900, mx: 'auto', px: { xs: 2, md: 3 }, py: 3 }}>
      {/* Page Title */}
      <Typography 
        variant="h5" 
        fontWeight="bold" 
        gutterBottom 
        sx={{ mb: 3, color: '#333' }}
      >
        Conversation History
      </Typography>

      {/* Section Header */}
      <Typography 
        variant="subtitle1" 
        color="text.secondary" 
        sx={{ mb: 2, fontWeight: 600 }}
      >
        Today's Chats
      </Typography>

      {/* Conversation Cards */}
      {conversations.map((conv, idx) => (
        <Paper
          key={conv.id}
          elevation={2}
          sx={{
            mb: 2.5,
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: '#F8F5FF',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(151,71,255,0.15)',
            },
          }}
        >
          <ListItem 
            sx={{ 
              py: 2.5, 
              px: 3, 
              flexDirection: 'column', 
              alignItems: 'flex-start',
              borderBottom: idx < conversations.length - 1 ? '1px solid #E0D4FF' : 'none',
            }}
          >
            {/* Message Previews (last 2 messages) */}
            <Box sx={{ width: '100%', mb: 1.5 }}>
              {conv.messages.slice(-2).map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    mb: 1.2,
                    p: 2,
                    borderRadius: msg.role === 'You' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    bgcolor: msg.role === 'You' ? '#FFFFFF' : '#EDE7FF',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
                    <Avatar 
                      sx={{ 
                        width: 36, 
                        height: 36, 
                        bgcolor: msg.role === 'You' ? '#FF6B6B' : '#9747FF' 
                      }}
                    >
                      {msg.role === 'You' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {msg.role === 'Soul AI' ? <span>Soul AI</span> : <span>You</span>}
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ lineHeight: 1.5, color: '#444' }}>
                    {msg.text?.slice(0, 90)}{msg.text?.length > 90 ? '...' : ''}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Summary Row */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%',
              mt: 1,
            }}>
              {/* Left: Title + Meta */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#333' }}>
                  {conv.title}
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

              {/* Right: Feedback */}
              {conv.feedback && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Rating 
                    value={conv.feedback.rating} 
                    readOnly 
                    size="small" 
                    precision={1}
                    sx={{ color: '#FFB400' }}
                  />
                  {conv.feedback.comment && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      "{conv.feedback.comment.slice(0, 40)}{conv.feedback.comment.length > 40 ? '...' : ''}"
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