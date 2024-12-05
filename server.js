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
    message: "Welcome to the Book API!",
    endpoints: endpoints
  });
});

// Popular books with rating >4 
app.get("/books/popular", (req, res) => {
  const popularBooks = booksData.filter(book => book.average_rating && parseFloat(book.average_rating) > +4)
  res.status(200).json(popularBooks)
});

// author and title
app.get("/books", (req, res) => {
  const { title, author } = req.query;

  let filteredBooks = booksData;

  if (title) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (author) {
    filteredBooks = filteredBooks.filter(book => {
      if (!book.authors) return false;

      const authorsArray = book.authors.split("-").map(author => author.trim().toLowerCase());
      return authorsArray.some(auth => auth.includes(author.toLowerCase()));
    });
  }

  if (filteredBooks.length === 0) {
    return res.status(404).json({ error: "No books found matching the criteria" });
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