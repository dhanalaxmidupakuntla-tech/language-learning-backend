import express from "express";
import { fetchLessons, fetchLessonById } from "../controllers/lessonController.js";

const router = express.Router();

router.get("/", fetchLessons);
router.get("/:id", fetchLessonById);

export default router;