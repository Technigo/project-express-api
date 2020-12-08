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
  res.send("Hello wo00000rld");
});

// Books

app.get("/books", (req, res) => {
  const { author } = req.query;

  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter((book) =>
      book.authors.includes(author)
    );
  }

  res.json(filteredBooks);
});

app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookId = booksData.find((book) => book.bookID === +id);

  res.json(bookId);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
