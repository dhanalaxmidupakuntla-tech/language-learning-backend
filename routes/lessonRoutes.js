import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { fetchLessons, fetchLessonById } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/", authMiddleware, fetchLessons);
router.get("/:id", authMiddleware, fetchLessonById);

export default router;