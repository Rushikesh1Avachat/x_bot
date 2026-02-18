import React, { useState } from "react";
import { Box, TextField, Button, Stack , Paper } from "@mui/material";
import FeedbackModal from "../components/FeedbackModal";
import botData from "../api/data.json";
import ChatBubble from "./ChatBubble"
const ChatPage = ({ onSave }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("conversations")) || []
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const findAnswer = (userInput) => {
    const cleaned = userInput.toLowerCase().trim();

    const match = botData.find(
      (item) =>
        item.question.toLowerCase().trim() === cleaned
    );

    return match
      ? match.response
      : "Sorry, Did not understand your query!";
  };

  const handleAsk = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const answer = findAnswer(input);

    const newMessages = [
      ...messages,
      {
        role: "You",
        text: input,
        time: new Date().toLocaleTimeString(),
      },
      {
        role: "Soul AI",
        text: answer,
        time: new Date().toLocaleTimeString(),
      },
    ];

    setMessages(newMessages);
    localStorage.setItem("conversations", JSON.stringify(newMessages));
    setInput("");
  };

const handleSubmitFeedback = (feedbackData) => {
  const existingHistory = JSON.parse(localStorage.getItem("conversations")) || [];
  
  // Create a session object so HistoryPage can find the .messages property
  const newSession = {
    id: Date.now(),
    messages: chatLog, // This MUST be the array of chat messages
    feedback: feedbackData 
  };

  localStorage.setItem("conversations", JSON.stringify([newSession, ...existingHistory]));
  // ... rest of your logic
};

  return (
    <>
      <Box
        component="form"
        onSubmit={handleAsk}
        sx={{ display: "flex", gap: 2, mb: 4 }}
      >
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <Button type="submit" variant="contained">
          Ask
        </Button>
      </Box>

      <Stack spacing={2}>
        {messages.map((msg, index) => (
          <Box key={index}>
            <ChatBubble
              message={msg}
              onFeedback={() => {
                setSelectedMessage(msg);
                setOpenModal(true);
              }}
            />

            {msg.role === "Soul AI" && (
              <Button
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => {
                  setSelectedMessage(msg);
                  setOpenModal(true);
                }}
              >
                Save
              </Button>
            )}
          </Box>
        ))}
      </Stack>

      <FeedbackModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitFeedback}
      />
    </>
  );
};

export default ChatPage;

