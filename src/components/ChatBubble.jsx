import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const ChatBubble = ({ message, onFeedback }) => {
  const isBot = message.role === "Soul AI";

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexDirection: isBot ? "row" : "row-reverse" }}>
      <Avatar sx={{ bgcolor: isBot ? "#D7C7F4" : "#9747FF" }}>
        {isBot ? "AI" : "U"}
      </Avatar>
      <Box sx={{ maxWidth: "70%" }}>
        <Typography variant="subtitle2" fontWeight="bold">
          <span>{message.role}</span>
        </Typography>
        <Box sx={{ p: 2, bgcolor: isBot ? "#D7C7F4" : "#FFFFFF", borderRadius: 2, border: "1px solid #E0E0E0" }}>
          <Typography component="p" variant="body1">
            {message.text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {message.time}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;



