import express from "express";
import { updateStreak, getStreak } from "../controllers/streakController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/update", authMiddleware, updateStreak);
router.get("/:userId", authMiddleware, getStreak);

export default router;