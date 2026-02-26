import express from "express";
import { fetchBadges, giveBadge } from "../controllers/badgeController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", fetchBadges); // public
router.post("/", authMiddleware, giveBadge); // protected

export default router;