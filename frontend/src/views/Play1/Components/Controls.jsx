
// Controls.jsx
import React from "react";

export default function Controls({ undo, reset }) {
  return (
    <div className="section">
      <div className="section-title">Controls</div>
      <div className="btn-row">
        <button onClick={undo} title="Undo">
          ↶
        </button>
        <button onClick={reset} title="New Game">
          ⟲
        </button>
        <button title="Offer Draw">½</button>
        <button title="Resign">🏳</button>
      </div>
    </div>
  );
};

