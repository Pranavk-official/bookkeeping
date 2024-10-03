// src/controllers/borrowController.js
import Book from "../models/book.js";
import Library from "../models/library.js";
import { getMessage } from "../utils/languageUtils.js";
import asyncHandler from "express-async-handler";

export const borrowBook = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error(getMessage("bookNotFound", req.headers["accept-language"]));
  }

  if (book.borrower) {
    res.status(400);
    throw new Error(
      getMessage("bookAlreadyBorrowed", req.headers["accept-language"])
    );
  }

  book.borrower = {
    user: req.user._id,
    borrowedAt: Date.now(),
  };

  const library = await Library.findById(book.library);
  library.borrowedBooks.push({
    book: book._id,
    borrower: req.user._id,
    borrowedAt: Date.now(),
  });

  await Promise.all([book.save(), library.save()]);

  res.json({
    message: getMessage(
      "bookBorrowedSuccessfully",
      req.headers["accept-language"]
    ),
    book,
  });
});

export const returnBook = asyncHandler(async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error(getMessage("bookNotFound", req.headers["accept-language"]));
  }

  if (!book.borrower) {
    res.status(400);
    throw new Error(
      getMessage("bookNotBorrowed", req.headers["accept-language"])
    );
  }

  if (book.borrower.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error(getMessage("notBorrower", req.headers["accept-language"]));
  }

  book.borrower = null;

  const library = await Library.findById(book.library);
  const borrowedBookIndex = library.borrowedBooks.findIndex(
    (borrowedBook) => borrowedBook.book.toString() === bookId
  );
  if (borrowedBookIndex !== -1) {
    library.borrowedBooks.splice(borrowedBookIndex, 1);
  }

  await Promise.all([book.save(), library.save()]);

  res.json({
    message: getMessage(
      "bookReturnedSuccessfully",
      req.headers["accept-language"]
    ),
    book,
  });
});
