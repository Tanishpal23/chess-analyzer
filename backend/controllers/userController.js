// controllers/userController.js
import bcrypt from "bcryptjs";
import { getUsersCollection } from "../models/User.js";
import { ObjectId } from "mongodb";

// 🧩 POST /api/users/signup
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields (name, email, password) are required" });
    }

    const users = await getUsersCollection();

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({
      name,
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
}


export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const users = await getUsersCollection();

    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // (Optional) You could generate a JWT token here
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      // token, // Uncomment if you add JWT later
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
}

export async function logout(req, res) {
  try {
    // In a stateless API (like with JWT), logout is handled client-side
    // You can simply instruct the client to delete the token
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("❌ Logout error:", err);
    res.status(500).json({ error: "Server error during logout" });
  }
}



// 🧩 GET /api/users/all
export async function getAllUsers(req, res) {
  try {
    const users = await getUsersCollection();

    // Fetch all users except password
    const allUsers = await users.find({}, { projection: { password: 0 } }).toArray();

    res.status(200).json(allUsers);
  } catch (err) {
    console.error("❌ Error fetching all users:", err);
    res.status(500).json({ error: "Server error while fetching users" });
  }
}



// 🧩 DELETE /api/users/delete
export async function deleteUserByEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required to delete a user" });
    }

    const users = await getUsersCollection();
    const result = await users.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: `User with email ${email} deleted successfully` });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ error: "Server error while deleting user" });
  }
}



// 🧩 DELETE /api/users/delete/:id
export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const users = await getUsersCollection();

    const result = await users.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("❌ Error deleting user by ID:", err);
    res.status(500).json({ error: "Server error while deleting user by ID" });
  }
}