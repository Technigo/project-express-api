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
// by author
// http://localhost:8080/books?author={smth}&?title={smth}
// localhost:8080/books?lang[]=eng&lang[]=en-US
app.get("/books", (req, res) => {
  const author = req.query.author?.toLowerCase();
  const title = req.query.title?.toLowerCase();
  const lang = req.query.lang;

  if (lang) {
    if (!Array.isArray(lang) || lang.length === 0) {
      res.status(400).send("lang must be non-empty array");
    }
  }

  let filteredBooks = booksData;

  if (author) {
    filteredBooks = filteredBooks.filter((item) => {
      return item.authors.toLowerCase().includes(author);
    });
  }
  if (title) {
    filteredBooks = filteredBooks.filter((item) => {
      return item.title.toLowerCase().includes(title);
    });
  }
  if (lang) {
    filteredBooks = filteredBooks.filter((item) => {
      return lang.includes(item.language_code);
    });
  }

  if (filteredBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(filteredBooks);
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

// search by rating. Returns a direct match and other close matching results.
app.get("/rating/:rating", (req, res) => {
  const rating = Math.floor(parseFloat(req.params.rating));
  console.log({ rating });
  const selectedBooks = booksData.filter((item) => {
    const filteredBooksMatched = item.average_rating >= rating && item.average_rating < rating + 1;
    return filteredBooksMatched;
  });
  if (selectedBooks.length === 0) {
    res.status(404).send("data not found");
  }
  res.json(selectedBooks);
});

// post new rating
// doesn't save to physical file/database so changes wont survive reload
app.post("/rate", (req, res) => {
  const rate = req.body.rate;
  const bookId = req.body.bookId;
  const requestedBook = booksData.find((item) => item.bookID === bookId);
  if (rate < 5 && rate >= 0 && bookId) {
    requestedBook.average_rating = rate;
  } else {
    res.status(400).send("wrong params");
  }
  res.json(requestedBook);
});

// returns most popular books
// http://localhost:8080/popular?kids_friendly=true
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
