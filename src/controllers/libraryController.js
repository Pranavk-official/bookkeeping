import asyncHandler from "express-async-handler";
import Library from "../models/Library.js";

export const getAllLibraries = async (req, res) => {
  res.send("getAllLibraries");
};

export const createLibrary = asyncHandler(async (req, res) => {
  const library = new Library(req.body);
  await library.save();
  res.status(201).json({
    message: "Library created successfully",
    library: {
      id: library._id,
      name: library.name,
    },
  });
});

export const getLibraryById = asyncHandler(async (req, res) => {
  const library = await Library.findById(req.params.id).populate("books");

  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }
  res.json({
    id: library._id,
    name: library.name,
  });
});

export const updateLibrary = asyncHandler(async (req, res) => {
  const library = await Library.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }
  res.json({
    message: "Library updated successfully",
    id: library._id,
    name: library.name,
  });
});

export const deleteLibrary = async (req, res) => {
  const library = await Library.findByIdAndDelete(req.params.id);

  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }
  res.json({
    message: "Library deleted successfully",
  });
};

export const getLibraryInventory = asyncHandler(async (req, res) => {
  const library = await Library.findById(req.params.id).populate("books");
  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }

  res.status(200).json(library.books);
});

export const addBookToInventory = async (req, res) => {
  const library = await Library.findById(req.params.id);
  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }
  library.books.push(req.body.bookId);
  await library.save();
  res.status(200).json({ message: "Book added to inventory" });
};

export const removeBookFromInventory = async (req, res) => {
  const library = await Library.findById(req.params.id);
  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }
  library.books.pull(req.body.bookId);
  await library.save();
  res.status(200).json({ message: "Book removed from inventory" });
};
