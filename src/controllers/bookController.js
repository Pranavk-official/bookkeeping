import asyncHandler from "express-async-handler";
import Book from "../models/book";

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
  // TODO: add upload image using firebase/storage
  const { title, author, library, borrower, image } = req.body;

  const book = new Book({
    title,
    author,
    library,
    borrower,
    image,
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
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
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

  res.status(200).json({
    message: "Book deleted successfully",
  });
});
