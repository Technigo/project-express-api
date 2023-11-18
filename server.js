import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 1317;
const app = express();

app.use(cors());
app.use(express.json());

// Base URL
app.get("/", (req, res) => {
  res.send("Welcome to the Book API!");
});

// Route for getting top N books by average rating
// URL example: /books/top?count=5
app.get('/books/top', (req, res) => {
  let count = parseInt(req.query.count, 10);
  if (isNaN(count)) {
    count = 5; // Default value if count is not provided or invalid
  }

  const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);
  const topBooks = sortedBooks.slice(0, count);

  if (topBooks.length > 0) {
    res.json(topBooks);
  } else {
    res.status(404).send(`No books found for the top ${count} ratings`);
  }
});

// Find book by title
// URL example: /books/{title}
app.get('/books/:title', (req, res) => {
  const requestedTitle = req.params.title.replace(/%20/g, ' ');
  const bookWithTitle = booksData.find((book) => book.title === requestedTitle);
  if (bookWithTitle) {
    res.json(bookWithTitle);
  } else {
    res.status(404).send("No book was found");
  }
});

// Find book by ID
// URL example: /books/{bookID}
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID;
  const singleBook = booksData.find((book) => book.bookID === +bookID);
  if (singleBook) {
    res.json(singleBook);
  } else {
    res.status(404).send("No book was found");
  }
});

// Filter books by author
// URL example: /books?author={authorName}
app.get('/books', (req, res) => {
  const authorName = req.query.author;
  if (!authorName) {
    return res.status(400).send('Author not found');
  }
  const lowercasedAuthorName = authorName.toLowerCase();
  const booksByAuthor = booksData.filter((book) =>
    book.authors.toLowerCase().includes(lowercasedAuthorName)
  );
  res.json(booksByAuthor);
});

// Get all books
// URL example: /books
app.get('/books', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(booksData, null, 2));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
