import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksData from './data/books.json';

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

// / endpoint (Root - Homepage)
// RETURNS: A list of available endpoints (in an array)
app.get('/', (req, res) => {
  if (!res) {
    res
      .status(404)
      .send({ error: 'Sorry, seems like there is an issue, try agian later!' });
  } else res.send(myEndpoints(app));
});

// /books endpoint
// RETURNS: A list of books from books.json with PAGINATION as default with 30 results per page
//
// PARAMETERS:
//  - page
//     usage: /books/?page=4
//  - pageSize
//     usage: /books/?pageSize=10
//  - author
//     usage: /books/?author=douglas adams
//  - title
//     usage: /books/?title=harry
app.get('/books', (req, res) => {
  const { author, title } = req.query;
  let booksList = booksData;
  const totalNumberOfBooks = booksList.length;

  // Query by author
  if (author) {
    booksList = booksList.filter((item) =>
      item.authors.toLowerCase().includes(author.toLowerCase())
    );
  }

  // Query by title
  if (title) {
    booksList = booksList.filter((item) =>
      item.title.toString().toLowerCase().includes(title.toLowerCase())
    );
  }

  // PAGINATION by using slice - Default with 30 results per page
  const page = req.query.page ? req.query.page - 1 : 0; // 0 as default
  const pageSize = req.query.pageSize ?? 30; // 30 as default
  const startIndex = page * pageSize; // Calculate start index
  const endIndex = startIndex + +pageSize; // Calculate and bound the end index
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

// /books/top-20-rated endpoint
// RETURNS: A list of 20 top rated books from books.json
app.get('/books/top-20-rated', (req, res) => {
  const sortedOnRating = booksData.sort(
    (a, b) => b.average_rating - a.average_rating
  );
  const topRatedArray = sortedOnRating.slice(0, 20);

  if (topRatedArray.length === 0) {
    res.status(404).send({
      error: 'Sorry, no books where found.'
    });
  } else
    res.json({
      topTwentyRated: 'A list of 20 top rated books from books.json',
      results: topRatedArray
    });
});

// /books/:id endpoint
// RETURNS: A single book by id from books.json
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const bookId = booksData.find((item) => item.bookID === +id);

  if (!bookId) {
    res.status(404).send({ error: `No book with id: ${id} found.` });
  } else res.json(bookId);
});

// /authors endpoint
// RETURNS: A list of unique authors from books.json
app.get('/authors', (req, res) => {
  const authorsArray = booksData.map((item) => item.authors);

  // 3 ways to get unique values from an array
  // https://www.youtube.com/watch?v=IorhmUhPgFs

  // # 1 - Filter function
  // const uniqueAuthorsArray = authorsArray.filter(
  //   (currentValue, index, arr) => arr.indexOf(currentValue) === index
  // );

  // # 2 - Reduce and includes funtion
  // const uniqueAuthorsArray = authorsArray.reduce(
  //   (acc, currentValue) =>
  //     acc.includes(currentValue) ? acc : [...acc, currentValue],
  //   []
  // );

  // same as #2 but with other naming convention and a return
  // const uniqueAuthorsArray = authorsArray.reduce((unique, item) => {
  //   return unique.includes(item) ? unique : [...unique, item];
  // }, []);

  // #3 - Set
  const uniqueAuthorsArray = [...new Set(authorsArray)];

  if (uniqueAuthorsArray.length === 0) {
    res.status(404).send({
      error: 'Sorry, no authors where found.'
    });
  } else
    res.json({
      numberOfAuthors: uniqueAuthorsArray.length,
      results: uniqueAuthorsArray
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
