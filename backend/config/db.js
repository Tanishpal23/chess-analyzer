
import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let dbInstance; // ✅ cache the database connection

async function connectDB() {
  try {
    if (!dbInstance) {
      await client.connect();
      console.log("✅ MongoDB connected!");
      dbInstance = client.db("chessDB");
    }
    return dbInstance;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop server on fatal DB error
  }
}

export default connectDB;
