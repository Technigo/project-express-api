import express from 'express';
import cors from 'cors';
import listEndPoints from 'express-list-endpoints';

// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json';
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/endpoints', (req, res) => {
  res.send(listEndPoints(app));
});

// route for all books
app.get('/books', (req, res) => {
  res.json({
    response: booksData,
    success: true,
  });
});

// route for the book with specific ID
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params;
  const bookId = booksData.find((book) => book.bookID === +id);

  if (!bookId) {
    res.status(400).json({
      response: 'No book found with that ID',
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookId,
      success: true,
    });
  }
});

// route for the book with specific title
app.get('/books/title/:title', (req, res) => {
  const { title } = req.params;

  const bookTitle = booksData.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (!bookTitle) {
    res.status(400).json({
      response: 'No book found with that title',
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookTitle,
      success: true,
    });
  }
});
// route for the books specific language
app.get('/books/language/:languageCode', (req, res) => {
  const { languageCode } = req.params;

  const booksByLanguage = booksData.filter(
    (books) => books.language_code.toLowerCase() === languageCode.toLowerCase()
  );

  res.status(200).json({
    response: booksByLanguage,
    success: true,
  });
});
// route for the book with specific ISBN
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;

  const bookByIsbn = booksData.find(
    (book) => book.isbn === +isbn || book.isbn13 === +isbn
  );

  if (!bookByIsbn) {
    res.status(400).json({
      response: 'No book found with that ISBN/ISBN13',
      success: false,
    });
  } else {
    res.status(200).json({
      response: bookByIsbn,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
