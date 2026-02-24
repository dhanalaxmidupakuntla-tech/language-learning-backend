export const awardBadge = async (data) => {
  return await supabase.from("user_badges").insert([data]);
};