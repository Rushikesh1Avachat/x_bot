import { Box, Typography, Select, MenuItem, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ChatBubble from "../components/ChatBubble";

export default function HistoryPage() {
  const [convs, setConvs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setConvs(JSON.parse(localStorage.getItem("conversations")) || []);
  }, []);

  const filtered = filter ? convs.filter(c => c.feedback?.rating === Number(filter)) : convs;

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>Conversation History</Typography>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} displayEmpty sx={{ mb: 3, minWidth: 200 }}>
        <MenuItem value="">All Ratings</MenuItem>
        {[1,2,3,4,5].map(r => <MenuItem key={r} value={r}>{r} Stars</MenuItem>)}
      </Select>
      {filtered.map(c => (
        <Paper key={c.id} sx={{ p: 2, mb: 3, bgcolor: 'rgba(215, 199, 235, 0.1)' }}>
          {c.messages.map((m, i) => <ChatBubble key={i} message={m.text} isBot={m.isBot} />)}
          {c.feedback && (
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
              Rating: {c.feedback.rating}/5 | Feedback: {c.feedback.comment}
            </Typography>
          )}
        </Paper>
      ))}
    </Box>
  );
}
