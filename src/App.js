import { useState } from 'react';
import Layout from './components/Layout';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import FeedbackView from './components/FeedbackView'

export default function App() {
  const [view, setView] = useState('chat'); // 'chat', 'history', 'feedback'

  return (
    <Layout currentView={view} onViewChange={setView}>
      {view === 'chat' ? (
        <ChatPage />
      ) : view === 'history' ? (
        <HistoryPage />
      ) : (
        <FeedbackView />
      )}
    </Layout>
  );
}