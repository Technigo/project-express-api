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
  const author = req.query.author;
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

  // Get all books from a certain author
  if (author) {
    const filteredBooks = books.filter((book) =>
      book.authors.toLowerCase().includes(author.toLowerCase())
    );

    if (filteredBooks.length === 0) {
      return res
        .status(404)
        .json({ error: "No books found for the given author" });
    }

    return res.json(filteredBooks);
  }

  // If no filter is applied, return all books
  res.json(books);
};

// Get a specific book by ID
export const getBookByID = (req, res) => {
  const books = loadBooks();
  const id = req.params.id;

  const book = books.find((book) => book.bookID === +id);

  if (book) {
    res.json(book);
  } else {
    return res
      .status(404)
      .json({ error: "A book with this bookID does not exist." });
  }
};

// Add a new book
export const addBook = (req, res) => {
  const newBook = req.body;
  const books = loadBooks();

  // Helper function to generate ID for new books
  const generateID = (books) => {
    if (books.length === 0) return 1; // Start from 1 if no books exist
    const maxID = Math.max(...books.map((book) => book.bookID));
    return maxID + 1;
  };

  // Generate a unique ID
  newBook.bookID = generateID(books);

  // Ensure unique bookID
  if (books.some((book) => book.bookID === newBook.bookID)) {
    return res
      .status(400)
      .json({ error: "Book with this bookID already exists" });
  }

  // Ensure there are no duplicate titles or ISBNs
  if (books.some((book) => book.isbn === newBook.isbn)) {
    return res
      .status(400)
      .json({ error: "A book with this ISBN already exists" });
  }

  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
};
