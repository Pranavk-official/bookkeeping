import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateToken } from "../utils/jwtUtils";

// TODO: use custom error handling with try catch

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();

  res.status(201).json({
    userId: user._id,
    message: "User created successfully",
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user && !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id, user.role);
  res.status(200).json({ token, message: "Login successful" });
});
