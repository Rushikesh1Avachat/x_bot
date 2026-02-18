import { useState } from 'react';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [currentView, setCurrentView] = useState('chat');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'chat' ? <ChatPage /> : <HistoryPage />}
    </Layout>
  );
}