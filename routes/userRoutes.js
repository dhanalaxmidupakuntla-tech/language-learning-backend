import express from "express";
import {
  fetchLeaderboard,
  getUserByEmailController,
  getUserByIdController,
  updateUserPointsController,
  getAllUsersController,
  createUserController,
  getMyProfile
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

/**
 * GET leaderboard
 * GET /api/users/leaderboard
 */
router.post("/", createUserController);

router.get("/", getAllUsersController);
router.get("/me", authMiddleware, getMyProfile);
router.get("/leaderboard", fetchLeaderboard);

/**
 * GET user by email
 * GET /api/users/email/:email
 */
router.get("/email/:email", getUserByEmailController);

/**
 * GET user by id
 * GET /api/users/:id
 */
router.get("/:id", getUserByIdController);

/**
 * UPDATE user points
 * POST /api/users/:id/points
 */
router.post("/:id/points", updateUserPointsController);

export default router;