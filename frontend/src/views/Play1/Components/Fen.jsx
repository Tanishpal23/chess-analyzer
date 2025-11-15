

// Fen.jsx
import React from "react";

export default function Fen({ fen }) {
  return (
    <div className="section fen">
      <div className="section-header">
        <div className="section-title">FEN</div>
        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(fen)}
          title="Copy FEN"
        >
          Copy
        </button>
      </div>
      <code className="fen-string">{fen}</code>
    </div>
  );
};

