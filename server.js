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

  res.json(filterBooks);

  //query for book title
  const searchTitle = req.query.title;

  if (searchTitle) {
    filterBooks = filterBooks.filter((book) =>
      book.title.includes(searchTitle)
    );
  } else {
  }
});

app.get("/books/:bookId", (req, res) => {
  let filterBooks = [...booksData];

  const { bookId } = req.params;

  filterBooks = filterBooks.find((book) => +bookId === book.bookID);

  if (filterBooks) {
    res.json(filterBooks);
  } else {
    res.status(404).send("No book was found");
  }
});

app.get("/books/:bookTitle", (req, res) => {
  let filterBooks = [...booksData];
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
