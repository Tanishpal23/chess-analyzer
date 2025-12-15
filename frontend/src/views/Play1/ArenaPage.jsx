import React from "react";
import ChatPanel from "./Components/ChatPanel.jsx";
import MoveList from "./Components/MoveList.jsx";
import Controls from "./Components/Controls.jsx";
import Navigation from "./Components/Navigation.jsx";
import Fen from "./Components/Fen.jsx";
import Pgn from "./Components/Pgn.jsx";
import Player1 from "./Components/Player1";
import Player2 from "./Components/Player2";
// import BoardArea from "./Components/BoardArea";
import { useChessStore } from "../../store/useChessStore";


import BoardArea from "./Components/BoardAreaComputer.jsx"
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
