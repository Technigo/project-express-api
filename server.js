import express from "express";
import cors from "cors";
// import technigoMembers from "./data/technigo-books.json";

import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    "Books API": "Look for books by ID, ISBN number or title",
    Routes: [
      {
        "/books": "Get all books",
        "/books/isbn/:isbn": "Get a book by its ISBN number",
        "/books/id/:BooksID": "Get a book by its ID number in the database",
        "/books?authors=:author": "Filter a book by its author/authors",
        "/books?title=:title": "Filter a book by its title",
        "/books?language_code=:language_code":
          "Filter a book by its language code",
      },
    ],
  });
});

// Books endpoint
app.get("/books", (req, res) => {
  const { title, authors, language_code } = req.query;
  let books = booksData;
  if (authors) {
    books = books.filter((singleAuthor) => {
      return singleAuthor.authors.toLowerCase() === authors.toLowerCase();
    });
  }
  if (title) {
    books = books.filter((singleBook) => {
      return singleBook.title.toLowerCase() === title.toLowerCase();
    });
  }
  if (language_code) {
    books = books.filter((language) => {
      return (
        language.language_code.toLowerCase() === language_code.toLowerCase()
      );
    });
  }
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      booksData: books,
    },
  });
});

// Books by ISBN endpoint using path parameter
app.get("/books/isbn/:isbn", (request, response) => {
  const bookByISBN = booksData.find((book) => {
    return book.isbn === Number(request.params.isbn);
  });
  if (bookByISBN) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: bookByISBN,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "ISBN not Found",
      body: {},
    });
  }
});

// Books/bookID endpoint
app.get("/books/id/:bookID", (request, response) => {
  const singleBook = booksData.find((book) => {
    return book.bookID === Number(request.params.bookID);
  });
  if (singleBook) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book: singleBook,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "ID not Found",
      body: {},
    });
  }
});

// Books/average rating endpoint
app.get("/books/rating/:average_rating", (request, response) => {
  const ratingAverage = booksData.find((book) => {
    return book.average_rating === Number(request.params.average_rating);
  });
  if (ratingAverage) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        book: ratingAverage,
      },
    });
  } else {
    response.status(404).json({
      success: false,
      message: "ID not Found",
      body: {},
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});