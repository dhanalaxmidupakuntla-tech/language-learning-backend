import supabase from "../config/supabaseClient.js";

// Get flashcards by level
export const getFlashcardsByLevel = async (level, userId) => {
  return await supabase
    .from("flashcards")
    .select(`
      id,
      word,
      meaning,
      example,
      level,
      flashcard_progress (
        interval
      )
    `)
    .eq("level", level)
    .eq("flashcard_progress.user_id", userId);
};

// Save user flashcard progress
export const saveUserFlashcard = async (data) => {
  return await supabase
    .from("flashcard_progress")
    .select("*")
    .upsert([data]);
};