import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from 'express-list-endpoints'; // Was missing this package, installed now

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());



// START DEFINING YOUR ROUTES HERE //

// Base URL by GET - returns API documentation
app.get("/", (req, res) => {
  res.json(listEndpoints(app)); // Using express-list-endpoints to show API endpoints
  res.send("Let´s check our some books!");
});

// GET all books or FILTER by author 
// URL: /books
// URL: /books?author=AuthorName
// Query parameter - Query is shown in url after the "?"
// Ensures consistent case-insensitive author name filtering.
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


// GET top rated books by average rating
// SLICE for getting top books by average rating
// URL: books/top?count=R (change R to a number)
// Query parameter - Query is shown in url after the "?"
app.get('/books/top', (req, res) => {
  let count = parseInt(req.query.count, 10);
  if (isNaN(count) || count <= 0) {
    count = 5;
  } else if (count > 100) {
    count = 100;
    // If count is less than or equal to zero, it defaults to 5.
    // If count is greater than 100, it's limited to 100.
  }
  const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);
  const topBooks = sortedBooks.slice(0, count);
  if (topBooks.length === 0) {
    res.status(404).send("No top books found");
  } else {
    res.json(topBooks);
  }
});



// GET - FIND a book by title
// Route parameter
// URL: /books/:title
// Only returns one book
// The search works even if you don't type the whole title exactly as it is in the book - It ignores upper/lower case, and finds the book if the title you type is part of the actual book title.
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

