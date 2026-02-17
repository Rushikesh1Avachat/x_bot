import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
// Import the static JSON data provided in your stubs
import botData from "./api/data.json"; 

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Requirement 3: Pass the static JSON data to ChatPage 
            to allow the .find() method to work.
        */}
        <Route path="/" element={<ChatPage botData={botData} />} />
        
        {/* Requirement 4: The '/history' route for saved messages */}
        <Route path="/history" element={<HistoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
