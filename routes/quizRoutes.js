import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { submitQuiz, fetchQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/:lessonId", authMiddleware, fetchQuiz);
router.post("/submit", authMiddleware, submitQuiz);

export default router;