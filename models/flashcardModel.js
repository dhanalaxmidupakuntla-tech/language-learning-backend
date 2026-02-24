import supabase from "../config/supabaseClient.js";

// Get flashcards by level
export const getFlashcardsByLevel = async (level) => {
  return await supabase
    .from("flashcards")
    .select("*")
    .eq("level", level);
};

// Save user flashcard progress
export const saveUserFlashcard = async (data) => {
  return await supabase
    .from("flashcard_progress")
    .select("*")
    .upsert([data]);
};