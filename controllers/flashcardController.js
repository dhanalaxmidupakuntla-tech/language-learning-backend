import { getFlashcardsByLevel, saveUserFlashcard } from "../models/flashcardModel.js";
import { successResponse } from "../utils/responseHandler.js";

export const fetchFlashcards = async (req, res, next) => {
  try {
    const { level = "Beginner" } = req.query;

    const { data, error } = await getFlashcardsByLevel(
      level,
      req.user.id
    );

    if (error) throw error;

    const formatted = data.map(card => ({
      id: card.id,
      word: card.word,
      meaning: card.meaning,
      example: card.example,
      level: card.level,
      interval:
        Array.isArray(card.flashcard_progress) &&
        card.flashcard_progress.length > 0
          ? card.flashcard_progress[0].interval
          : 1
    }));

    return successResponse(res, "Flashcards fetched", formatted);
  } catch (error) {
    next(error);
  }
};

// Spaced repetition logic
export const reviewFlashcard = async (req, res) => {
  const { flashcard_id, correct } = req.body;
  const userId = req.user.id;

  const { data: progress } = await supabase
    .from("flashcard_progress")
    .select("*")
    .eq("flashcard_id", flashcard_id)
    .eq("user_id", userId)
    .maybeSingle(); // ✅ safe

  let interval = progress?.interval || 1;

  interval = correct ? interval * 2 : 1;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  if (!progress) {
    await supabase.from("flashcard_progress").insert({
      user_id: userId,
      flashcard_id,
      interval,
      next_review: nextReview
    });
  } else {
    await supabase
      .from("flashcard_progress")
      .update({ interval, next_review: nextReview })
      .eq("id", progress.id);
  }

  res.json({ success: true, interval });
};