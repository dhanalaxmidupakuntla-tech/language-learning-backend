import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if user already exists
    const { data: existingUser, error: fetchError } =
      await getUserByEmail(email);

    // If user FOUND → block registration
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // If error is NOT "no rows found", throw it
    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (data.length > 0 ){
      return res.status(400).json({message: "User already exists"})
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const { data, error } = await createUser({
      name,
      email,
      password: hashedPassword,
      level: "Beginner",
      streak_count: 0,
      total_points: 0
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "User registered",
      user: data
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: user } = await getUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return successResponse(res, "Login successful", { token, user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};