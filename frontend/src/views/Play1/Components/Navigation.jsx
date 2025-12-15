
// Navigation.jsx
import React from "react";

export default function Navigation(goToFirst) {
  return (
    <div className="section">
      <div className="section-title">Navigation</div>
      <div className="btn-row">
        <button type="button" title="First">
          ⏮
        </button>
        <button type="button" title="Prev">
          ◀
        </button>
        <button type="button" title="Next">
          ▶
        </button>
        <button type="button" title="Last">
          ⏭
        </button>
      </div>
    </div>
  );
};


