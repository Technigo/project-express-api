import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. Example command to overwrite PORT env variable value: PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Let´s check our some books!");
});

// QUERY PARAMETER//
//Reminder: Query is shown in url after the "?"

// SLICE for getting top books by average rating
// URL: books/top?count=5 (can change number)
app.get('/books/top', (req, res) => {
  // Default count to 5 if not specified or invalid
  let count = parseInt(req.query.count, 10);
  if (!count || isNaN(count)) {
    count = 5;
  }
  const sortedBooks = [...booksData].sort((a, b) => b.average_rating - a.average_rating);   // Sort books by average rating in descending order and slice to get the top books
  const topBooks = sortedBooks.slice(0, count); //The slice method is used to get the top books according to the specified count in url
  // Return the top books
  res.json(topBooks);
});


//ROUTE PARAMETERS//

// FIND each book by title
//This had to be before find by ID in order to work
//URL: /books/TitleOfBook
app.get('/books/:title', (req, res) => {
  const requestedTitle = decodeURIComponent(req.params.title).toLowerCase();
  const bookWithTitle = booksData.find((book) => book.title.toLowerCase().includes(requestedTitle));
  if (bookWithTitle) {
    res.json(bookWithTitle);
  } else {
    res.status(404).send("No book was found");
  }
});

//FIND each book by ID
//URL: /books/bookID (number of book ID)
app.get('/books/:bookID', (req, res) => {
  const bookID = req.params.bookID
  const singleBook = booksData.find((book) => book.bookID === +bookID)
  console.log('bookID', bookID, typeof bookID)
  if (singleBook) {
    res.json(singleBook)
  } else {
    res.status(404).send("No book was found")
  }
})

// QUERY PARAMETER//
//Reminder: Query is shown in url after the "?"
// Get all books or FILTER by author
// URL: /books or /books?author=AuthorName
app.get('/books', (req, res) => {
  const authorName = req.query.author;
  if (authorName) {
    const lowercasedAuthorName = authorName.toLowerCase();
    const booksByAuthor = booksData.filter((book) =>
      book.authors.toLowerCase().includes(lowercasedAuthorName)
    );
    res.json(booksByAuthor);
  } else {
    res.json(booksData);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

