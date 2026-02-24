import { getLeaderboard } from "../models/userModel.js";
import { successResponse } from "../utils/responseHandler.js";

export const fetchLeaderboard = async (req, res, next) => {
  try {
    const { data, error } = await getLeaderboard();
    if (error) throw error;

    return successResponse(res, "Leaderboard fetched", data);
  } catch (error) {
    next(error);
  }
};