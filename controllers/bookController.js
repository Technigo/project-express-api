import fs from "fs";
import path from "path";
import { ERRORS } from "../constants/constants";
import { generateID } from "../utils/utils";

// Get absolute path to the JSON file
const booksFilePath = path.resolve("data/books.json");

// Helper function to load data
const loadBooks = () => {
  try {
    const data = fs.readFileSync(booksFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading books:", error);
    return [];
  }
};

// Save books
const saveBooks = (books) => {
  fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
};

// Get all books
export const getBooks = (req, res) => {
  const { author, startsWith, language, minRating, sortBy, order } = req.query;
  let books = loadBooks();

  // Apply all filters in a single loop
  books = books.filter((book) => {
    if (author && !book.authors.toLowerCase().includes(author.toLowerCase()))
      return false;
    if (
      startsWith &&
      book.title.charAt(0).toLowerCase() !== startsWith.toLowerCase()
    )
      return false;
    if (language && book.language_code !== language) return false;
    if (minRating && book.average_rating < parseFloat(minRating)) return false;
    return true;
  });

  // Sort the results
  if (sortBy) {
    books.sort((a, b) => {
      const orderFactor = order === "desc" ? -1 : 1;

      if (sortBy === "average_rating") {
        return (a.average_rating - b.average_rating) * orderFactor;
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * orderFactor;
      }

      return 0; // Default: no sorting if field not recognized
    });
  }

  // Return all, filtered and/or sorted books
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
    return res.status(404).json({ error: ERRORS.BOOK_NOT_FOUND });
  }
};

// Add a new book
export const addBook = (req, res) => {
  try {
    const newBook = req.body;
    const books = loadBooks();

    // Generate a unique ID
    newBook.bookID = generateID(books);

    // Ensure no duplicate ISBNs
    if (books.some((book) => book.isbn === newBook.isbn)) {
      return res.status(400).json({ error: ERRORS.DUPLICATE_ISBN });
    }

    books.push(newBook);
    saveBooks(books);

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: ERRORS.ADD_BOOK_ERROR });
  }
};
