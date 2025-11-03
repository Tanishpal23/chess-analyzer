import { ObjectId } from "mongodb";
import { getGamesCollection } from "../models/Game.js";

export async function getAllGames(req, res) {
  const games = await getGamesCollection();
  const all = await games.find().sort({ createdAt: -1 }).toArray();
  res.json(all);
}

export async function getGameById(req, res) {
  try {
    const games = await getGamesCollection();
    const game = await games.findOne({ _id: new ObjectId(req.params.id) });
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.json(game);
  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
}

export async function deleteGame(req, res) {
  try {
    const games = await getGamesCollection();
    const result = await games.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Game not found" });
    res.json({ message: "Game deleted successfully" });
  } catch {
    res.status(400).json({ error: "Invalid ID format" });
  }
}
