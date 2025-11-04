
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsersCollection } from "../models/User.js";
import { ObjectId } from "mongodb";

// 🔐 Utility: Generate JWT
function generateToken(userId, email) {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

// 🧩 POST /api/auth/signup
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const users = await getUsersCollection();
    const existingUser = await users.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = generateToken(result.insertedId, email);
    res.status(201).json({
      message: "Signup successful",
      user: { id: result.insertedId, name, email },
      token,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
}

// 🧩 POST /api/auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const users = await getUsersCollection();
    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = generateToken(user._id, user.email);
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
}

// 🧩 GET /api/auth/profile (Protected)
export async function getProfile(req, res) {
  try {
    const users = await getUsersCollection();
    const user = await users.findOne(
      { _id: new ObjectId(req.user.userId) },
      { projection: { password: 0 } }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ error: "Server error fetching profile" });
  }
}

// 🧩 DELETE /api/auth/delete (Protected)
export async function deleteUserByEmail(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const users = await getUsersCollection();
    const result = await users.deleteOne({ email });

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: `User with email ${email} deleted successfully` });
  } catch (err) {
    console.error("❌ Delete user error:", err);
    res.status(500).json({ error: "Server error while deleting user" });
  }
}
