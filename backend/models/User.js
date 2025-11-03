import connectDB from "../config/db.js";

let usersCollection;

export async function getUsersCollection() {
  if (!usersCollection) {
    const db = await connectDB();
    usersCollection = db.collection("users");
  }
  return usersCollection;
}

