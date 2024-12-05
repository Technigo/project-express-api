import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: "API Documentation",
    endpoints: endpoints
  });
});

app.get("/books", (req, res) => {
  res.json(booksData);
});

// title
app.get("/books/title", (req, res) => {
  const titleQuery = req.query.title;

  if (!titleQuery) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(titleQuery.toLowerCase())
  );

  if (filteredBooks.length === 0) {
    return res.status(404).json({ error: "No books found with the given title" });
  }
  res.json(filteredBooks);
});

// Author
app.get("/books/authors", (req, res) => {
  const authorQuery = req.query.author;

  if (!authorQuery) {
    return res.status(400).json({ error: "Author query parameter is required" });
  }

  const filteredBooks = booksData.filter(book => {
    if (!book.authors) return false;

    const authorsArray = book.authors.split("-").map(author => author.trim().toLowerCase());
    return authorsArray.some(author => author.includes(authorQuery.toLowerCase()));
  });

  if (filteredBooks.length === 0) {
    return res.status(404).json({ error: "No books found with the given author" });
  }

  res.status(200).json(filteredBooks);
});

// ISBN
app.get("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn

  const book = booksData.find(book => book.isbn === +isbn)
  res.json(book); {
    if (book) {
      res.status(200).json(book)
    } else {
      res.status(404).send("no book found with that ISBN")
    }
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});