import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import booksData from './data/books.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
});

// query to filter on autor, title and language.
app.get('/books', (req, res) => {
  const { author, title, language } = req.query

  if (!author && !title && !language) {
    res.status(404).send("Mandatory parameters are missing");
    return;
  }

  let bookList = booksData;

  if (author) {
    bookList = bookList
      .filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  if (title) {
    bookList = bookList
      .filter((book) => book.title.toString().toLowerCase().includes(title.toLowerCase()))
  }

  if (language) {
    bookList = bookList
      .filter((book) => book.language_code.toLowerCase().includes(language.toLowerCase()))
  }

  if (bookList.length) {
    res.json(bookList)
  } else {
    res.status(404).send("No match");
  }
});

// endpoint to get the top 5 books sorted on rating
app.get('/top5', (req, res) => {
  const books = booksData.sort((a, b) => b.average_rating - a.average_rating);
  res.json(books.slice(0, 5))
});

// endpoint to get the 20 books with most textreviews
app.get('/textreviews', (req, res) => {
  const books = booksData.sort((a, b) => b.text_reviews_count - a.text_reviews_count);
  res.json(books.slice(0, 20));
})

// endpoint for isbn
app.get('/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const books = booksData.find((book) => book.isbn === +isbn)
  if (!books) {
    res.status(404).send("Book isbn not found");
  } else {
    res.json(books)
  }
});

// endpoint for id
app.get('/id/:id', (req, res) => {
  const { id } = req.params
  const books = booksData.find((book) => book.bookID === +id)
  if (!books) {
    res.status(404).send("Book id not found");
  } else {
    res.json(books)
  }
});

// endpoint to filter on author, ska jag ha kvar den?? Behövs fixas isf
// need to put includes here... precis som i guery?
app.get('/author/:author', (req, res) => {
  const { author } = req.params;
  const books = booksData.filter((book) => book.authors === author)
  res.json(books)
});

// endpoint to filter on language
// ska jaag ha lang/lang eller books/lang
app.get('/lang/:lang', (req, res) => {
  const { lang } = req.params
  const books = booksData.filter((book) => book.language_code === lang)
  if (!books.length) {
    res.status(404).send("Language not found");
  } else {
    res.json(books)
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
});

// Dummy endpoints

// Filter on number of pages
// app.get('books/pages)

// Filter out one author and sort the rating of their books high to low
// app.get('books/authorrating')

// Filter out books that is written in several languages
// app.get(books/)