
import React, { useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

const BoardArea = () => {

  const chessGameRef = useRef(new Chess());

  const chessGame = chessGameRef.current;

  const [chessPosition, setChessPosition] = useState(chessGame.fen());
  const [currentTurn, setCurrentTurn] = useState('White');

  // --- Handle piece drop ---
  function onPieceDrop({ sourceSquare, targetSquare }) {
    if (!targetSquare) return false;

    const move = chessGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen
    });

    if (move === null) return false; // illegal move

    console.log(chessGame.history());
    setChessPosition(chessGame.fen());
    setCurrentTurn(chessGame.turn() === 'w' ? 'White' : 'Black'); // update turn
    return true;
  }

  // --- Chessboard options ---
  const chessboardOptions = {
    id: 'player-only',
    position: chessPosition,
    onPieceDrop,

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', height:'80vh', width:'80vh' }}>
      <Chessboard options={chessboardOptions} />
    </div>
  );
};

export default BoardArea;
