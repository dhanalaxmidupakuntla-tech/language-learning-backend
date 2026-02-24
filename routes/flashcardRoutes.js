import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { fetchFlashcards, reviewFlashcard } from "../controllers/flashcardController.js";
import {completeFlashcardSession} from "../controllers/progressController.js"

const router = express.Router();

router.get("/", authMiddleware, fetchFlashcards);
router.post("/review", authMiddleware, reviewFlashcard);
router.post("/flashcard-complete", authMiddleware, completeFlashcardSession);

export default router;