import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Book Reviews [statistics] API");
});

// Authors endpoints
app.get("/authors", (req, res) => {
  const authors = booksData.map((item) => item.authors);
  const uniqueAuthors = [...new Set(authors)];

  // Query string - for example /authors?author=tolstoy
  const searchedAuthor = req.query.author;
  if (searchedAuthor) {
    const searchedAuthorObject = booksData.filter((item) =>
      item.authors.includes(searchedAuthor)
    );
    const searchedAuthorList = searchedAuthorObject.map((item) => item.authors);
    const uniqueSearchedAuthor = [...new Set(searchedAuthorList)];

    // Error when no unique searched authors found
    if (uniqueSearchedAuthor.length === 0) {
      const error = new Error(`${searchedAuthor} not found`);
      error.status = 404;
      throw error;
    }
    res.json(uniqueSearchedAuthor);
  } else {
    res.json(uniqueAuthors);
  }
});

app.get("/authors/:author", (req, res, next) => {
  const author = req.params.author;
  const booksByAuthor = booksData.filter((item) => item.authors === author);
  const authors = booksByAuthor.map((item) => item.authors);
  const uniqueAuthors = [...new Set(authors)];

  // Error when no unique author found
  if (uniqueAuthors.length === 0) {
    const error = new Error(`${author} not found`);
    error.status = 404;
    throw error;
  }
  res.json(uniqueAuthors);
});

app.get("/authors/:author/books", (req, res, next) => {
  const author = req.params.author;
  const booksByAuthor = booksData.filter((item) => item.authors === author);

  // Query string - for example: /author/author/books?author="Rowling"
  const searchedAuthor = req.query.author;
  if (searchedAuthor) {
    const booksBySearchedAuthor = booksData.filter((item) =>
      item.authors.includes(searchedAuthor)
    );

    // Error when query not found
    if (booksBySearchedAuthor.length === 0) {
      const error = new Error(`${searchedAuthor} not found`);
      error.status = 404;
      throw error;
    }
    res.json(booksBySearchedAuthor);
  } else {

    // Error when author not found 
    if (booksByAuthor.length === 0) {
      const error = new Error(`${author} not found`);
      error.status = 404;
      throw error;
    }
    res.json(booksByAuthor);
  }
});

// Books endpoints
app.get("/books", (req, res, next) => {

  // Query to sort books, for now only on average_rating
  const sort = req.query.sort;
  if (sort && sort === "average_rating") {
    const sortRatings = booksData.sort((a, b) => b[sort] - a[sort]);

        // Error when query not found
    if (sortRatings.length === 0) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(sortRatings);
  } else {
    res.json(booksData);
  }
});

app.get("/books/:book", (req, res, next) => {
  const bookId = parseInt(req.params.book);
  const filteredBookID = booksData.filter((item) => item.bookID === bookId);

  const searchedTitles = req.query.title;

  if (searchedTitles) {
    const searchedTitlesList = booksData.filter((item) =>
      item.title.toString().toLowerCase().includes(searchedTitles.toLowerCase())
    );

    // Error when query not found
    if (searchedTitlesList.length === 0) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    res.json(searchedTitlesList);
  } else {
    //Error when no bookID
    if (filteredBookID.length === 0) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    res.json(filteredBookID);
  }
});

// For it to be RESTful it should've been a list of actual ratings,
// but am going with the data I have at hand.

app.get("/books/:book/ratings", (req, res, next) => {
  const bookId = parseInt(req.params.book);
  const books = booksData.filter((item) => item.bookID === bookId);
  const bookRatings = books.map((item) => [
    {
      title: item.title,
      author: item.authors,
      average_rating: item.average_rating,
      number_of_votes: item.ratings_count,
      number_of_text_reviews: item.text_reviews_count,
    },
  ]);

  // Error when wrong bookID
  if (books.length === 0) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  res.json(bookRatings);
});

// Default error when not found
app.use((next) => {
  const error = new Error(`Not found`);
  error.status = 404;
  next(error);
});

// Middleware for error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
