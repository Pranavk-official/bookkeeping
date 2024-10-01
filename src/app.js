import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import logger from "morgan";

import bookRoutes from "./routes/bookRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(logger("dev"));

// Routes

app.use("/api/books", bookRoutes);
app.use("/api/borrows", borrowRoutes);
app.use("/api/libraries", libraryRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
