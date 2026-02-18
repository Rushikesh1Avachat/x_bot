import { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default function ChatBubble({ message, onFeedback }) {
  const [hovered, setHovered] = useState(false);

  const isBot = message.role?.toLowerCase().includes('soul ai') || message.role === 'Soul AI';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2,
        width: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: '20px',
          maxWidth: '80%',
          bgcolor: isBot ? '#EDE7FF' : '#F0F0F0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          position: 'relative',
          transition: 'all 0.2s',
          '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.12)' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: isBot ? '#9747FF' : '#FF6B6B',
            }}
          >
            {isBot ? <SmartToyIcon /> : <PersonIcon />}
          </Avatar>
          <Typography component="span" variant="subtitle1" fontWeight="bold">
            {isBot ? <span>Soul AI</span> : <span>You</span>}
          </Typography>
        </Box>

        <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1.05rem' }}>
          {message.text}
        </p>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
          <Typography variant="caption" color="text.secondary">
            {message.time}
          </Typography>

          {isBot && hovered && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={() => onFeedback?.(message.id, 'like')}
                sx={{ color: 'grey.600', '&:hover': { color: 'success.main' } }}
              >
                <FaThumbsUp size={18} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onFeedback?.(message.id, 'dislike')}
                sx={{ color: 'grey.600', '&:hover': { color: 'error.main' } }}
              >
                <FaThumbsDown size={18} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}



