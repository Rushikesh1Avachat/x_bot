import Sidebar from "../components/Sidebar";

function HistoryPage() {
  const chats = JSON.parse(localStorage.getItem("chats")) || [];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main">
        <header>
          <h2>Conversation History</h2>
        </header>

        {chats.map((chat, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            {/* SAFETY FIX */}
            {Array.isArray(chat) ? (
              chat.map((msg, j) => (
                <div key={j}>
                  <strong>{msg.sender}</strong>: {msg.text}
                </div>
              ))
            ) : (
              <div>
                <strong>{chat.sender}</strong>: {chat.text}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

export default HistoryPage;
