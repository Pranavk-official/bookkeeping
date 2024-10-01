import express from "express";

import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(auth, getAllBooks).post(auth, createBook);

router
  .route("/:id")
  .get(auth, getBookById)
  .put(auth, updateBook)
  .delete(auth, deleteBook);

export default router;
