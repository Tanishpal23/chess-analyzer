// import React from 'react'

// const Analyze = () => {
//   return (
//     <div>Analyze</div>
//   )
// }

// export default Analyze



import { useState } from "react";

export default function AnalyseLoader({
  onLoadFEN,
  onLoadPGN,
  onSetupPosition,
}) {
  const [fen, setFen] = useState("");
  const [pgn, setPgn] = useState("");

  return (
    <div class="analyze-page">
    <div className="analyse-loader">
      {/* Load FEN */}
      <div className="loader-section">
        <h3>Load Position (FEN)</h3>
        <input
          type="text"
          placeholder="e.g. rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
          value={fen}
          onChange={(e) => setFen(e.target.value)}
        />
        <button onClick={() => onLoadFEN(fen)}>
          Load FEN
        </button>
      </div>

      {/* Load PGN */}
      <div className="loader-section">
        <h3>Load Game (PGN)</h3>
        <textarea
          rows="6"
          placeholder={`[Event "Casual Game"]
[Site "Berlin GER"]
[Date "1852.??.??"]

1.e4 e5 2.Nf3 Nc6 3.Bc4`}
          value={pgn}
          onChange={(e) => setPgn(e.target.value)}
        />
        <button onClick={() => onLoadPGN(pgn)}>
          Load PGN
        </button>
      </div>

      {/* Setup */}
      <div className="loader-section">
        <h3>Setup Position</h3>
        <button className="secondary" onClick={onSetupPosition}>
          Empty Board
        </button>
      </div>
    </div>
    </div>
  );
}
