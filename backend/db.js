import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"; // local MongoDB
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected!");
    const db = client.db("chessDB"); // the database you created
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

export default connectDB;
