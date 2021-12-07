import express from "express";
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
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to Books API");
});

//all books data
app.get("/books", (req, res) => {
  res.json(booksData);
});

// provides a single item by id
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log({ id });
  const bookById = booksData.filter((item) => {
    const bookWithMatchedId = item.bookID === id;
    return bookWithMatchedId;
  });

  if (!bookById || bookById.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(bookById);
});

// search by rating. Returns a direct match and all lower scored books.
app.get("/rating/:rating", (req, res) => {
  const rating = parseFloat(req.params.rating);
  console.log({ rating });
  const selectedBooks = booksData.filter((item) => {
    const filteredBooksMatched = Math.abs(item.average_rating <= rating);
    return filteredBooksMatched;
  });
  if (selectedBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(selectedBooks);
});

// returns most popular books
// ?kids_friendly=true
app.get("/popular", (req, res) => {
  const showKidsFriendly = req.query.kids_friendly;
  let popularBooks = booksData.filter((item) => {
    return Math.abs(item.average_rating >= 4.4);
  });

  if (showKidsFriendly) {
    popularBooks = popularBooks.filter((item) => item.kids_friendly);
  }

  if (popularBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(popularBooks);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
