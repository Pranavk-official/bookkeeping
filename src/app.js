import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import logger from "morgan";

const app = express();

// Middleware
app.use(express.json());
app.use(logger("dev"));

// Routes

// Error handling middleware
app.use(errorHandler);

export default app;
