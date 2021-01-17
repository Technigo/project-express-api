import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// My choosen dataset
import books from './data/books.json';

// Defines the port the app will run on.
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

  // Query to set which page to see, with 50 books on each page.
  // /books?page=4
  // Total 500 books divided on 10 pages, going from 0 to 9. 
  const page = req.query.page;
  const pageSize = 50;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  // Query to search on word in book title - /books?title=heart
  const searchTitle = req.query.title;

  // Conditioning for searching on page
  if (page) {
    const slicedBooks = books.slice(startIndex, endIndex);
    if (slicedBooks.length === 0) {
      const error = new Error("Page not found");
      error.status = 404;
      throw error;
    }
    res.json(slicedBooks);
    // Conditioning for searching on word in title
  } else if (searchTitle) {
    const searchTitleList = books.filter((item) =>
      item.title.toString().toLowerCase().includes(searchTitle.toLowerCase()));
    if (searchTitleList.length === 0) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    res.json(searchTitleList);
  } else {
    // Get the full list with all 500 books
    res.json(books);
  }
});

// The second endpoint, returns a single book based on bookID
app.get('/books/:id', (req, res) => {
  const bookID = req.params.id;
  const bookById = books.find((item) => item.bookID === +bookID);

  // If book ID wasn't found
  if (!bookById) {
    res.send("Sorry, we cannot find any book with that ID :( Please try another ID!");
  };

  res.json(bookById);
});

// Returns all authors
app.get('/authors', (req, res) => {
  const authors = books.map((item) => item.authors);
  const uniqueAuthors = [...new Set(authors)];

  // Query to sort on author example: '/authors?author=Tolstoy
  const searchOnAuthor = req.query.author;
  if (searchOnAuthor) {
    const searchOnAuthorObject = books.filter((item) =>
      item.authors.toString().toLowerCase().includes(searchOnAuthor.toLowerCase()));
    const searchOnAuthorList = searchOnAuthorObject.map((item) => item.authors);
    const uniqueSearchedAuthors = [...new Set(searchOnAuthorList)];
    // Error handling
    if (uniqueSearchedAuthors.length === 0) {
      const error = new Error(`${searchOnAuthor} not found.`);
      error.status = 404;
      throw error;
    }
    res.json(uniqueSearchedAuthors);
  } else {
    // Return all unique authors
    res.json(uniqueAuthors);
  }
});

// Return all books by specific author 
// Query string for example: /authors/author/books?author=Rowling
app.get('/authors/:author/books', (req, res) => {
  const author = req.params.author;
  const booksByAuthor = books.filter((item) => item.authors === author);

  const searchOnAuthor = req.query.author;
  if (searchOnAuthor) {
    const booksBySearchOnAuthor = books.filter((item) =>
      item.authors.toString().toLowerCase().includes(searchOnAuthor.toLowerCase()));

    // Error handling
    if (booksBySearchOnAuthor.length === 0) {
      const error = new Error(`${searchOnAuthor} not found!`);
      error.status = 404;
      throw error;
    }
    res.json(booksBySearchOnAuthor);
  } else {
    res.json(booksByAuthor);
  }
});

// Top rated books, the 20 highest 
app.get('/top-rated', (req, res) => {
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
