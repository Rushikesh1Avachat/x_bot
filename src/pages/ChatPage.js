import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { sampleData } from "../data";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    const reply = sampleData[input]
      ? sampleData[input]
      : "Sorry, Did not understand your query!";

    const botMessage = { sender: "bot", text: reply };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const saveConversation = () => {
    const prev = JSON.parse(localStorage.getItem("chats")) || [];
    prev.push([...messages]);
    localStorage.setItem("chats", JSON.stringify(prev));
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main">
        <header>
          <h1>Bot AI</h1>
        </header>

        {/* ⭐ HERO SECTION */}
        {messages.length === 0 && (
          <div className="hero">
            <h2>How Can I Help You Today?</h2>

            <div className="hero-circle"></div>

            <div className="cards">
              {Object.keys(sampleData).map((q, i) => (
                <div
                  key={i}
                  className="card"
                  onClick={() => setInput(q)}
                >
                  <h3>{q}</h3>
                  <p>Get immediate AI generated response</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⭐ CHAT SECTION */}
        <section className="chat-area">
  {messages.map((msg, index) => (
    <div key={index} className={`message-row ${msg.sender}`}>
      <div className="avatar"></div>

      <div className="message-bubble">
        {msg.sender === "bot" && <span>Soul AI</span>}

        {/* REQUIRED p tag */}
        <p>{msg.text}</p>

        {/* 👍 👎 only for bot */}
        {msg.sender === "bot" && (
          <div className="feedback-icons">
            👍 👎
          </div>
        )}
      </div>
    </div>
  ))}
</section>

        {/* ⭐ INPUT */}
        <form onSubmit={handleSubmit} className="input-row">
          <input
            placeholder="Message Bot AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">Ask</button>
          <button type="button" onClick={saveConversation}>
            Save
          </button>
        </form>
      </main>
    </div>
  );
}

export default ChatPage;
