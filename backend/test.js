import connectDB from "./db.js";

async function runTest() {
  const db = await connectDB();
  const users = db.collection("users");

  // Insert Alice only if she doesn't already exist
  await users.updateOne(
    { name: "Alice" },          // filter
    { $set: { role: "tester" } }, // update data
    { upsert: true }            // insert if not exists
  );

  // Fetch all users
  const allUsers = await users.find().toArray();
  console.log(allUsers);

  // Close connection
  db.client?.close(); // optional safety in case MongoClient exposes client
}

runTest();
