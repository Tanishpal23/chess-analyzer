import React from "react";
import ChatPanel from "./components/ChatPanel";
import MoveList from "./components/MoveList";
import Controls from "./Components/Controls.jsx";
import Navigation from "./components/Navigation";
import Fen from "./components/Fen";
import Pgn from "./components/Pgn";
import Player1 from "./components/Player1";
import Player2 from "./components/Player2";
import BoardArea from "./components/BoardArea";
import { useChessStore } from "../../store/useChessStore";

export default function ArenaPage() {
  const {
    fen,
    pgn,
    moveList,
    undo,
    reset,
  } = useChessStore();

  return (
    <div className="arena light">
      <ChatPanel />

      <main className="center">
        <Player1 />

        <div className="board-wrap">
          <BoardArea />
        </div>

        <Player2 />
      </main>

      <aside className="panel right">
        <MoveList moveList={moveList} />

        <Navigation />

        <Controls undo={undo} reset={reset} />

        <Fen fen={fen} />

        <Pgn pgn={pgn} />
      </aside>
    </div>
  );
}
