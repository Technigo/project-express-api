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
  res.send("Hello Technigo!");
});

//ROUTE PARAMETERS//

// FIND each book by title
//This had to be before find by ID in order to work
app.get('/books/:title', (req, res) => {
  const requestedTitle = req.params.title.replace(/%20/g, ' ');
  const bookWithTitle = booksData.find((book) => book.title === requestedTitle);
  if (bookWithTitle) {
    res.json(bookWithTitle);
  } else {
    res.status(404).send("No book was found");
  }
});

//FIND each book by ID
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

//QUERY PARAMETERS//
//Reminder: Query is shown in url after the "?"

/*
// FILTER books by author
app.get('/books/author', (req, res) => {
  const authorName = req.query.author;
  if (!authorName) {
    return res.status(400).send('Author parameter is missing');
  }

  const encodedAuthorName = encodeURIComponent(authorName);

  const booksByAuthor = booksData.filter((book) =>
    book.authors.toLowerCase().includes(encodedAuthorName.toLowerCase())
  );

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).send(`No books found by author ${authorName}`);
  }
});
/

/*
// Route for getting top N books by average rating
app.get('/books/top', (req, res) => {
  const count = parseInt(req.query.count, 10);
  if (!count || isNaN(count)) {
    return res.status(400).send('Count parameter is missing or invalid');
  }

  const topBooks = booksData
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, count);

  if (topBooks.length > 0) {
    res.json(topBooks);
  } else {
    res.status(404).send(`No books found for the top ${count} ratings`);
  }
});*/

//Get all books
app.get('/books', (req, res) => {
  res.json(booksData)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

