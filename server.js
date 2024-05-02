import express from "express";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.get("/books", (req, res) => {
  const { title, author, minPages, maxPages } = req.query;
  let filterBooks = [...booksData];

  //query for /books?title=
  if (title) {
    filterBooks = filterBooks.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  //query for /books?author=
  if (author) {
    filterBooks = filterBooks.filter((book) =>
      book.authors.toLowerCase().includes(author.toLowerCase())
    );
  }
  //query for /books?pages=
  if (minPages && maxPages) {
    filterBooks = filterBooks.filter(
      (book) => book.num_pages >= minPages && book.num_pages <= maxPages
    );
  }
  if (filterBooks.length === 0) {
    res.status(404).send("No books found based on search");
  } else {
    res.json(filterBooks);
  }
});

app.get("/books/:bookId", (req, res) => {
  let filterBooks = [...booksData];

  const { bookId } = req.params;

  const byId = filterBooks.find((book) => book.bookID === +bookId);

  if (byId) {
    res.json(byId);
  } else {
    res.status(404).send("No book was found based on ID");
  }
});

app.get("/books/ratings/:bookRating", (req, res) => {
  let filterBooks = [...booksData];

  const { bookRating } = req.params;

  const byRating = filterBooks.filter((book) =>
    book.average_rating.toString().startsWith(bookRating)
  );

  if (byRating.length > 0) {
    res.json(byRating);
  } else {
    res.status(404).send("No book was found");
  }
});

app.get("/books/year/:yearPublished", (req, res) => {
  let filterBooks = [...booksData];

  const { yearPublished } = req.params;

  const byYear = filterBooks.filter((book) => book.year === yearPublished);

  if (byYear) {
    res.json(byYear);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
