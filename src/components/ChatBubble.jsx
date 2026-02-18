import { Box, IconButton, Typography } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

const ChatBubble = ({ message, onFeedback }) => {
  const [hover, setHover] = useState(false);
  
  // Checking for 'Soul AI' to determine layout and styling
  const isAI = message.role === "Soul AI";

  return (
    <Box
      display="flex"
      justifyContent={!isAI ? "flex-end" : "flex-start"}
      mb={2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: "20px",
          maxWidth: { xs: "90%", md: "80%" }, // Responsive width
          bgcolor: isAI ? "#D7C7F433" : "#F0F0F0", 
          color: "#000",
          position: "relative",
          // Subtle shadow for user messages, flat for AI (as per design)
          boxShadow: isAI ? 'none' : '0px 2px 5px rgba(0,0,0,0.05)',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            bgcolor: isAI ? "#D7C7F455" : "#EAEAEA"
          }
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          {/* Critical for tests: Name must be in a span */}
          {isAI ? <span>Soul AI</span> : <span>You</span>}
        </Typography>

        {/* Critical for tests: Response text must be in a p tag */}
        <p style={{ 
          margin: "4px 0", 
          fontSize: "1rem", 
          wordBreak: "break-word",
          lineHeight: 1.5 
        }}>
          {message.text}
        </p>

        <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="text.secondary">
            {message.time}
          </Typography>

          {/* Feedback buttons logic */}
          {isAI && hover && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton 
                size="small" 
                onClick={() => onFeedback(message.id, "like")}
                sx={{ p: 0.5, '&:hover': { color: 'success.main' } }}
              >
                <FaThumbsUp size={14} />
              </IconButton>
              <IconButton 
                size="small" 
                onClick={() => onFeedback(message.id, "dislike")}
                sx={{ p: 0.5, '&:hover': { color: 'error.main' } }}
              >
                <FaThumbsDown size={14} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;







