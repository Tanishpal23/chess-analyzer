
import express from "express";
import {
  signup,
  login,
  getProfile,
  deleteUserByEmail,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/signup", signup);
router.post("/login", login);

// Protected
router.get("/profile", protect, getProfile);
router.delete("/delete", protect, deleteUserByEmail);

export default router;
