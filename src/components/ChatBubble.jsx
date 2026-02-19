import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

export default function ChatBubble({ message, isBot, time }) {
  const [hover, setHover] = useState(false);

  return (
    <Box 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)}
      sx={{ 
        display: 'flex', gap: 2, p: 2, mb: 2, 
        bgcolor: isBot ? 'rgba(215, 199, 235, 0.1)' : 'transparent', 
        borderRadius: 4, boxShadow: isBot ? '0 2px 5px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <Avatar src={isBot ? "/logo.png" : "/user.png"} sx={{ width: 50, height: 50 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {isBot ? <span>Soul AI</span> : "You"}
        </Typography>
        <Typography component="p" variant="body1">{message}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
          <Typography variant="caption" color="textSecondary">{time}</Typography>
          {isBot && hover && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small"><FaThumbsUp size={14} /></IconButton>
              <IconButton size="small"><FaThumbsDown size={14} /></IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}