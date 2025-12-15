import { create } from "zustand";
import { Chess } from "chess.js";

export const useChessStore = create((set, get) => ({
  playMode: 'Computer',
  turn: 0,
  game: new Chess(),
  fen: new Chess().fen(),
  pgn: new Chess().pgn(),
  moveList: [],

  // ---- Set playMode ----
  setPlayMode: (mode) => set({ playMode: mode }),
  // ---- Update move list ----
  generateMoveList: () => {
    const game = get().game;
    const hist = game.history();
    const rows = [];
    for (let i = 0; i < hist.length; i += 2)
      rows.push([Math.floor(i / 2) + 1, hist[i] ?? "", hist[i + 1] ?? ""]);
    set({ moveList: rows });
  },

  // ---- Make move (from board) ----
  makeMove: (move) => {
    const game = get().game;

    game.move(move);
    set({
      fen: game.fen(),
      pgn: game.pgn()
    });

    get().generateMoveList();
    console.log(get().playMode);
  },

  // ---- Undo ----
  undo: () => {
    const game = get().game;

    game.undo();

    set({
      fen: game.fen(),
      pgn: game.pgn()
    });

    get().generateMoveList();
  },

  // ---- Reset game ----
  reset: () => {
    const game = get().game;

    game.reset();

    set({
      fen: game.fen(),
      pgn: game.pgn()
    });

    get().generateMoveList();
  },

  // ---- Navigation (PGN browsing) ----
  goToFirst: () => {
    const game = get().game;
    const hist = game.history({ verbose: true });

    game.reset();
    set({ fen: game.fen() });
  },

  goToLast: () => {
    const game = get().game;
    const hist = game.history({ verbose: true });

    game.reset();
    hist.forEach((m) => game.move(m));

    set({ fen: game.fen() });
  },

  goToNext: () => {}, // optional implement
  goToPrev: () => {}, // optional implement
}));