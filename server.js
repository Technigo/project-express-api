import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import listEndpoints from 'express-list-endpoints'; // Ensure this package is installed

const port = process.env.PORT || 1317;
const app = express();

app.use(cors());
app.use(express.json());

// Base URL - Updated to return API documentation
// Changed to provide API documentation at the root endpoint for better API usability.
// This utilizes express-list-endpoints to auto-generate and show API endpoints.
// CHANGED from:
// app.get("/", (req, res) => {
//   res.send("Welcome to the Book API!");
// });
// to:
app.get("/", (req, res) => {
  res.json(listEndpoints(app)); // Using express-list-endpoints to show API endpoints
});

// Route for getting top rated books by average rating
// Improved to handle non-positive and excessively large values for 'count'.
// CHANGED from: 
// app.get('/books/top', (req, res) => {
//   let count = parseInt(req.query.count, 10);
//   if (isNaN(count)) {
//     count = 5; // default value if count is not provided or invalid
//   }

//   const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);
//   const topBooks = sortedBooks.slice(0, count);

//   if (topBooks.length > 0) {
//     res.json(topBooks);
//   } else {
//     res.status(404).send(`No books found for the top ${count} ratings`);
//   }
// });
// to:
app.get('/books/top', (req, res) => {
  let count = parseInt(req.query.count, 10);
  if (isNaN(count) || count <= 0) {
    count = 5; // Default value if count is not provided or invalid
  } else if (count > 100) {
    count = 100; // Limiting the maximum count to prevent too large datasets
  }

  const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);
  const topBooks = sortedBooks.slice(0, count);
  res.json(topBooks);
});
// If count is less than or equal to zero, it defaults to 5.
// If count is greater than 100, it's limited to 100.




// Find book by title
// Enhanced to support case-insensitive title search for better user experience.
// CHANGED from:
// find book by title
// app.get('/books/:title', (req, res) => {
//   const requestedTitle = req.params.title.replace(/%20/g, ' ');
//   const bookWithTitle = booksData.find((book) => book.title === requestedTitle);
//   if (bookWithTitle) {
//     res.json(bookWithTitle);
//   } else {
//     res.status(404).send("No book was found");
//   }
// });
//to:
app.get('/books/:title', (req, res) => {
  const requestedTitle = decodeURIComponent(req.params.title).toLowerCase(); // Decode and convert to lowercase
  const bookWithTitle = booksData.find((book) => book.title.toLowerCase() === requestedTitle);
  if (bookWithTitle) {
    res.json(bookWithTitle);
  } else {
    res.status(404).send("No book was found");
  }
});

// Get all books or filter by author
// Updated to perform consistent case-insensitive author name filtering.
// CHANGED from:
// get all books or filter by author
// app.get('/books', (req, res) => {
//   const authorName = req.query.author;
//   if (authorName) {
//     const booksByAuthor = booksData.filter((book) =>
//       book.authors.toLowerCase().includes(authorName.toLowerCase())
//     );
//     res.json(booksByAuthor);
//   } else {
//     res.json(booksData);
//   }
// });
//to:
app.get('/books', (req, res) => {
  const authorName = req.query.author;
  if (authorName) {
    const lowercasedAuthorName = authorName.toLowerCase(); // Making the search case-insensitive
    const booksByAuthor = booksData.filter((book) =>
      book.authors.toLowerCase().includes(lowercasedAuthorName)
    );
    res.json(booksByAuthor);
  } else {
    res.json(booksData); // Return all books when no author query parameter is provided
  }
});
// Changed to ensure consistent case-insensitive author name filtering


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
