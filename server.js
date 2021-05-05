import express from 'express';
import cors from 'cors';

import booksData from './data/books.json';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
// Home: path '/'
app.get('/', (req, res) => {
  res.send('Hello world, welcome to my API.'); // Change this into an appropriate message, connect it to my live project with frontend
});

// Books: path '/books'
app.get('/books', (req, res) => {
  res.json(booksData);
});

// Books by author
// Example path: '/books/authors?author=adams'
app.get('/books/authors', (req, res) => {
  const { author } = req.query; 
  const booksByAuthor = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()));

  if (booksByAuthor.length === 0) {
    res.status(404).send(`Sorry, could not find any books by ${author}.`);
  }

  res.json(booksByAuthor);
});

// Books by title
// Example path: '/books/titles?title=bill'
app.get('/books/titles', (req, res) => {
  const { title } = req.query; 
  const booksByTitle = booksData.filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()));

  if (booksByTitle.length === 0) {
    res.status(404).send(`Sorry, could not find any books with the title "${title}".`);
  }

  res.json(booksByTitle);
});

// Books by top rating
// Example path: 'books/toprating?rating=4'
app.get('/books/toprating', (req, res) => {
  const { rating } = req.query;
  const booksByTopRating = booksData.filter((book) => book.average_rating >= 4);

  if (booksByTopRating.length === 0) {
    res.status(404).send(`Sorry, could not find any books with the rating of ${rating}.`);
  }

  res.json(booksByTopRating);
});

// Book by id 
// Example path: '/books/1' 
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
