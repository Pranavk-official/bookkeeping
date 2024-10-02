import asyncHandler from "express-async-handler";

export const getAllLibraries = async (req, res) => {
  res.send("getAllLibraries");
};

export const createLibrary = asyncHandler(async (req, res) => {
  const library = new library(req.body);
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
  const library = await library.findById(req.params.id);
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
  const library = await library.findByIdAndUpdate(req.params.id, req.body, {
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
  const library = await library.findByIdAndDelete(req.params.id);

  if (!library) {
    res.status(404);
    throw new Error("Library not found");
  }
  res.json({
    message: "Library deleted successfully",
  });
};

export const getLibraryInventory = async (req, res) => {
  res.send("getLibraryInventory");
};

export const addBookToInventory = async (req, res) => {
  res.send("addBookToInventory");
};

export const removeBookFromInventory = async (req, res) => {
  res.send("removeBookFromInventory");
};
