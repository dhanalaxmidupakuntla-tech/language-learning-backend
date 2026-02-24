import { getFlashcardsByLevel, saveUserFlashcard } from "../models/flashcardModel.js";
import { successResponse } from "../utils/responseHandler.js";

export const fetchFlashcards = async (req, res, next) => {
  try {
    const { level } = req.query;

    const { data, error } = await getFlashcardsByLevel(level);
    if (error) throw error;

    return successResponse(res, "Flashcards fetched", data);
  } catch (error) {
    next(error);
  }
};

// Spaced repetition logic
export const reviewFlashcard = async (req, res) => {
  const { flashcard_id, correct } = req.body;

  const { data, error } = await supabase
    .from("flashcard_progress")
    .select("*")
    .eq("flashcard_id", flashcard_id)
    .eq("user_id", req.user.id)
    .single();

  if (error) return res.status(400).json({ success: false, message: error.message });

  let newInterval;

  if (correct) {
    newInterval = data.interval * 2; // double interval
  } else {
    newInterval = 1; // reset if wrong
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  await supabase
    .from("flashcard_progress")
    .update({
      interval: newInterval,
      next_review: nextReviewDate
    })
    .eq("id", data.id);

  return res.json({ success: true });
};