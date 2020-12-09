import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// My choosen dataset
import books from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello, welcome to Gabriella´s API with books!')
});

// The first endpoint, returns a collection of books
app.get('/books', (req, res) => {
  
  // Set a filter with query parameter to filter on
  // only the books with average_rating > 4.0
  const highRating = req.query.highRating;
  if (highRating) {
    books = books.filter((item) => item.average_rating > 4.0);
  };

  res.json(books)
});

// The second endpoint, returns a single book based on bookID
app.get('/books/book/:id', (req, res) => {
  const bookID = req.params.id;
  const bookById = books.find((item) => item.bookID === +bookID);
  
  // If bookID wasn't found
  if (!bookById) {
    res.send("Sorry, we cannot find any book with that ID :( Please try another ID!");
  };

  res.json(bookById);
});

// Returns all books per author /books/authorname
app.get('/books/author/:author', (req, res) => {
  const authors = req.params.author;
  const booksFromAuthors = books.filter((item) => item.authors === authors);
  
  // If authors is not found
  if (booksFromAuthors.length === 0) {
    res.send("Sorry, we cannot find any books from that author in our list. Try by entering the name in another way or search for another author.")
  };

  res.json(booksFromAuthors);
});

// Top rated books, the 20 highest 
app.get('/books/top-rated', (req, res) => {
  const topRated = books.filter((item) => item.average_rating >=4);
  const top20Books = topRated.slice(0, 20);
  res.json(top20Books);
});

// Empty/dummy endpoints
app.get('/books/lesspages', (req, res) => {
  res.send('This endpoint does not exist yet!')
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
