// src/context/GameContext.jsx
import { createContext, useState } from "react";

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [timeControl, setTimeControl] = useState({
    kind: "none",
    baseMinutes: 0,
    incrementSeconds: 0,
    hasTimer: false,
  });

  return (
    <GameContext.Provider value={{ timeControl, setTimeControl }}>
      {children}
    </GameContext.Provider>
  );
}
