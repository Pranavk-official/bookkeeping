// src/models/library.js
import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  borrowedBooks: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      borrower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      borrowedAt: { type: Date, default: Date.now },
      returnedAt: { type: Date },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Library", librarySchema);
