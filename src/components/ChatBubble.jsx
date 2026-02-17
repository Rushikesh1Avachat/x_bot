import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { TbRobot } from "react-icons/tb";
import { ThumbUpOutlined, ThumbDownOutlined } from '@mui/icons-material';

const ChatBubble = ({ message, onFeedbackClick }) => {
  const isBot = message.role === "Soul AI";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        // UI Requirement: Hovering shows the feedback icons
        '&:hover .feedback-actions': { visibility: 'visible', opacity: 1 },
        mb: 2,
      }}
    >
      <Avatar 
        sx={{ 
          bgcolor: isBot ? "#D7C7F4" : "#9747FF",
          width: 50,
          height: 50,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.05)'
        }}
      >
        {isBot ? <TbRobot color="black" size={30} /> : "Y"}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        {/* Requirement: Role MUST be in a <span> for evaluation */}
        <Typography variant="subtitle2" fontWeight="bold">
          <span>{message.role}</span>
        </Typography>

        <Box
          sx={{
            p: 2,
            mt: 0.5,
            bgcolor: isBot ? "#D7C7F4" : "#FFFFFF", // Light purple for bot, white for user
            borderRadius: "20px",
            border: "1px solid #E0E0E0",
            maxWidth: "fit-content"
          }}
        >
          {/* Requirement: AI Response MUST be in a <p> tag */}
          <Typography component="p" variant="body1">
            {message.text}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {message.time}
            </Typography>

            {/* Requirement: Floating Feedback Icons on Hover */}
            {isBot && (
              <Box 
                className="feedback-actions" 
                sx={{ 
                  visibility: 'hidden', 
                  opacity: 0, 
                  transition: '0.3s', 
                  display: 'flex', 
                  gap: 0.5 
                }}
              >
                <IconButton size="small" onClick={onFeedbackClick}>
                  <ThumbUpOutlined fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={onFeedbackClick}>
                  <ThumbDownOutlined fontSize="inherit" />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Display feedback text if it exists (for History view) */}
          {message.feedback && (
            <Typography variant="body2" sx={{ mt: 1, borderTop: '1px solid rgba(0,0,0,0.1)', pt: 1 }}>
              <strong>Feedback:</strong> {message.feedback}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;


