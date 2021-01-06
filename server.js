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

////// My endpoints //////

// To list all available endpoints on the starting page
const listEndpoints = require('express-list-endpoints');
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
});

// The first endpoint, returns a collection of books
app.get('/books', (req, res) => {


  const page = req.query.page ?? 0;

  // Set query for which site to see, with 50 on each.
  // Total 500 books divided on 10 pages, going from 0 to 9
  if (page === page) {
    const pageSize = 50;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    let slicedBooks = books.slice(startIndex, endIndex)
    res.json(slicedBooks)
  };
  res.json(books) // This doesn't work

});

// The second endpoint, returns a single book based on bookID
app.get('/books/:id', (req, res) => {
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
  const topRated = books.filter((item) => item.average_rating >= 4);
  const sortedBooks = topRated.sort((a, b) => b.average_rating - a.average_rating);
  const top20Books = sortedBooks.slice(0, 20);
  res.json(top20Books);
});

// Empty/dummy endpoints to create and use later on if wanted
app.get('/books/isbn/:isbn', (req, res) => {
  // To search by isbn number
  res.send('This endpoint does not have any content yet!')
});

// To search on books with few pages
app.get('/books/fewpages', (req, res) => {
  res.send('This endpoint does not have any content yet!')
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
