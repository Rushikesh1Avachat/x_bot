import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Rating } from '@mui/material';
import { MdThumbUpOffAlt, MdThumbDownOffAlt } from 'react-icons/md';

const ChatBubble = ({ message, onLikeDislike }) => {
  const isBot = message.role === 'bot';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3, 
        flexDirection: isBot ? 'row' : 'row-reverse',
        alignItems: 'flex-start'
      }}
    >
      <Avatar src={isBot ? "/bot-logo.png" : "/user-logo.png"} />
      <Box sx={{ maxWidth: '70%' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {isBot ? <span>Soul AI</span> : 'You'}
        </Typography>
        <Box sx={{ 
          p: 2, 
          bgcolor: isBot ? 'primary.light' : '#fff', 
          borderRadius: 2,
          boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
        }}>
          {/* Requirement: AI Response must be in a <p> tag */}
          <p style={{ margin: 0, fontSize: '1rem' }}>{message.text}</p>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">{message.time}</Typography>
            
            {isBot && isHovered && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton size="small" onClick={() => onLikeDislike('like')}>
                  <MdThumbUpOffAlt size={16} />
                </IconButton>
                <IconButton size="small" onClick={() => onLikeDislike('dislike')}>
                  <MdThumbDownOffAlt size={16} />
                </IconButton>
              </Box>
            )}
          </Box>
          {message.rating && <Rating value={message.rating} readOnly size="small" sx={{ mt: 1 }} />}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;