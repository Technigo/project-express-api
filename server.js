import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from 'express-list-endpoints'; // Ensure this package is installed

const port = process.env.PORT || 1317;
const app = express();

app.use(cors());
app.use(express.json());

// Base URL - Updated to return API documentation
app.get("/", (req, res) => {
  res.json(listEndpoints(app)); // Using express-list-endpoints to show API endpoints
});


// Get all books or filter by author (README.md - view it live)
app.get('/books', (req, res) => {
  const authorName = req.query.author;
  if (authorName) {
    const lowercasedAuthorName = authorName.toLowerCase();
    const booksByAuthor = booksData.filter((book) =>
      book.authors.toLowerCase().includes(lowercasedAuthorName)
    );

    if (booksByAuthor.length === 0) {
      res.status(404).send("No books found by that author");
    } else {
      res.json(booksByAuthor);
    }
  } else {
    res.json(booksData);
  }
});

// Changed to ensure consistent case-insensitive author name filtering.



// Route for getting top rated books by average rating
// Changed to handle non-positive and excessively large values for 'count'.
app.get('/books/top', (req, res) => {
  let count = parseInt(req.query.count, 10);
  if (isNaN(count) || count <= 0) {
    count = 5;
  } else if (count > 100) {
    count = 100;
  }

  const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);
  const topBooks = sortedBooks.slice(0, count);

  if (topBooks.length === 0) {
    res.status(404).send("No top books found");
  } else {
    res.json(topBooks);
  }
});
// If count is less than or equal to zero, it defaults to 5.
// If count is greater than 100, it's limited to 100.




// Find book by title
// Update: Now the search works even if you don't type the whole title exactly as it is in the book. It ignores upper/lower case and finds the book as long as the title you type is part of the actual book title.
app.get('/books/:title', (req, res) => {
  const requestedTitle = decodeURIComponent(req.params.title).toLowerCase();
  const bookWithTitle = booksData.find((book) =>
    book.title.toLowerCase().includes(requestedTitle)
  );

  if (bookWithTitle) {
    res.json(bookWithTitle);
  } else {
    res.status(404).send("No book with that title was found");
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
