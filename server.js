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
  let filterBooks = [...booksData];
  // res.json(filterBooks);

  //query for /books?title=
  const searchTitle = req.query.title;
  if (searchTitle) {
    filterBooks = filterBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    res.json(filterBooks);
  }

  //query for /books?author=
  const searchAuthor = req.query.author;
  if (searchAuthor) {
    filterBooks = filterBooks.filter((book) =>
      book.authors.toLowerCase().includes(searchAuthor.toLowerCase())
    );
    res.json(filterBooks);
  }

  //query for /books?pages=
  const { minPages, maxPages } = req.query;

  filterBooks = filterBooks.filter(
    (book) => book.num_pages >= minPages && book.num_pages <= maxPages
  );

  if (minPages && maxPages && filterBooks.length > 0) {
    res.json(filterBooks);
  } else {
    res.status(404).send("No books found based on search");
  }
});

app.get("/books/:bookId", (req, res) => {
  let filterBooks = [...booksData];

  const { bookId } = req.params;

  const byId = filterBooks.find((book) => +bookId === book.bookID);

  if (byId) {
    res.json(byId);
  } else {
    res.status(404).send("No book was found");
  }
});

app.get("/books/ratings/:bookRating", (req, res) => {
  let filterBooks = [...booksData];

  const { bookRating } = req.params;

  const byRating = filterBooks.filter((book) => 
    book.average_rating.toString().startsWith(bookRating))
    
  if (byRating.length > 0) {
    res.json(byRating);
  } else {
    res.status(404).send("No book was found");
  }
});

app.get("/books/year/:yearPublished", (req, res) => {
  let filterBooks = [...booksData]

  const { yearPublished } = req.params

  const byYear = filterBooks.filter(book => book.year === yearPublished)

  if (byYear) {
    res.json(byYear)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
