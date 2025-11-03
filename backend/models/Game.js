import connectDB from "../config/db.js";

let gamesCollection;

export async function getGamesCollection() {
  if (!gamesCollection) {
    const db = await connectDB();
    gamesCollection = db.collection("games");
  }
  return gamesCollection;
}
