import { getAllBadges, awardBadge } from "../models/badgeModel.js";

export const fetchBadges = async (req, res) => {
  const { data, error } = await getAllBadges();

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json(data);
};

export const giveBadge = async (req, res) => {
  const { user_id, badge_id } = req.body;

  const { error } = await awardBadge({ user_id, badge_id });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: "Badge awarded successfully",
  });
};