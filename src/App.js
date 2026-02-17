import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  // Key to force a re-mount of ChatPage for a fresh state on New Chat
  const [chatId, setChatId] = useState(Date.now());

  const handleNewChat = () => {
    setChatId(Date.now()); // Resets ChatPage state
  };

  return (
  
      <Routes>
        <Route path="/" element={<Layout onNewChat={handleNewChat} />}>
          <Route index element={<ChatPage key={chatId} />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
 
  );
}

export default App;