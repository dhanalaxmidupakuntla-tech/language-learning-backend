import supabase from "../config/supabaseClient.js";

export const getUserById = async (id) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
};

export const createStreak = async (id, date) => {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        user_id:id,
        streak_count: 1,
        last_active_date: date,
      }
    ])
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export const updateUserStreak = async (id, streak, date) => {
  return await supabase
    .from("users")
    .update({
      streak_count: streak,
      last_active_date: date
    })
    .eq("id", id);
};

export const updateStreakLogic = async (userId) => {
  const today = new Date().toISOString().split("T")[0];

  // Get user
  const { data: user, error } = await supabase
    .from("users")
    .select("streak_count, last_active_date")
    .eq("id", userId)
    .single();

  if (error) return { error };

  let newStreak = 1;

  if (user.last_active_date) {
    const lastDate = new Date(user.last_active_date);
    const diffTime = new Date(today) - lastDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      newStreak = user.streak_count + 1;
    } else if (diffDays === 0) {
      newStreak = user.streak_count;
    } else {
      newStreak = 1;
    }
  }

  return await supabase
    .from("users")
    .update({
      streak_count: newStreak,
      last_active_date: today,
    })
    .eq("id", userId)
    .select()
    .single();
};

export const getDateDifference = (date1, date2) => {
  const diff = Math.abs(new Date(date1) - new Date(date2));
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};