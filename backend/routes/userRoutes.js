import express from "express";
import { getAllUsers, deleteUserById, logout } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Optional: make these protected if only logged-in users can access them
router.get("/all", getAllUsers);
router.post("/logout", logout);
router.delete("/delete/:id", deleteUserById);

export default router;