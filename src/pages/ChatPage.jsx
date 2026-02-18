import { useState, useEffect, useRef } from "react";
import data from "../api/data.json";
import ChatBubble from "../components/ChatBubble";
import FeedbackModal from "../components/FeedbackModal";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  Stack,
} from "@mui/material";

const predefinedQuestions = [
  "Hi, what is the weather",
  "Hi, what is my location",
  "Hi, what is the temperature",
  "Hi, how are you",
];

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBotIndex, setCurrentBotIndex] = useState(null);
  const chatEndRef = useRef(null);

  // Time helper
  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // Bot response finder
  const getBotResponse = (question) => {
    const found = data.find(
      (item) =>
        item.question.toLowerCase().trim() ===
        question.toLowerCase().trim()
    );

    return found
      ? found.response
      : "Sorry, Did not understand your query!";
  };

  // Common ask handler (for input + predefined)
  const handleAsk = (questionText) => {
    const question = questionText || input;
    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
      time: getTime(),
    };

    const botMessage = {
      sender: "bot",
      text: getBotResponse(question),
      time: getTime(),
      feedback: null,
      rating: 0,
      subjective: "",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  // Save conversation
  const handleSave = () => {
    if (messages.length === 0) return;

    const history =
      JSON.parse(localStorage.getItem("conversations")) || [];

    const newConversation = {
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      messages,
    };

    localStorage.setItem(
      "conversations",
      JSON.stringify([newConversation, ...history])
    );

    setMessages([]);
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      height="85vh"
    >
      <Typography variant="h6" textAlign="center" mb={3}>
        How Can I Help You Today?
      </Typography>

      {/* 4 Predefined Questions */}
      {messages.length === 0 && (
        <Grid container spacing={2} mb={3}>
          {predefinedQuestions.map((q, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
                onClick={() => handleAsk(q)}
              >
                <Typography fontWeight="bold">{q}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Get immediate AI generated response
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Chat Area */}
      <Box flexGrow={1} overflow="auto" mb={2}>
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            onFeedback={(type) => {
              if (msg.sender !== "bot") return;

              const updated = [...messages];
              updated[index].feedback = type;
              setMessages(updated);

              setCurrentBotIndex(index);
              setModalOpen(true);
            }}
          />
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Input + Ask + Save */}
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAsk();
          }}
        />
        <Button
          variant="contained"
          onClick={() => handleAsk()}
        >
          Ask
        </Button>
        <Button
          variant="outlined"
          onClick={handleSave}
        >
          Save
        </Button>
      </Stack>

      {/* Feedback Modal */}
      <FeedbackModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={({ rating, subjective }) => {
          const updated = [...messages];
          updated[currentBotIndex].rating = rating;
          updated[currentBotIndex].subjective =
            subjective;

          setMessages(updated);
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default ChatPage;


