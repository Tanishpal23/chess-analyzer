import express from "express";
import analyzeRoutes from "./routes/analyze.js";
import gameRoutes from "./routes/games.js";
import userRoutes from "./routes/users.js";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


// ✅ API Routes
app.use("/api/analyze", analyzeRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/users", userRoutes); // added user module

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
