// borrowController.js
import Book from "../models/Book.js";
import Library from "../models/Library.js";
import { getMessage } from "../utils/languageUtils.js";

export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    if (book.borrower) {
      return res.status(400).json({
        message: getMessage(
          "bookAlreadyBorrowed",
          req.headers["accept-language"]
        ),
      });
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
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorBorrowingBook", req.headers["accept-language"]),
      error: error.message,
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    if (!book.borrower) {
      return res.status(400).json({
        message: getMessage("bookNotBorrowed", req.headers["accept-language"]),
      });
    }

    if (book.borrower.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: getMessage("notBorrower", req.headers["accept-language"]),
      });
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
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorReturningBook", req.headers["accept-language"]),
      error: error.message,
    });
  }
};
