import React from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { TbRobot } from "react-icons/tb";
import { ThumbUpOutlined, ThumbDownOutlined } from "@mui/icons-material";

const ChatBubble = ({ message, onFeedback }) => {
  const isBot = message.role === "Soul AI";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "row",
        mb: 2,
        "&:hover .feedback-icons": { visibility: "visible", opacity: 1 },
      }}
    >
      <Avatar sx={{ bgcolor: isBot ? "#D7C7F4" : "#9747FF", width: 50, height: 50 }}>
        {isBot ? <TbRobot color="black" size={30} /> : "Y"}
      </Avatar>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          {/* CRITICAL: Test cases look for <span> for the role name */}
          <span>{message.role}</span>
        </Typography>

        <Box
          sx={{
            p: 2,
            bgcolor: isBot ? "#D7C7F4" : "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E0E0E0",
            maxWidth: "fit-content",
            position: "relative",
          }}
        >
          {/* CRITICAL: AI Response MUST be in a <p> tag */}
          <Typography component="p" variant="body1">
            {message.text}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {message.time}
            </Typography>

            {/* Floating Feedback Icons on Hover */}
            {isBot && (
              <Box
                className="feedback-icons"
                sx={{ visibility: "hidden", opacity: 0, transition: "0.3s", display: "flex" }}
              >
                <IconButton size="small" onClick={() => onFeedback("liked")}>
                  <ThumbUpOutlined fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={() => onFeedback("disliked")}>
                  <ThumbDownOutlined fontSize="inherit" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;


