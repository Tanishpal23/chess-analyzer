import { useState } from "react";

export default function useFriendMode() {
  const [fen, setFen] = useState("start");
  const [moves, setMoves] = useState([]);
  const [orientation] = useState("white");

  const [clocks] = useState({ white: "10:00", black: "10:00" });
  const [whitePlayer] = useState({ displayName: "You" });
  const [blackPlayer] = useState({ displayName: "Friend" });

  const [messages, setMessages] = useState([]);
  const [chatDraft, setChatDraft] = useState("");

  const pgn = moves.join(" ");
  const resultBanner = "";

  function onDrop(source, target) {
    setMoves([...moves, `${source}-${target}`]);
    return true;
  }

  function sendMessage() {
    if (!chatDraft.trim()) return;
    const msg = { text: chatDraft, when: new Date().toLocaleTimeString() };
    setMessages([...messages, msg]);
    setChatDraft("");
  }

  return {
    fen,
    pgn,
    moves,
    orientation,
    highlightSquares: {},
    onDrop,
    whitePlayer,
    blackPlayer,
    clocks,
    resultBanner,
    messages,
    chatDraft,
    setChatDraft,
    sendMessage,
    toStart: () => {},
    prev: () => {},
    toggleAutoplay: () => {},
    next: () => {},
    toEnd: () => {},
    resign: () => {},
    offerDraw: () => {},
    saveGame: () => {},
  };
}
