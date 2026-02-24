import supabase from "../config/supabaseClient.js";

export const getAllLessons = async () => {
  return await supabase.from("lessons").select("*");
};

export const getLessonById = async (id) => {
  return await supabase.from("lessons").select("*").eq("id", id).single();
};