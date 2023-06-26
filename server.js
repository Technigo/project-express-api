import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Get books by author
app.get("/books/authors/:author", (req, res) => {
  const author = req.params.author;
  let booksFromAuthor = booksData.filter((items) => items.authors === author);
  
  if (booksFromAuthor) {
    res.status(200).json({
      success: true,
      message: "Found books from author",
      body: {
        books: booksFromAuthor
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Author/books could not be found",
      body: {}
    })
  }
});

// Get one book
app.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  let bookFromId = booksData.filter((item) => item.bookID === +bookId);

  if (bookFromId) {
    res.status(200).json({
      success: true,
      message: "Found book",
      body: {
        book: bookFromId[0] },
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Book not found.",
      body: {}
    })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});