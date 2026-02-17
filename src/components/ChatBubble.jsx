import React, { useState } from 'react';
import { Box, Typography, Avatar, Paper, IconButton } from '@mui/material';
import { TbRobot } from 'react-icons/tb';
import { MdThumbUpOffAlt, MdThumbDownOffAlt } from 'react-icons/md';

const ChatBubble = ({ message, onFeedback }) => {
  const isBot = message.role === 'Soul AI';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: isBot ? 'row' : 'row-reverse' }}
    >
      <Avatar sx={{ bgcolor: isBot ? '#D7C7F4' : '#9747FF' }}>
        {isBot ? <TbRobot color="#333" /> : 'Y'}
      </Avatar>
      <Box sx={{ maxWidth: '80%' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>{message.role}</Typography>
        <Paper elevation={0} sx={{ p: 2, bgcolor: isBot ? '#AF9FCD33' : '#fff', borderRadius: '20px', border: '1px solid #E0E0E0' }}>
          {/* Requirement: AI Response inside <p> tag */}
          <p style={{ margin: 0 }}>{message.text}</p>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
            <Typography variant="caption" color="textSecondary">{message.time}</Typography>
            {isBot && isHovered && (
              <Box>
                <IconButton size="small"><MdThumbUpOffAlt size={16} /></IconButton>
                <IconButton size="small" onClick={onFeedback}><MdThumbDownOffAlt size={16} /></IconButton>
              </Box>
            )}
          </Box>
          {message.feedback && (
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
              Feedback: <span style={{ fontWeight: 'normal' }}>{message.feedback}</span>
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatBubble;