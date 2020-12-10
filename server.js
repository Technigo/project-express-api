import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksData from './data/books.json';
console.log(`Number of books: ${booksData.length}`);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const myEndpoints = require('express-list-endpoints');

// Start defining your routes here
app.get('/', (req, res) => {
  if (!res) {
    res
      .status(404)
      .send({ error: 'Sorry, seems like there is an issue, try agian later!' });
  } else res.send(myEndpoints(app));
});

// A Collection of results - An array with book elements
// that can be filtered by title or author.
// Returns an object with the fields booksData, filteredAuthors and filteredTitles
// plus number of books listed.
app.get('/books', (req, res) => {
  const { author, title } = req.query;
  console.log(`The author value is: ${author}`);
  console.log(`The title value is: ${title}`);

  let booksList = booksData;
  const totalNumberOfBooks = booksList.length;

  // Query parameter to filter by author
  if (author) {
    booksList = booksList.filter((item) =>
      item.authors.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Query parameter to filter by title
  if (title) {
    booksList = booksList.filter((item) =>
      item.title.toString().toLowerCase().includes(title.toLowerCase())
    );
  }

  // Add pagination by using slice
  const page = req.query.page ? req.query.page - 1 : 0; //otherwise 0 as default
  const pageSize = req.query.pageSize ?? 30; //otherwise 30 as default

  console.log(page);

  // Calculate start index
  const startIndex = page * pageSize;

  // Calculate and bound the end index
  const endIndex = startIndex + +pageSize;

  console.log(startIndex + '--' + endIndex);

  const booksListPerPage = booksList.slice(startIndex, endIndex);
  const returnObject = {
    totalNumberOfBooks: totalNumberOfBooks,
    totalNumberOfPages: Math.ceil(booksList.length / pageSize), // Round a number upward to its nearest integer
    currentPage: page + 1,
    pageSize: pageSize,
    startIndex: startIndex,
    endIndex: endIndex,
    numberOfBooks: booksList.length,
    results: booksListPerPage
  };

  // If the result is zero, status set to 404 and returning a useful data in the response
  if (booksListPerPage.length === 0) {
    res.status(404).send({
      error: 'Sorry, no books where found, please try a different query.'
    });
  }

  res.json(returnObject);
});

// A Single result - A single book element find by id
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  console.log(`The id value is: ${id}`);

  const bookId = booksData.find((item) => item.bookID === +id);

  // If the book doesn't exist, status set to 404 and returning a useful data in the response
  if (!bookId) {
    res.status(404).send({ error: `No book with id: ${id} found.` });
  } else res.json(bookId);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
