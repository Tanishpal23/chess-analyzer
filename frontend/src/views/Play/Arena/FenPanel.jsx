// // src/views/Play/Arena/FenPanel.jsx
// export default function FenPanel({ logic }) {
//   const { fen, pgn, moves } = logic;
//   const visible = 16;
//   const long = moves.length > visible;

//   return (
//     <div className="card">
//       <div className="card-header py-2 d-flex justify-content-between">
//         <span>Moves</span>
//         <div className="btn-group">
//           <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(fen)}>Copy FEN</button>
//           <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(pgn)}>Copy PGN</button>
//         </div>
//       </div>
//       <div className="card-body p-2">
//         <ol className="mb-2 ps-3">
//           {moves.slice(0, visible).map((m, i) => <li key={i} className="small">{m}</li>)}
//         </ol>
//         {long && (
//           <>
//             <div className="collapse" id="moreMoves">
//               <ol start={visible + 1} className="ps-3">
//                 {moves.slice(visible).map((m, i) => <li key={i} className="small">{m}</li>)}
//               </ol>
//             </div>
//             <button className="btn btn-sm btn-link px-0" data-bs-toggle="collapse" data-bs-target="#moreMoves">
//               Show more / less
//             </button>
//           </>
//         )}
//         <div className="mt-2 small text-muted text-break">{fen}</div>
//       </div>
//     </div>
//   );
// }







// src/views/Play/Arena/FenPanel.jsx
export default function FenPanel({ logic }) {
  const { fen, pgn, moves } = logic;
  const visible = 16;
  const long = moves.length > visible;

  return (
    <div className="card arena-panel">
      <div className="card-header py-2 d-flex justify-content-between">
        <span>Moves</span>
        <div className="btn-group">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(fen)}>Copy FEN</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => navigator.clipboard.writeText(pgn)}>Copy PGN</button>
        </div>
      </div>
      <div className="card-body p-2">
        <ol className="mb-2 ps-3 moves-list">
          {moves.slice(0, visible).map((m, i) => <li key={i} className="small">{m}</li>)}
        </ol>
        {long && (
          <>
            <div className="collapse" id="moreMoves">
              <ol start={visible + 1} className="ps-3">
                {moves.slice(visible).map((m, i) => <li key={i} className="small">{m}</li>)}
              </ol>
            </div>
            <button className="btn btn-sm btn-link px-0" data-bs-toggle="collapse" data-bs-target="#moreMoves">
              Show more / less
            </button>
          </>
        )}
        <div className="mt-2 small fen-string text-muted text-break">{fen}</div>
      </div>
    </div>
  );
}
