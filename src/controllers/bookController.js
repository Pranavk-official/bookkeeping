import asyncHandler from "express-async-handler";
import Book from "../models/Book.js";
import { uploadImage, deleteImage } from "../utils/firebaseUtils.js";

export const getAllBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const books = await Book.find().skip(skip).limit(limit).lean();

  const totalBooks = await Book.countDocuments();

  res.json({
    books,
    totalPages: Math.ceil(totalBooks / limit),
    currentPage: page,
    totalBooks,
  });
};

export const getBookById = async (req, res) => {
  res.send("getBookById");
};

export const createBook = asyncHandler(async (req, res) => {
  const { title, authorId, libraryId } = req.body;

  let imageUrl = "";

  if (req.file) {
    imageUrl = await uploadImage(req.file);
  }

  const book = new Book({
    title,
    author: authorId,
    library: libraryId,
    image: imageUrl,
  });

  await book.save();

  res.status(201).json({
    message: "Book created successfully",
    book: {
      id: book._id,
      title: book.title,
    },
  });
});

export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (req.file) {
    if (book.image) {
      await deleteImage(book.image);
    }

    const imageUrl = await uploadImage(req.file);
    book.image = imageUrl;
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.library = req.body.library || book.library;

  await book.save();

  res.status(200).json({
    message: "Book updated successfully",
    id: book._id,
    title: book.title,
  });
};

export const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.image) {
    await deleteImage(book.image);
  }

  res.status(200).json({
    message: "Book deleted successfully",
  });
});
