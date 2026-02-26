import supabase from "../config/supabaseClient.js";

export const getAllBadges = async () => {
  return await supabase
    .from("badges")
    .select("*");
};

export const awardBadge = async (data) => {
  return await supabase
    .from("user_badges")
    .insert([data]);
};