import supabase from "../config/supabaseClient.js";

export const getQuizByLesson = async (lessonId) => {
  return await supabase
    .from("quizzes")
    .select("*")
    .eq("lesson_id", lessonId);
};

export const submitQuizAttempt = async (data) => {
  return await supabase
    .from("user_quiz_attempts")
    .insert([data]);
};