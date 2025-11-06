import { useState } from "react";

export default function useComputerMode() {
  // placeholder game state
  const [fen, setFen] = useState("start");
  const [moves, setMoves] = useState([]);
  const [orientation] = useState("white");

  // timers, players, etc.
  const [clocks] = useState({ white: "05:00", black: "05:00" });
  const [whitePlayer] = useState({ displayName: "You" });
  const [blackPlayer] = useState({ displayName: "Computer" });

  // chat placeholders
  const [messages, setMessages] = useState([]);
  const [chatDraft, setChatDraft] = useState("");

  // dummy FEN + PGN
  const pgn = moves.join(" ");
  const resultBanner = "";

  function onDrop(source, target) {
    console.log("Piece dropped:", source, target);
    setMoves([...moves, `${source}-${target}`]);
    return true;
  }

  function sendMessage() {
    if (!chatDraft.trim()) return;
    const msg = { text: chatDraft, when: new Date().toLocaleTimeString() };
    setMessages([...messages, msg]);
    setChatDraft("");
  }

  // dummy nav / control
  const logic = {
    fen,
    pgn,
    moves,
    orientation,
    highlightSquares: {},
    onDrop,

    // players + time
    whitePlayer,
    blackPlayer,
    clocks,
    resultBanner,

    // chat
    messages,
    chatDraft,
    setChatDraft,
    sendMessage,

    // control panel
    toStart: () => console.log("toStart"),
    prev: () => console.log("prev"),
    toggleAutoplay: () => console.log("toggleAutoplay"),
    next: () => console.log("next"),
    toEnd: () => console.log("toEnd"),
    resign: () => console.log("resign"),
    offerDraw: () => console.log("offerDraw"),
    saveGame: () => console.log("saveGame"),
  };

  return logic;
}
