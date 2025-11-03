import express from "express";
import {
  signup,
  login,
  logout,
  getAllUsers,
  deleteUserByEmail,
  deleteUserById
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/all", getAllUsers);
router.delete("/delete", deleteUserByEmail);
router.delete("/delete/:id", deleteUserById);


export default router;
