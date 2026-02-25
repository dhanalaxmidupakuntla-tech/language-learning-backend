import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, "All fields are required", 400);
    }

    const { data: existingUser } = await getUserByEmail(email);

    if (existingUser) {
      return errorResponse(res, "User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await createUser({
      name,
      email,
      password: hashedPassword,
      level: "Beginner",
      streak_count: 0,
      total_points: 0,
    });

    if (error) {
      console.error("Create user error:", error.message);
      return errorResponse(res, "Failed to create user", 500);
    }

    return successResponse(
      res,
      "User registered successfully",
      data,
      201
    );

  } catch (error) {
    console.error("Register error:", error.message);
    return errorResponse(res, "Server error", 500);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password required", 400);
    }

    const { data: user } = await getUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing");
      return errorResponse(res, "Server misconfiguration", 500);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return successResponse(res, "Login successful", {
      token,
      user,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    return errorResponse(res, "Server error", 500);
  }
};