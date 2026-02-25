import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const { data: existingUser, error: fetchError } =
      await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
      user: data,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const { data: user, error } = await getUserByEmail(email);

    if (error || !user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};