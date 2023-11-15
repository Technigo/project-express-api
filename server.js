import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// All endpoints
app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json(endpoints);
});

// Get all books
app.get("/books", (req, res) => {
  res.json(booksData);
});

// Get a book by id
app.get("/books/:id", (req, res) => {
  const id = req.params.id;
  // const {id} = req.params; // same as above, saved for future reference
  const book = booksData.find((item) => item.bookID === +id);

  if (book) {
    // if book is found
    res.json(book); // return the book
  } else {
    res.status(404).json({ error: "Book not found" }); // else return error message
  }
});

// Get all books by author
app.get("/books/authors/:author", (req, res) => {
  const author = req.params.author;
  // const {author} = req.params; // same as above, saved for future reference

  // Filter the array of books by author
  const booksByAuthor = booksData.filter((item) => item.authors === author);

  if (booksByAuthor.length > 0) {
    // if the array is not empty
    res.json(booksByAuthor); // return the array
  } else {
    res.status(404).json({ error: "Author not found" }); // else return error message
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
