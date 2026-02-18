import { useState } from 'react';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  const [view, setView] = useState('chat');

  return (
    <Layout currentView={view} onViewChange={setView}>
      {view === 'chat' ? <ChatPage /> : <HistoryPage />}
    </Layout>
  );
}