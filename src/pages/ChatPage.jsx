import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import ChatBubble from "../components/ChatBubble";
import FeedbackModal from "../components/FeedbackModal";

const ChatPage = () => {
  const [botData, setBotData] = useState([]); // All 54 questions
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const bottomRef = useRef(null);

  // 1. Fetch all 54 questions at once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data.json");
        const data = await response.json();
        setBotData(data);
      } catch (err) {
        console.error("Failed to load bot data", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = (queryText) => {
    const query = typeof queryText === "string" ? queryText : input;
    if (!query.trim()) return;

    const userMsg = {
      role: "You",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Match query against the 54 dynamic questions
    const cleanInput = query.toLowerCase().trim().replace(/\?$/, "");
    const foundMatch = botData.find(
      (item) => item.question.toLowerCase().trim().replace(/\?$/, "") === cleanInput
    );

    const botMsg = {
      role: "Soul AI",
      text: foundMatch ? foundMatch.response : "I'm sorry, I don't have an answer for that yet.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  // 2. Logic to Save Data + Open Feedback Modal
  const handleSaveToHistory = (feedbackData) => {
    const history = JSON.parse(localStorage.getItem("soul_history") || "[]");
    
    const newSession = {
      id: Date.now(),
      chat: messages,
      rating: feedbackData.rating,
      feedback: feedbackData.text,
      date: new Date().toLocaleDateString(),
    };

    localStorage.setItem("soul_history", JSON.stringify([...history, newSession]));
    setMessages([]); // Clear chat for new session
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 4 }}>
        {messages.length === 0 ? (
          /* Suggestion Logic: Show first 4 questions as cards */
          <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mt: 10 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>How Can I Help You Today?</Typography>
            <Grid container spacing={2}>
              {botData.slice(0, 4).map((item) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Paper
                    elevation={1}
                    onClick={() => handleAsk(item.question)}
                    sx={{ p: 3, cursor: "pointer", borderRadius: "10px", "&:hover": { bgcolor: "#f5f5f5" } }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">{item.question}</Typography>
                    <Typography variant="body2" color="textSecondary">Get instant answers</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 1000, mx: "auto" }}>
            {messages.map((msg, i) => (
              <ChatBubble key={i} message={msg} onFeedback={() => setOpenModal(true)} />
            ))}
          </Box>
        )}
        <div ref={bottomRef} />
      </Box>

      {/* Input Section */}
      <Box component="form" onSubmit={(e) => { e.preventDefault(); handleAsk(); }} sx={{ p: 4, display: "flex", gap: 2 }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message Bot AI..." />
        <Button type="submit" variant="contained" sx={{ bgcolor: "#9747FF" }}>Ask</Button>
        <Button 
           variant="outlined" 
           onClick={() => setOpenModal(true)} 
           disabled={messages.length === 0}
        >
          Save
        </Button>
      </Box>

      <FeedbackModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSaveToHistory} />
    </Box>
  );
};

export default ChatPage;