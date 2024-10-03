// src/routes/bookRoutes.js
import express from "express";
import {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .get(auth, getAllBooks)
  .post(auth, upload.single("image"), createBook);

router
  .route("/:id")
  .get(auth, getBookById)
  .put(auth, updateBook)
  .delete(auth, deleteBook);

export default router;
