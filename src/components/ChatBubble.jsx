import { Box, Typography, IconButton, Rating } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

const ChatBubble = ({ message, onFeedback = null }) => {
  const [hover, setHover] = useState(false);
  const isUser = message.sender === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2,
      }}
    >
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          maxWidth: "70%",
          p: 2,
          borderRadius: 3,
          bgcolor: isUser ? "#6366f1" : "#ede9fe",
          color: isUser ? "#fff" : "#111",
          position: "relative",
        }}
      >
        {!isUser && (
          <Typography fontWeight="bold" mb={0.5}>
            Soul AI
          </Typography>
        )}

        <Typography>{message.text}</Typography>

        {/* Like / Dislike */}
        {!isUser && hover && onFeedback && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => onFeedback("like")}
              color={message.feedback === "like" ? "primary" : "default"}
            >
              <FaThumbsUp size={14} />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => onFeedback("dislike")}
              color={message.feedback === "dislike" ? "error" : "default"}
            >
              <FaThumbsDown size={14} />
            </IconButton>
          </Box>
        )}

        {/* Rating */}
        {message.rating > 0 && (
          <Box mt={1}>
            <Rating value={message.rating} readOnly size="small" />
          </Box>
        )}

        {/* Subjective Feedback */}
        {message.subjective && (
          <Typography variant="caption" display="block" mt={1}>
            Feedback: {message.subjective}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ChatBubble;








