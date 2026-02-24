import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { completeFlashcardSession, fetchUserProgress, addProgress } from "../controllers/progressController.js";

const router = express.Router();

router.get("/", authMiddleware, fetchUserProgress);
router.post("/", authMiddleware, addProgress);
router.post("/:userId/flashcard-complete", authMiddleware, completeFlashcardSession);

export default router;