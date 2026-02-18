import { Box,  IconButton } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

const ChatBubble = ({ message, onFeedback }) => {
  const [hover, setHover] = useState(false);
  const isUser = message.sender === "user";

  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      mb={2}
    >
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          p: 2,
          borderRadius: 3,
          maxWidth: "70%",
          bgcolor: isUser ? "#6366f1" : "#f1f1f1",
          color: isUser ? "#fff" : "#000",
          position: "relative",
        }}
      >
        {!isUser && (
          <span style={{ fontWeight: "bold" }}>
            Soul AI
          </span>
        )}

        <p>{message.text}</p>

        {!isUser && hover && (
          <Box position="absolute" top={5} right={5}>
            <IconButton onClick={() => onFeedback("like")}>
              <FaThumbsUp />
            </IconButton>
            <IconButton onClick={() => onFeedback("dislike")}>
              <FaThumbsDown />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatBubble;










