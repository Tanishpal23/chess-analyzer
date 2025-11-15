
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useChessStore } from "../../../store/useChessStore.js";

const BoardArea = () => {
  const { game, fen, makeMove } = useChessStore();

  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});

  
  function getMoveOptions(square) {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.forEach((m) => {
      newSquares[m.to] = {
        background: "radial-gradient(circle, rgba(0,0,0,.1) 30%, transparent 30%)",
        borderRadius: "50%",
      };
    });

    newSquares[square] = { background: "rgba(255, 255, 0, 0.4)" };
    setOptionSquares(newSquares);

    return true;
  }

  function onSquareClick({ square, piece }) {
    if (!moveFrom) {
      if (piece && getMoveOptions(square)) setMoveFrom(square);
      return;
    }

    const foundMove = game
      .moves({ square: moveFrom, verbose: true })
      .find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      setMoveFrom(getMoveOptions(square) ? square : "");
      return;
    }

    makeMove({
      from: moveFrom,
      to: square,
      promotion: "q",
    });

    setMoveFrom("");
    setOptionSquares({});
    setChessPosition(game.fen());
  }

  function onPieceDrop({ sourceSquare, targetSquare }) {
    makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (!makeMove) return false;

    setOptionSquares({});
    setMoveFrom("");
    setChessPosition(game.fen());

    return true;
  }

   const chessboardOptions = {
    id: "arena-board", 
    onSquareClick,
    onPieceDrop,
    position: fen,
    squareStyles: optionSquares,
    animationDuration: 150,
    customBoardStyle: { borderRadius: 12 },
  };

  return (
    <Chessboard options={chessboardOptions} />
  );
};

export default BoardArea;
