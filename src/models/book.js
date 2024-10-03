// src/models/book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  library: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
    required: true,
  },
  borrower: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    borrowedAt: { type: Date },
    returnedAt: { type: Date },
  },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Book", bookSchema);
