import Book from "../models/book";
import Library from "../models/library";

export const borrowBook = async (req, res) => {
  const { bookId } = req.body;

  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  if (book.borrower) {
    return res.status(400).json({ message: "Book already borrowed" });
  }

  book.borrower.user = req.user._id;
  book.borrower.borrowedAt = Date.now();

  const library = await Library.findById(book.library);
  library.borrowedBooks.push({
    book: book._id,
    borrower: req.user._id,
    borrowedAt: Date.now(),
  });

  await Promise.all([book.save(), library.save()]);
  res.status(200).json({ message: "Book borrowed successfully" });
};

export const returnBook = async (req, res) => {
  const { bookId } = req.body;
  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (!book.borrower) {
    return res.status(400).json({ message: "Book not borrowed" });
  }
  if (book.borrower.user.toString() !== req.user._id.toString()) {
    return res.status(400).json({ message: "You are not the borrower" });
  }
  book.borrower.user = null;
  book.borrower.returnedAt = Date.now();

  const library = await Library.findById(book.library);
  const borrowedBookIndex = library.borrowedBooks.findIndex(
    (borrowedBook) => borrowedBook.book.toString() === bookId
  );
  if (borrowedBookIndex !== -1) {
    library.borrowedBooks.splice(borrowedBookIndex, 1);
  }

  await Promise.all([book.save(), library.save()]);

  res.status(200).json({ message: "Book returned successfully" });
};
