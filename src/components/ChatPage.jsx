import { useState, useEffect, useRef } from "react";
import data from "../api/data.json";
import ChatBubble from "../components/ChatBubble";
import FeedbackModal from "../components/FeedbackModal";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";

const predefinedQuestions = [
  "Hi, what is the weather",
  "Hi, what is my location",
  "Hi, what is the temperature",
  "Hi, how are you",
];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBotIndex, setCurrentBotIndex] = useState(null);
  const chatEndRef = useRef(null);

  const getBotResponse = (question) => {
    const found = data.find(
      (item) => item.question.toLowerCase() === question.toLowerCase()
    );
    return found
      ? found.response
      : "Sorry, Did not understand your query!";
  };

  const handleQuestionClick = (question) => {
    const userMessage = { sender: "user", text: question };
    const botResponse = {
      sender: "bot",
      text: getBotResponse(question),
    };

    setMessages((prev) => [...prev, userMessage, botResponse]);
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("chats")) || [];
    saved.push(messages);
    localStorage.setItem("chats", JSON.stringify(saved));
  };

  // ✅ Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box p={3}>
      <Typography variant="h6" textAlign="center" mb={3}>
        How Can I Help You Today?
      </Typography>

      {/* ✅ Only 4 Questions */}
      <Grid container spacing={2} mb={3}>
        {predefinedQuestions.map((q, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => handleQuestionClick(q)}
            >
              <Typography fontWeight="bold">{q}</Typography>
              <Typography variant="body2" color="text.secondary">
                Get immediate AI generated response
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chat Messages */}
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          message={msg}
          onFeedback={(type) => {
            const updated = [...messages];
            updated[index].feedback = type;
            setMessages(updated);
            setCurrentBotIndex(index);
            setModalOpen(true);
          }}
        />
      ))}

      <div ref={chatEndRef} />

      {/* Only Save Button (No free typing allowed) */}
      {messages.length > 0 && (
        <Box mt={2}>
          <Button variant="outlined" onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}

      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(text) => {
          const updated = [...messages];
          updated[currentBotIndex].subjective = text;
          setMessages(updated);
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default ChatPage;
