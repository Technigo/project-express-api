import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import booksData from "./data/books.json";

require("dotenv").config();

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors
app.use(cors());
app.use(express.json());

// List of all enpoints
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

//All books
app.get("/books", (req, res) => {
  let filteredBooks = booksData;

  //Filter by title
  if (req.query.title) {
    filteredBooks = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(req.query.title.toLowerCase())
    );
  }

  //Filter by author
  if (req.query.author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.authors.toLowerCase().includes(req.query.author.toLowerCase())
    );
  }
  res.json(filteredBooks);
});

//Show only one book with the selected Id number
app.get("/book/:bookID", (req, res) => {
  const book = booksData.find((b) => b.bookID === parseInt(req.params.bookID));
  if (!book) return res.status(404).send("Book not found.");
  res.json(book);
});

app.put("/books/:bookID", (req, res) => {
  // Future implementation here
  res.status(501).send("Update book feature not implemented yet.");
});

app.delete("/books/:bookID", (req, res) => {
  // Future implementation here
  res.status(501).send("Delete book feature not implemented yet.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
