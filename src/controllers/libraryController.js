// src/controllers/libraryController.js
import Library from "../models/Library.js";
import Book from "../models/book.js";
import { getMessage } from "../utils/languageUtils.js";

export const getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find().lean();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorFetchingLibraries",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id)
      .populate("books")
      .lean();

    if (!library) {
      return res.status(404).json({
        message: getMessage("libraryNotFound", req.headers["accept-language"]),
      });
    }

    res.json(library);
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorFetchingLibrary",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const createLibrary = async (req, res) => {
  try {
    const library = new Library(req.body);
    await library.save();

    res.status(201).json({
      message: getMessage(
        "libraryCreatedSuccessfully",
        req.headers["accept-language"]
      ),
      library: {
        id: library._id,
        name: library.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorCreatingLibrary",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const updateLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!library) {
      return res.status(404).json({
        message: getMessage("libraryNotFound", req.headers["accept-language"]),
      });
    }

    res.json({
      message: getMessage(
        "libraryUpdatedSuccessfully",
        req.headers["accept-language"]
      ),
      library: {
        id: library._id,
        name: library.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorUpdatingLibrary",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id);

    if (!library) {
      return res.status(404).json({
        message: getMessage("libraryNotFound", req.headers["accept-language"]),
      });
    }

    res.json({
      message: getMessage(
        "libraryDeletedSuccessfully",
        req.headers["accept-language"]
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorDeletingLibrary",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const getLibraryInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate("books");

    if (!library) {
      return res.status(404).json({
        message: getMessage("libraryNotFound", req.headers["accept-language"]),
      });
    }

    res.json(library.books);
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorFetchingInventory",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const addBookToInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({
        message: getMessage("libraryNotFound", req.headers["accept-language"]),
      });
    }

    const book = await Book.findById(req.body.bookId);
    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    library.books.push(book._id);
    book.library = library._id;
    await Promise.all([library.save(), book.save()]);

    res.json({
      message: getMessage(
        "bookAddedToInventory",
        req.headers["accept-language"]
      ),
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorAddingToInventory",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};

export const removeBookFromInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({
        message: getMessage("libraryNotFound", req.headers["accept-language"]),
      });
    }

    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        message: getMessage("bookNotFound", req.headers["accept-language"]),
      });
    }

    library.books = library.books.filter(
      (id) => id.toString() !== book._id.toString()
    );
    book.library = null;
    await Promise.all([library.save(), book.save()]);

    res.json({
      message: getMessage(
        "bookRemovedFromInventory",
        req.headers["accept-language"]
      ),
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: getMessage(
        "errorRemovingFromInventory",
        req.headers["accept-language"]
      ),
      error: error.message,
    });
  }
};
