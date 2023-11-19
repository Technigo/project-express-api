import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 1317;
const app = express();

app.use(cors());
app.use(express.json());

// base URL
app.get("/", (req, res) => {
  res.send("Welcome to the Book API!");
});

// route for getting top N books by average rating
// URL example: /books/top?count=5
app.get('/books/top', (req, res) => {
  let count = parseInt(req.query.count, 10);
  if (isNaN(count)) {
    count = 5; // default value if count is not provided or invalid
  }

  const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);
  const topBooks = sortedBooks.slice(0, count);

  if (topBooks.length > 0) {
    res.json(topBooks);
  } else {
    res.status(404).send(`No books found for the top ${count} ratings`);
  }
});

// find book by title
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

// get all books or filter by author
// URL example: /books or /books?author=AuthorName
app.get('/books', (req, res) => {
  const authorName = req.query.author;
  if (authorName) {
    // Filtering books by author name (case insensitive)
    const lowercasedAuthorName = authorName.toLowerCase();
    const booksByAuthor = booksData.filter((book) =>
      book.authors.toLowerCase().includes(lowercasedAuthorName)
    );
    res.json(booksByAuthor);
  } else {
    // Return all books when no author query parameter is provided
    res.json(booksData);
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
