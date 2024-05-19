import express from "express";
import cors from "cors";
import booksData from "./data/books.json";
import expressListEndpoints from "express-list-endpoints"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})

// Get all books
// http://localhost:8080/books
app.get('/books', (req, res) => {

  let filterBooks = [...booksData]

  // Query for a book title
  // http://localhost:8080/books?title=harry
  const titleSearch = req.query.title
  if (titleSearch) {
    filterBooks = filterBooks.filter(book => book.title.toLowerCase().includes(titleSearch.toLowerCase()))
  }

  // Query to show books with an average rating equal to or greater than given value
  // http://localhost:8080/books?minRating=2.5
  const minRating = parseFloat(req.query.minRating)
  if (!isNaN(minRating)) {
    filterBooks = filterBooks.filter(book => book.average_rating >= minRating)
  }

  if (filterBooks.length > 0) {
    res.json(filterBooks)
  } else {
    res.status(404).send('No books were found based on the filters')
  }
})

// Get one book based on ID
// http://localhost:8080/books/7
app.get('/books/:bookID', (req, res) => {
  const { bookID } = req.params

  const book = booksData.find(book => +bookID === book.bookID)

  if (book) {
    res.json(book)
  } else {
    res.status(404).send('No book was found')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
