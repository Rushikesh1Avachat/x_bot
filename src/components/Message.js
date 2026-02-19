function Message({ msg }) {
  return (
    <div className={`message ${msg.sender}`}>
      <div className="avatar"></div>

      <div className="bubble">
        {msg.sender === "bot" && <span>Soul AI</span>}
        <p>{msg.text}</p>

        {msg.sender === "bot" && (
          <div className="hover-icons">
            👍 👎
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;

