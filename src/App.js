import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";

const App = () => {
  // We remove the useState for 'history' because 
  // ChatPage writes to localStorage and HistoryPage reads from it.
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Layout>
  );
};

export default App;