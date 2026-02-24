import supabase from "../config/supabaseClient.js";

export const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user info
    const { data: user } = await supabase
      .from("users")
      .select("total_points, streak_count")
      .eq("id", userId)
      .single();

    // Total reviews
    const { count: totalReviews } = await supabase
      .from("flashcard_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Weekly reviews
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count: weeklyReviews } = await supabase
      .from("flashcard_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("next_review", oneWeekAgo.toISOString());

    res.json({
      success: true,
      data: {
        totalPoints: user.total_points,
        streak: user.streak_count,
        totalReviews,
        weeklyReviews,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};