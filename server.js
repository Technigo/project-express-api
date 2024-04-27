import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import expressListEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app
  .route("/")
  .get((req, res) => {
    const endpoints = expressListEndpoints(app);
    res.send(endpoints);
  })
  .post((req, res) => {
    req.send("Post a new book");
  })
  .put((req, res) => {
    req.send("Change something");
  })
  .delete((req, res) => {
    req.send("Delete somethiing");
  });

// Collection endpoint - get all books
app.route("/books").get((req, res) => {
  let books = booksData;

  // Get all books in specific language
  const lang = req.query.lang;
  lang && (books = books.filter(book => book.language_code === lang));

  // Get all books in specific language
  const ratingAbove = req.query.ratingAbove;
  ratingAbove &&
    (books = books.filter(book => book.average_rating > ratingAbove));

  // Get all books in specific language
  const ratingBelow = req.query.ratingBelow;
  ratingBelow &&
    (books = books.filter(book => book.average_rating < ratingBelow));

  // Get single book by ISBN
  const ISBN = req.query.isbn;
  ISBN && (books = books.find(book => book.isbn === +ISBN));

  // Get single book by ISBN
  const ISBN13 = req.query.isbn13;
  ISBN13 && (books = books.filter(book => book.isbn13 === +ISBN13));

  // Pages with 20 books on each
  const page = req.query.page;
  const start = (page - 1) * 10;
  const end = start + 10;
  console.log(start, end);
  page && (books = books.slice(start, end));

  // Show books
  books && books.length > 0
    ? res.json(books)
    : res.send("Could not find any books");
});

// Collection - get books by Author
app.route("/books/popular").get((req, res) => {
  res.json(
    booksData.sort((a, b) => b.average_rating - a.average_rating).slice(0, 10)
  );
});

// Single result - get book by ID
app.route("/books/:bookId").get((req, res) => {
  const bookId = req.params.bookId;
  const book = booksData.find(b => b.bookID === +bookId);
  book ? res.json(book) : res.status(404).send(`Book ID ${bookId} not found`);
});

// Collection - get books by Author
app.route("/authors/:author").get((req, res) => {
  const author = req.params.author;
  const books = booksData.filter(b => b.authors.includes(author));
  books
    ? res.json(books)
    : res.status(404).send("No books found by that author");
});

app.route("/search").get((req, res) => {
  // Search for anything
  const q = req.query.q;
  let result = "";
  q &&
    (result = booksData.filter(book => Object.values(book).join().includes(q)));

  // Show result
  result && result.length > 0
    ? res.json(result)
    : res.send("No search results");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
