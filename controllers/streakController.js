import {
  getUserById,
  createStreak,
  updateUserStreak,
  getDateDifference,
} from "../models/streakModel.js";

import { successResponse, errorResponse } from "../utils/responseHandler.js";

// 🔥 Update streak after review
export const updateStreak = async (req, res) => {
  try {
    const { userId } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const streakData = await getUserById(userId);

    // No streak → create
    if (!streakData) {
      const newStreak = await createStreak(userId, today);
      return successResponse(res, "Streak started 🔥", newStreak);
    }

    const diffDays = getDateDifference(today, streakData.last_activity_date);

    let newCount = streakData.current_streak;

    if (diffDays === 0) {
      return successResponse(res, "Already counted today", streakData);
    }

    if (diffDays === 1) {
      newCount += 1;
    } else {
      newCount = 1;
    }

    const updated = await updateUserStreak(userId, newCount, today);

    return successResponse(res, "Streak updated successfully 🔥", updated);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// 📊 Get streak
export const getStreak = async (req, res) => {
  try {
    const { userId } = req.params;

    const streak = await getUserById(userId);

    if (!streak) {
      return errorResponse(res, "Streak not found", 404);
    }

    return successResponse(res, "Streak fetched successfully", streak);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};