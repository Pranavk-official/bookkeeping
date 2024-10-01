import express from "express";

import {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
} from "../controllers/libraryController";

import auth from "../middleware/auth";

const router = express.Router();

router.route("/").get(auth, getAllLibraries).post(auth, createLibrary);

router
  .route("/:id")
  .get(auth, getLibraryById)
  .put(auth, updateLibrary)
  .delete(auth, deleteLibrary);

export default router;
