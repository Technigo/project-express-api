import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080; // Dynamic port for Render
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Documentation endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Books API! Here are the available endpoints:",
    routes: listEndpoints(app),
  });
});

// Get all books
app.get("/books", (req, res) => {
  const { author, rating, page = 1, limit = 10 } = req.query;
  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.authors.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (rating) {
    filteredBooks = filteredBooks.filter(
      (book) => book.average_rating >= +rating
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  res.json({
    total: filteredBooks.length,
    page: +page,
    limit: +limit,
    results: filteredBooks.slice(startIndex, endIndex),
  });
});

// Get a single book by ID
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = booksData.find((book) => book.bookID === +id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
