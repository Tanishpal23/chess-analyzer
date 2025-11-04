
import { getUsersCollection } from "../models/User.js";
import { ObjectId } from "mongodb";

// 🧩 GET /api/users/all
export async function getAllUsers(req, res) {
  try {
    const users = await getUsersCollection();
    const allUsers = await users.find({}, { projection: { password: 0 } }).toArray();
    res.status(200).json(allUsers);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Server error while fetching users" });
  }
}

// 🧩 POST /api/users/logout
export async function logout(req, res) {
  try {
    // In stateless JWT auth, logout is handled on the client by removing the token.
    // Optionally, you could implement token blacklisting if you store tokens server-side.
    res.status(200).json({ 
      message: "Logout successful. Please remove your token from client storage." 
    });
  } catch (err) {
    console.error("❌ Logout error:", err);
    res.status(500).json({ error: "Server error during logout" });
  }
}

// 🧩 DELETE /api/users/delete/:id
export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const users = await getUsersCollection();
    const result = await users.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("❌ Delete user by ID error:", err);
    res.status(500).json({ error: "Server error while deleting user" });
  }
}
