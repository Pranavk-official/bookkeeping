import express from "express";

import { borrowBook, returnBook } from "../controllers/borrowController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/borrow", auth, borrowBook);
router.post("/return/:id", auth, returnBook);

export default router;
