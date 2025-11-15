
// MoveList.jsx
import React from "react";

export default function MoveList({ moveList }) {
  return (
    <>
      <header className="panel-title">Moves</header>
      <div className="moves-list">
        <ol className="moves">
          {moveList.map(([n, w, b]) => (
            <li key={n}>
              {n}. <span className="mv w">{w}</span> <span className="mv b">{b}</span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
