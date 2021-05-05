/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import express from 'express';
import cors from 'cors';

import booksData from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
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

// Books by author: path '/books/search'
// Example path: '/books/search?author=J.K.Rowling'
app.get('/books/search', (req, res) => {
  const { author } = req.query; // maybe you can add more queries within the braces
  const booksByAuthor = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()));

  if (booksByAuthor.length === 0) {
    res.status(404).send(`Sorry, could not find any books by ${author}.`);
  }
    
  res.json(booksByAuthor);
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
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
