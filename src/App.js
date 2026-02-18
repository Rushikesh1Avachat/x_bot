import { useState } from 'react';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [currentView, setCurrentView] = useState('chat');

  // This is the function that Layout needs
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <Layout
      currentView={currentView}
      onViewChange={handleViewChange}   // ← THIS WAS MISSING → now fixed
    >
      {currentView === 'chat' ? <ChatPage /> : <HistoryPage />}
    </Layout>
  );
}