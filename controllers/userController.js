import {
  getLeaderboard,
  getUserByEmail,
  getUserById,
  updateUserPoints,
  getAllUsers,
  createUser
} from "../models/userModel.js";

import { successResponse } from "../utils/responseHandler.js";

export const createUserController = async (req, res, next) => {
  try {
    const { name, email, total_points = 0 } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const { data, error } = await createUser({

      name,
      email,
      total_points,
    });

    if (error) throw error;

    return successResponse(res, "User created successfully", data);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { data, error } = await getUserById(userId);

    if (error) throw error;

    return successResponse(res, "Profile fetched", data);

  } catch (error) {
    next(error);
  }
};

/* Leaderboard */
export const fetchLeaderboard = async (req, res, next) => {
  try {
    const { data } = await getLeaderboard();
    return successResponse(res, "Leaderboard fetched", data);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (req, res, next) => {
  try {
    const { data } = await getAllUsers();
    return successResponse(res, "All users fetched", data);
  } catch (error) {
    next(error);
  }
};

/* Get user by email */
export const getUserByEmailController = async (req, res, next) => {
  try {
    const { email } = req.params;
    const data = await getUserByEmail(email);
    return successResponse(res, "User fetched by email", data);
  } catch (error) {
    next(error);
  }
};

/* Get user by id */
export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    return successResponse(res, "User fetched by id", data);
  } catch (error) {
    next(error);
  }
};

/* Update user points */
export const updateUserPointsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { points } = req.body;

    const {data, error} = await updateUserPoints(id, points);
    if (error) throw error;
    return successResponse(res, "User points updated", data);
  } catch (error) {
    next(error);
  }
};
