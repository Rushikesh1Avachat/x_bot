import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import ChatBubble from "../components/ChatBubble";

const HistoryPage = () => {
  const conversations =
    JSON.parse(localStorage.getItem("conversations")) || [];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Conversation History
      </Typography>

      {conversations.length === 0 && (
        <Typography>No saved conversations.</Typography>
      )}

      {conversations.map((conv) => (
        <Paper
          key={conv.id}
          sx={{
            mb: 4,
            p: 3,
            bgcolor: "#ede9fe",
            borderRadius: 3,
          }}
        >
          <Typography
            variant="caption"
            display="block"
            mb={2}
            sx={{ opacity: 0.7 }}
          >
            {conv.createdAt}
          </Typography>

          <Stack spacing={2}>
            {conv.messages.map((msg, index) => (
              <Box key={index}>
                <ChatBubble message={msg} />

                {/* SHOW ONLY FOR BOT */}
                {msg.sender === "bot" && (
                  <Box mt={1} ml={1}>
                    <Typography variant="caption" display="block">
                      🕒 {msg.time}
                    </Typography>

                    {msg.feedback && (
                      <Typography variant="caption" display="block">
                        Feedback: {msg.feedback}
                      </Typography>
                    )}

                    {msg.rating > 0 && (
                      <Typography variant="caption" display="block">
                        Rating: {"⭐".repeat(msg.rating)} ({msg.rating}/5)
                      </Typography>
                    )}

                    {msg.subjective && (
                      <Typography variant="caption" display="block">
                        Comment: {msg.subjective}
                      </Typography>
                    )}
                  </Box>
                )}

                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Stack>
        </Paper>
      ))}
    </Box>
  );
};

export default HistoryPage;


