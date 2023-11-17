import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors
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
  const book = booksData.find((item) => item.bookID === +id); // +id converts the string to a number

  if (book) {
    // if book is found
    res.json(book); // return the book
  } else {
    res.status(404).json({ error: "Book not found" }); // else return error message
  }
});

// Get all books by author
app.get("/books/authors/:author", (req, res) => {
  const inputAuthor = req.params.author.toLowerCase(); // Convert input to lowercase for case-insensitive matching

  // Filter the array of books by author
  const booksByAuthor = booksData.filter(
    (item) => item.authors.toLowerCase().includes(inputAuthor) // Show the author een if only part of the name is insertd
  );

  if (booksByAuthor.length > 0) {
    // if the array is not empty
    res.json(booksByAuthor); // return the array
  } else {
    res.status(404).json({ error: "Author not found" }); // else return error message
  }
});

// Get all books with rating above the given rating
app.get("/books/average_rating/:rating", (req, res) => {
  const rating = req.params.rating;

  // Filter the array of books by rating above the given rating
  const booksAboveRating = booksData.filter(
    (item) => item.average_rating > +rating // +rating converts the string to a number
  );

  if (booksAboveRating.length > 0) {
    // if the array is not empty
    res.json(booksAboveRating); // return the array
  } else {
    res.status(404).json({ error: "No books with rating above 5 were found." });
  }
});

// Get book by isbn
app.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  // const {isbn} = req.params;  same as above, saved for future reference

  const bookByIsbn = booksData.find((item) => item.isbn === +isbn); // +isbn converts the string to a number

  if (bookByIsbn) {
    // if book is found
    res.json(bookByIsbn); // return the book
  } else {
    res
      .status(404)
      .json({ error: "Book not found. Please check the inserted isbn." }); // else return error message
  }
});

// Dummy endpoint for future development
app.get("/dummy", (req, res) => {
  res.json({ message: "This is a dummy endpoint for future development." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
