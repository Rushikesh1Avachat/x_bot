import { Box, IconButton, Typography } from "@mui/material";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useState } from "react";

const ChatBubble = ({ message, onFeedback }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Flexible role detection – covers "Soul AI", "assistant", "bot", etc.
  const isBot = message.role?.toLowerCase().includes("ai") ||
                message.role === "Soul AI" ||
                message.role === "assistant" ||
                message.role === "bot";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        mb: 2,
        width: "100%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`chat-bubble-${isBot ? "bot" : "user"}`}
    >
      <Box
        sx={{
          position: "relative",
          p: 2,
          borderRadius: "20px",
          maxWidth: { xs: "85%", sm: "78%", md: "70%" },
          bgcolor: isBot ? "#D7C7F433" : "#F0F0F0",
          color: "#000",
          boxShadow: isBot ? "none" : "0 2px 6px rgba(0,0,0,0.06)",
          transition: "background-color 0.2s ease",
          "&:hover": {
            bgcolor: isBot ? "#D7C7F455" : "#EAEAEA",
          },
        }}
      >
        {/* Sender name – must use <span> for Soul AI */}
        <Typography
          component="span"
          variant="subtitle2"
          fontWeight="bold"
          color={isBot ? "primary.main" : "text.primary"}
          sx={{ display: "block", mb: 0.75 }}
        >
          {isBot ? <span>Soul AI</span> : <span>You</span>}
        </Typography>

        {/* Message text – must use <p> tag for AI responses */}
        <p
          style={{
            margin: "4px 0 8px 0",
            fontSize: "1rem",
            lineHeight: 1.5,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
          data-testid="message-text"
        >
          {message.text || message.content || ""}
        </p>

        {/* Timestamp + feedback buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {message.time || new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>

          {/* Thumbs – only for AI messages, appear on hover */}
          {isBot && (
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? "visible" : "hidden",
                transition: "opacity 0.2s ease, visibility 0.2s",
                pointerEvents: isHovered ? "auto" : "none",
              }}
            >
              <IconButton
                size="small"
                aria-label="like this response"
                onClick={() => onFeedback?.(message.id || message.key, "like")}
                sx={{
                  p: 0.5,
                  color: isHovered ? "text.secondary" : "transparent",
                  "&:hover": { color: "success.main", bgcolor: "action.hover" },
                }}
              >
                <FaThumbsUp size={16} />
              </IconButton>

              <IconButton
                size="small"
                aria-label="dislike this response"
                onClick={() => onFeedback?.(message.id || message.key, "dislike")}
                sx={{
                  p: 0.5,
                  color: isHovered ? "text.secondary" : "transparent",
                  "&:hover": { color: "error.main", bgcolor: "action.hover" },
                }}
              >
                <FaThumbsDown size={16} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBubble;





