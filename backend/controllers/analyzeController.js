import { analyzeWithEngine } from "../services/engineService.js";
import { getGamesCollection } from "../models/Game.js";

export async function analyzePosition(req, res) {
  try {
    const { fen, playerWhite, playerBlack } = req.body;
    if (!fen) return res.status(400).json({ error: "FEN string required" });

    // Step 1: Get engine analysis
    const analysis = await analyzeWithEngine(fen);

    // Step 2: Save to DB
    const games = await getGamesCollection();
    const newGame = {
      fen,
      playerWhite: playerWhite || "Unknown",
      playerBlack: playerBlack || "Unknown",
      analysis,
      createdAt: new Date(),
    };

    const result = await games.insertOne(newGame);

    // Step 3: Return response
    res.json({ message: "Analysis complete", gameId: result.insertedId, analysis });
  } catch (err) {
    console.error("❌ analyzePosition error:", err);
    res.status(500).json({ error: "Server error during analysis" });
  }
}
