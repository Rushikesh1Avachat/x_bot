import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Rating } from '@mui/material';
import { MdThumbUpOffAlt, MdThumbDownOffAlt, MdOutlineFeedback } from 'react-icons/md';
import { TbRobot } from 'react-icons/tb';

const ChatBubble = ({ message, onLikeDislike, onFeedbackClick }) => {
  const isBot = message.role === 'Soul AI';
  const [hover, setHover] = useState(false);

  return (
    <Box 
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      sx={{ display: 'flex', gap: 2, flexDirection: isBot ? 'row' : 'row-reverse', alignItems: 'flex-start' }}
    >
      <Avatar sx={{ bgcolor: isBot ? 'primary.light' : 'primary.main' }}>
        {isBot ? <TbRobot color="#3C3C3C" /> : 'Y'}
      </Avatar>
      <Box sx={{ maxWidth: '80%' }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {isBot ? <span>Soul AI</span> : 'You'}
        </Typography>
        <Box sx={{ p: 2, bgcolor: isBot ? '#AF9FCD33' : '#fff', borderRadius: 2, border: '1px solid #E0E0E0' }}>
          <p style={{ margin: 0 }}>{message.text}</p>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
            <Typography variant="caption" color="textSecondary">{message.time}</Typography>
            {isBot && hover && (
              <Box>
                <IconButton size="small" onClick={() => onLikeDislike('up')}><MdThumbUpOffAlt size={16} /></IconButton>
                <IconButton size="small" onClick={() => onLikeDislike('down')}><MdThumbDownOffAlt size={16} /></IconButton>
                <IconButton size="small" onClick={onFeedbackClick}><MdOutlineFeedback size={16} /></IconButton>
              </Box>
            )}
          </Box>
          {message.rating > 0 && <Rating value={message.rating} readOnly size="small" sx={{ mt: 1 }} />}
          {message.feedback && <Typography variant="caption" display="block" sx={{ fontStyle: 'italic' }}>Feedback: {message.feedback}</Typography>}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;