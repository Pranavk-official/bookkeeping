// src/controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { getMessage } from "../utils/languageUtils.js";
import { generateToken } from "../utils/jwtUtils.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: getMessage(
          "allFieldsRequired",
          req.headers["accept-language"]
        ),
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: getMessage(
          "userAlreadyExists",
          req.headers["accept-language"]
        ),
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: getMessage(
        "userRegisteredSuccessfully",
        req.headers["accept-language"]
      ),
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorRegisteringUser",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: getMessage(
          "invalidCredentials",
          req.headers["accept-language"]
        ),
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: getMessage("loginSuccessful", req.headers["accept-language"]),
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorLoggingIn", req.headers["accept-language"]),
      error: error.message,
    });
  }
};
