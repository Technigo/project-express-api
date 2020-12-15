import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello w0rld");
});

// Books

app.get("/books", (req, res) => {
  const { author, title, rating, page, limit = 20 } = req.query;

  let filteredBooks = booksData;

  // Filter

  if (author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.authors.toLowerCase().includes(author)
    );
  }

  if (title) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toString().toLowerCase().includes(title)
    );
  }

  if (rating) {
    filteredBooks = filteredBooks.filter(
      (book) => Math.floor(book.average_rating) === +rating
    );
  }

  // Pagination

  if (page) {
    filteredBooks = filteredBooks.slice((page - 1) * limit, page * limit);
  }

  res.json(filteredBooks);
});

// Id

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookId = booksData.find((book) => book.bookID === +id);

  if (bookId) res.json(bookId);
  else res.status(404).json({ message: `Id ${id} not found` });
});

// Dummie author endpoint
app.get("/authors", (req, res) => {
  res.send("All unique authors");
});

// Dummie top books endpoint
app.get("/top-list", (req, res) => {
  res.send("Top rated and most reviewed books");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
