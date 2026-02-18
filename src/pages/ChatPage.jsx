import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaHistory, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatBubble from "../components/ChatBubble";

const ChatPage = () => {
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/data.json").then((res) => {
      setData(res.data);
    });
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botMessage = {
      sender: "bot",
      text: getBotResponse(input),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  // STEP 1: Open Modal instead of saving directly
  const handleSave = () => {
    if (messages.length === 0) return;
    setOpenModal(true);
  };

  // STEP 2: Final Save with Rating + Feedback
  const handleFinalSave = () => {
    const previous =
      JSON.parse(localStorage.getItem("conversations")) || [];

    const conversation = {
      id: Date.now(),
      messages,
      rating,
      feedbackText,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "conversations",
      JSON.stringify([...previous, conversation])
    );

    // Reset everything
    setMessages([]);
    setRating(0);
    setFeedbackText("");
    setOpenModal(false);
  };

  return (
    <Box>
      {/* Top Buttons */}
      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant="contained"
          startIcon={<FaHistory />}
          onClick={() => navigate("/history")}
        >
          Past Conversations
        </Button>

        <Button
          variant="outlined"
          startIcon={<FaPlus />}
          onClick={() => setMessages([])}
        >
          New Chat
        </Button>
      </Stack>

      {/* First 4 Questions */}
      <Box mb={2}>
        {data.slice(0, 4).map((item) => (
          <Typography
            key={item.id}
            sx={{ cursor: "pointer", mb: 1 }}
            onClick={() => setInput(item.question)}
          >
            {item.question}
          </Typography>
        ))}
      </Box>

      {/* Messages */}
      {messages.map((msg, i) => (
        <ChatBubble key={i} message={msg} />
      ))}

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            fullWidth
            placeholder="Message Bot AI…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button type="submit" variant="contained">
            Ask
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={handleSave}
          >
            Save
          </Button>
        </Stack>
      </form>

      {/* ✅ FEEDBACK MODAL */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
        <DialogTitle>Feedback</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 1 }}>
            Rate this conversation:
          </Typography>

          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Write your feedback"
            value={feedbackText}
            onChange={(e) =>
              setFeedbackText(e.target.value)
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleFinalSave}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatPage;




