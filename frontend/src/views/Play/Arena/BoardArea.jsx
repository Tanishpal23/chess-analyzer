// src/views/Play/Arena/BoardArea.jsx
import { useEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";

export default function BoardArea({ logic }) {
  const { fen, orientation, onDrop, highlightSquares } = logic;
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(560);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const w = wrapRef.current?.clientWidth || 560;
      setWidth(Math.min(w, 680));
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="d-flex justify-content-center">
      <Chessboard
        id="arena-board"
        position={fen}
        onPieceDrop={onDrop}
        boardOrientation={orientation}
        boardWidth={width}
        customBoardStyle={{ borderRadius: 12 }}
        customSquareStyles={highlightSquares}
        animationDuration={200}
      />
    </div>
  );
}
