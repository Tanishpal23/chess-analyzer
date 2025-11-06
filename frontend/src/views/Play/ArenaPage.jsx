// src/views/Play/ArenaPage.jsx

import React from "react";
import { useSearchParams } from "react-router-dom";

// 🎮 Mode-specific hooks
import useComputerMode from "./Arena/modes/useComputerMode.js";
import useFriendMode from "./Arena/modes/useFriendMode.js";
import useOfflineMode from "./Arena/modes/useOfflineMode.js";

// 🧩 Arena layout components
import ArenaHeader from "./Arena/ArenaHeader.jsx";
import BoardArea from "./Arena/BoardArea.jsx";
import ChatPanel from "./Arena/ChatPanel.jsx";
import ControlPanel from "./Arena/ControlPanel.jsx";
import FenPanel from "./Arena/FenPanel.jsx";

import "../../styles/ArenaPage.css"; // (optional future CSS file)
export default function ArenaPage() {
  const [params] = useSearchParams();
  const mode = params.get("mode") || "computer";

  const logic =
    mode === "friend"
      ? useFriendMode()
      : mode === "offline"
      ? useOfflineMode()
      : useComputerMode();

  return (
    <div className="arena-page container-fluid py-2">
      <ArenaHeader mode={mode} logic={logic} />
      <div className="row g-3 mt-1 arena-layout">
        {/* Left column - Chat / Info */}
        <div className="col-12 col-lg-3 order-2 order-lg-1 arena-col">
          <ChatPanel logic={logic} />
        </div>

        {/* Center column - Chessboard */}
        <div className="col-12 col-lg-6 order-1 order-lg-2 d-flex arena-col justify-content-center">
          <BoardArea logic={logic} />
        </div>

        {/* Right column - FEN + Controls */}
        <div className="col-12 col-lg-3 order-3 arena-col">
          <FenPanel logic={logic} />
          <ControlPanel logic={logic} className="mt-3" />
        </div>
      </div>
    </div>
  );
}
