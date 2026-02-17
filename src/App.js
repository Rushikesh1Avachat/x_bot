import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { theme } from './theme/theme';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  const [botData, setBotData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Matches the public/api/data.json path
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
        <CircularProgress sx={{ color: '#9747FF' }} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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