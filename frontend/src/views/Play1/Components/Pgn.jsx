// Pgn.jsx
import React from "react";

export default function Pgn({ pgn }) {
  return (
    <div className="section pgn">
      <div className="section-header">
        <div className="section-title">PGN</div>
        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(pgn)}
          title="Copy PGN"
        >
          Copy
        </button>
      </div>
      <textarea readOnly value={pgn} />
    </div>
  );
};

