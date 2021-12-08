const express = require("express");
const router = express.Router();

const booksData = require("../data/books.json");

// Routes
router.get("/", (req, res) => {
  res.send("Welcome to Books API");
});

//all books data
// by author
// http://localhost:8080/books?author={smth}&?title={smth}
// localhost:8080/books?lang[]=eng&lang[]=en-US
router.get("/books", (req, res) => {
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
router.get("/books/:id", (req, res) => {
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
router.get("/ratings/:rating", (req, res) => {
  const rating = Math.floor(parseFloat(req.params.rating));
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
router.post("/rate", (req, res) => {
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
router.get("/popular", (req, res) => {
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

module.exports = router;
