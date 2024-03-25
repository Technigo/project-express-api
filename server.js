import express from "express";
import cors from "cors";
import path from "path";
import { readdirSync } from "fs";
import listEndpoints from "express-list-endpoints";

// Assuming books.json is located in the 'data' directory
import booksData from "./data/books.json";

const app = express();
const PORT = process.env.PORT || 9000;

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const directoryPath = path.join(__dirname, "data");

try {
  const files = readdirSync(directoryPath);
  console.log(files); // This will log an array of filenames in the directory
} catch (error) {
  console.error("Error reading directory:", error);
}

// Define your routes

app.get("/", (req, res) => {
  const welcomeMessage =
    "<h1>Welcome to my book store!</h1>" +
    "<p>So nice of you to come here. Here you have all of the available routes to find your dream book:</p>" +
    "<ul>" +
    "<li><a href='/collection'>/collection</a>: Returns a collection of books, with optional filtering by author.</li>" +
    "<li><a href='/authors'>/authors</a>: Returns a collection of unique authors from the book data.</li>" +
    "<li><a href='/collection/:id'>/collection/:id</a>: Returns a single book based on the provided book ID.</li>" +
    "</ul>";

  res.send(welcomeMessage);
});

app.get("/collection", (req, res) => {
  res.json(booksData);
  // Your logic for returning a collection of books
});

app.get("/authors", (req, res) => {
  const allAuthors = booksData.reduce((authors, book) => {
    return authors.concat(book.authors);
  }, []);

  const uniqueAuthors = [...new Set(allAuthors)];

  res.json(uniqueAuthors);
  // Your logic for returning a collection of unique authors
});

app.get("/collection/:id", (req, res) => {
  // Extracting book ID from request parameters
  const bookId = req.params.id;

  // Finding the book with the given ID
  const book = booksData.find((book) => book.bookID === parseInt(bookId));

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
  // Your logic for returning a single book based on ID
});

app.get("/list-endpoints", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
