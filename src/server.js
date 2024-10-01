// src/server.js
import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";

// import "./config/firebase.js";

import logger from "morgan";

const app = express();

// Middleware
app.use(express.json());

// Logger
app.use(logger("dev"));

// Connect to MongoDB
connectDB();

// Routes [TODO: Add routes for api]

// Error handling middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // For testing purposes
