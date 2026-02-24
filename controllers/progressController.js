import { saveProgress } from "../models/progressModel.js";
import { getUserById, updateUserPoints} from "../models/userModel.js";
import { updateStreakLogic } from "../models/streakModel.js";
import { successResponse } from "../utils/responseHandler.js";

export const completeFlashcardSession = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { pointsEarned } = req.body;

    // 1️⃣ Get current user
    const { data: user, error: userError } = await getUserById(userId);
    if (userError) throw userError;

    // 2️⃣ Update Points
    const newPoints = (user.total_points || 0) + pointsEarned;

    const { data: updatedUser, error: updateError } =
      await updateUserPoints(userId, newPoints);

    if (updateError) throw updateError;

    // 3️⃣ Update streak logic
    const { data: streakData, error: streakError } =
      await updateStreakLogic(userId);

    if (streakError) throw streakError;

    return successResponse(res, "Flashcard session completed", {
      total_points: updatedUser.total_points,
      streak: streakData,

    });

  } catch (error) {
    next(error);
  }
};

export const addProgress = async (req, res) => {
  try {
    const { lesson_id, score } = req.body;

    const { data: user } = await getUserById(req.user.id);

    const newPoints = user.total_points+ score;

    await updateUserPoints(req.user.id, newPoints);

    const { error } = await saveProgress({
      user_id: req.user.id,
      lesson_id,
      score,
      completed: true
    });

    if (error) throw error;

    res.json({ message: "Progress saved" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchUserProgress = async (req, res, next) => {
  try {
    const { data, error } = await getUserProgress(req.user.id);
    if (error) throw error;

    return successResponse(res, "User progress fetched", data);
  } catch (error) {
    next(error);
  }
};
