import fs from "fs";
import path from "path";

// Get absolute path to the JSON file
const booksFilePath = path.resolve("data/books.json");

// Helper function to load data
const loadBooks = () => {
  try {
    const data = fs.readFileSync(booksFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading books:", err);
    return [];
  }
};

// Helper function to save data
const saveBooks = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

// Get all books
export const getBooks = (req, res) => {
  const startsWith = req.query.startsWith;
  const books = loadBooks();

  // Get all books that starts with the given letter
  if (startsWith) {
    const filteredBooks = books.filter((book) => {
      if (book.title && book.title.length > 0) {
        return book.title.charAt(0).toLowerCase() === startsWith.toLowerCase();
      }
    });
    return res.json(filteredBooks);
  }

  // If no filter is applied, return all books
  res.json(books);
};

// Add a new book
export const addBook = (req, res) => {
  const newBook = req.body;
  const books = loadBooks();

  // Ensure unique bookID
  if (books.some((book) => book.bookID === newBook.bookID)) {
    return res
      .status(400)
      .json({ error: "Book with this bookID already exists" });
  }

  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
};
