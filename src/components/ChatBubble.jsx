import { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

export default function ChatBubble({ message, onFeedback }) {
  const [hovered, setHovered] = useState(false);

  const isBot = message.role?.toLowerCase().includes('soul ai') || 
                message.role === 'Soul AI';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        mb: 2.5,
        width: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: isBot ? '20px 20px 20px 0' : '20px 20px 0 20px',
          maxWidth: '80%',
          bgcolor: isBot ? '#EDE7FF' : '#F0F0F0',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          },
        }}
      >
        {/* Header with avatar & name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: isBot ? '#9747FF' : '#FF6B6B',
            }}
          >
            {isBot ? (
              <SmartToyIcon fontSize="small" />
            ) : (
              <PersonIcon fontSize="small" />
            )}
          </Avatar>

          <Typography 
            component="span" 
            variant="subtitle1" 
            fontWeight="bold"
            sx={{ color: isBot ? '#9747FF' : '#333' }}
          >
            {isBot ? <span>Soul AI</span> : <span>You</span>}
          </Typography>
        </Box>

        {/* Message content */}
        <p 
          style={{ 
            margin: '0 0 12px 0', 
            lineHeight: 1.6, 
            fontSize: '1.05rem',
            color: '#444',
          }}
        >
          {message.text || message.content || ''}
        </p>

        {/* Footer: time + feedback buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {message.time || new Date().toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Typography>

          {isBot && (
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 0.5,
                opacity: hovered ? 1 : 0,
                visibility: hovered ? 'visible' : 'hidden',
                transition: 'opacity 0.2s ease, visibility 0.2s',
              }}
            >
              <IconButton
                size="small"
                aria-label="Like this response"
                onClick={() => onFeedback?.(message.id || message.key, 'like')}
                sx={{ 
                  color: 'grey.600', 
                  '&:hover': { color: 'success.main', bgcolor: 'action.hover' }
                }}
              >
                <FaThumbsUp size={18} />
              </IconButton>

              <IconButton
                size="small"
                aria-label="Dislike this response"
                onClick={() => onFeedback?.(message.id || message.key, 'dislike')}
                sx={{ 
                  color: 'grey.600', 
                  '&:hover': { color: 'error.main', bgcolor: 'action.hover' }
                }}
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
