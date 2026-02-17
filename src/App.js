import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import botData from "./api/data.json";

function App() {
  const [chatKey, setChatKey] = useState(0);

  // Requirement: Logic for "New Chat" button to reset the state
  const startNewChat = () => setChatKey(prev => prev + 1);

  return (
    <Routes>
      <Route element={<Layout onNewChat={startNewChat} />}>
        {/* The 'key' forces React to destroy and recreate the ChatPage for a New Chat */}
        <Route path="/" element={<ChatPage key={chatKey} botData={botData} />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;