import supabase from "../config/supabaseClient.js";

export const createUser = async (userData) => {
  return await supabase.from("users").insert([userData]).select().single();
};

export const getAllUsers = async () => {
  return await supabase
    .from("users")
    .select("*");
};

export const getUserById = async (id) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
};

export const getUserByEmail = async (email) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();
};

export const updateUserPoints = async (userId, points) => {
  return await supabase
    .from("users")
    .update({ total_points: points })
    .eq("id", userId)
    .select()
    .single();
};

export const getLeaderboard = async () => {
  return await supabase
    .from("users")
    .select("name, total_points, streak_count")
    .order("total_points", { ascending: false })
    .limit(10);
};