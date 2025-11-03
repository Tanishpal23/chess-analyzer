import express from "express";
import { analyzePosition } from "../controllers/analyzeController.js";

const router = express.Router();

router.post("/", analyzePosition);

export default router;
