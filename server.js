import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import booksData from './data/books.json';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
// Home, path '/'
app.get('/', (req, res) => {
  res.send(listEndpoints(app)); 
});

// All books, path '/books'
// Books by author, query path: '/books?author=adams'
// Books by title, query path: '/books?title=bill'
app.get('/books', (req, res) => {
  const { author, title } = req.query;
  let booksToSend = booksData;

  if (author) {
    booksToSend = booksToSend.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()));
  }

  if (title) {
    booksToSend = booksToSend.filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()));
  }

  if (booksToSend.length === 0) {
    res.status(404).send(`Sorry, could not find any books!`);
  }

  res.json(booksToSend);
});

// 20 first books by top rating (4 or higher), path: 'books/toprating'
app.get('/books/toprating', (req, res) => {
  const twentyBooksByTopRating = booksData.filter((book) => book.average_rating >= 4).slice(0, 20);

  res.json(twentyBooksByTopRating);
});

// Books by short reads, path: '/books/shortread'
app.get('/books/shortread', (req, res) => {
  const shortRead = booksData.filter((book) => book.num_pages <= 500);

  res.json(shortRead);
});

// Book by id, path: '/books/1' 
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const singleBook = booksData.find((book) => book.bookID === +id);

  if (!singleBook) {
    res.status(404).send(`Sorry, could not find a book with id number ${id}.`);
  }

  res.json(singleBook);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});