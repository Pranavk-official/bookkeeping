// src/controllers/bookController.js
import Book from "../models/Book.js";
import { uploadImage, deleteImage } from "../utils/firebaseUtils.js";
import { getMessage } from "../utils/languageUtils.js";

export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .select("title author library borrower image")
      .populate("author", "name")
      .populate("library", "name")
      .populate("borrower", "name")
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBooks = await Book.countDocuments();

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorFetchingBooks", req.headers["accept-language"]),
      error: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .select("title author library borrower image")
      .populate("author", "name")
      .populate("library", "name")
      .populate("borrower", "name")
      .lean();

    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorFetchingBook", req.headers["accept-language"]),
      error: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
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
      message: getMessage(
        "bookCreatedSuccessfully",
        req.headers["accept-language"]
      ),
      book: {
        id: book._id,
        title: book.title,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorCreatingBook", req.headers["accept-language"]),
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    if (req.file) {
      if (book.image) {
        await deleteImage(book.image);
      }
      book.image = await uploadImage(req.file);
    }

    book.title = req.body.title || book.title;
    book.author = req.body.authorId || book.author;
    book.library = req.body.libraryId || book.library;

    await book.save();

    res.json({
      message: getMessage(
        "bookUpdatedSuccessfully",
        req.headers["accept-language"]
      ),
      book: {
        id: book._id,
        title: book.title,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorUpdatingBook", req.headers["accept-language"]),
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    if (book.image) {
      await deleteImage(book.image);
    }

    res.json({
      message: getMessage(
        "bookDeletedSuccessfully",
        req.headers["accept-language"]
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage("errorDeletingBook", req.headers["accept-language"]),
      error: error.message,
    });
  }
};
