import express from 'express';
import cors from 'cors';

// importing the JSON from the books.json
import booksData from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

// gets all books
app.get('/books', (req, res) => {
  res.json(booksData);
});

// returns an array of books from a specified author
app.get('/author/:authors', (req, res) => {
  const author = req.params.authors;
  const showAuthor = booksData.filter((item) => item.authors === author);
  res.json(showAuthor);
});

// returns one book with the specified ISBN-number
app.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const myIsbn = booksData.filter((item) => item.isbn === +isbn);
  res.json(myIsbn);
});

// Start the server on 8080 local server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
