import connectDB from "./db.js";

async function runTest() {
  const db = await connectDB();
  const users = db.collection("users");

  // 🧹 Delete all users
  await users.deleteMany({});
  console.log("All users deleted");

  // Optional: verify deletion
  const remaining = await users.find().toArray();
  console.log("Remaining users:", remaining);

  db.client?.close();
}

runTest();
