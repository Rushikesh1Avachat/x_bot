import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

// Internal Imports
import { theme } from './theme/theme';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  const [botData, setBotData] = useState([]);
  const [loading, setLoading] = useState(true);

// src/App.jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      // FIX: Use '/api/data.json' to target the public directory root
      const response = await axios.get('/api/data.json'); 
      setBotData(response.data);
    } catch (error) {
      console.error("Error loading mock data:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#F9F9FB' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Logic: Router is already provided in index.js, so we don't use it here */}
      <Layout>
        <Routes>
          <Route path="/" element={<ChatPage botData={botData} />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;