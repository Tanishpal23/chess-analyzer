// ChatPanel.jsx
import React from "react";

export default function ChatPanel() {
  return (
    <aside className="panel chat">
      <header className="panel-title">Chat</header>
      <div className="chat-log" />
      <form className="chat-input" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Type a message…" />
        <button type="submit">Send</button>
      </form>
    </aside>
  );
};


