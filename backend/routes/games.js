import express from "express";
import { getAllGames, getGameById, deleteGame } from "../controllers/gameController.js";

const router = express.Router();

router.get("/", getAllGames);
router.get("/:id", getGameById);
router.delete("/:id", deleteGame);

export default router;
