import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-row">
        <div className="logo-circle"></div>

        {/* REQUIRED anchor for test */}
        <Link to="/" className="new-chat">
          New Chat
        </Link>
      </div>

      {/* REQUIRED anchor for test */}
      <Link to="/history" className="past-btn">
        Past Conversations
      </Link>
    </aside>
  );
}

export default Sidebar;
