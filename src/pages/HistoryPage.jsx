import { useEffect, useState } from "react";
import { Box, Typography, Paper, Rating } from "@mui/material";

const HistoryPage = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("conversations")) || [];

    setConversations(Array.isArray(stored) ? stored : []);
  }, []);

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Past Conversations
      </Typography>

      {conversations.length === 0 && (
        <Typography>No conversations found.</Typography>
      )}

      {conversations.map((conv, i) => {
        // ✅ Handle both OLD and NEW formats safely
        const messages = Array.isArray(conv)
          ? conv
          : conv.messages || [];

        const rating = conv.rating || 0;
        const feedback = conv.feedbackText || "";

        return (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            {messages.map((msg, j) => (
              <Box key={j} mb={1}>
                <strong>
                  {msg.sender === "user"
                    ? "You"
                    : "Soul AI"}
                </strong>
                <p>{msg.text}</p>
              </Box>
            ))}

            <Box mt={2}>
              <Typography variant="subtitle2">
                Rating:
              </Typography>
              <Rating value={rating} readOnly />
            </Box>

            {feedback && (
              <Typography mt={1}>
                Feedback: {feedback}
              </Typography>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default HistoryPage;







