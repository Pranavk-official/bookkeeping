import express from "express";
import {
  getAllLibraries,
  createLibrary,
  getLibraryById,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory,
} from "../controllers/libraryController.js";
import auth from "../middleware/auth.js";
import { authRole } from "../middleware/authRole.js";

const router = express.Router();

router
  .route("/")
  .get(auth, getAllLibraries)
  .post(auth, authRole(["author", "admin"]), createLibrary);

router
  .route("/:id")
  .get(auth, getLibraryById)
  .put(auth, authRole(["author", "admin"]), updateLibrary)
  .delete(auth, authRole(["author", "admin"]), deleteLibrary);

router
  .route("/:id/inventory")
  .get(auth, getLibraryInventory)
  .post(auth, authRole(["author", "admin", "librarian"]), addBookToInventory);

router
  .route("/:id/inventory/:bookId")
  .delete(
    auth,
    authRole(["author", "admin", "librarian"]),
    removeBookFromInventory
  );

export default router;
