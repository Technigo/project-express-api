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

// Books by author: path '/books/search'
// Example path: '/books/search?author=J.K.Rowling'
app.get('/books/search', (req, res) => {
  const { author, title } = req.query; // maybe you can add more queries within the braces?
  const booksByAuthor = booksData.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()));
  const booksByTitle = booksData.filter((bookTitle) => bookTitle.title.toLowerCase().includes(title.toLowerCase()));

  if (booksByAuthor.length === 0) {
    res.status(404).send(`Sorry, could not find any books by ${author}.`);
  }

  if (booksByTitle.length === 0) {
    res.status(404).send(`Sorry, could not find any books with title ${title}.`);
  }

  res.json(booksByAuthor);
  res.json(booksByTitle);
});

// Books by title: path '/books/search'
// Example path: '/books/search?title='
// app.get('/books/search')



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
