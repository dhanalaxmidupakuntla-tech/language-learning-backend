import supabase from "../config/supabaseClient.js";

export const saveProgress = async (progressData) => {
  return await supabase.from("flashcard_progress").insert([progressData]);
};

export const getUserProgress = async (userId) => {
  return await supabase
    .from("flashcard_progress")
    .select("*")
    .eq("user_id", userId);
};