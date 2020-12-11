import express from 'express';
import expressEndpoints from 'express-list-endpoints';
import bodyParser from 'body-parser';
import cors from 'cors';
import books from './data/books.json';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
const endPoints = require('express-list-endpoints')
app.get("/", (request, response) => {
  response.send(endPoints(app));
});

// Get all the books in the list & filter options
app.get('/books', (req, res) => {
  // get only books that have been ranked
  const isRanked = req.query.isRanked

  // get only books with a certain minimum ranking
  const minRating = req.query.minRating;

  // get only books by a certain author
  const author = req.query.author;

  let filteredBooks = books;

  if (isRanked) {
    filteredBooks = filteredBooks.filter((book) => book.ratings_count !== 0)
  };

  if (minRating) {
    filteredBooks = filteredBooks.filter((book) => book.average_rating >= minRating)
  };

  if (author) {
    filteredBooks = filteredBooks.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  };

  res.json(filteredBooks);
});

// Get a specific book usig the ID
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.bookID === +id);
  res.json(book);
});

// Get all books in a specific language
app.get('/languages/:language', (req, res) => {
  const language = req.params.language;
  const booksInLanguage = books.filter((book) => book.language_code === language);
  res.json(booksInLanguage);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
