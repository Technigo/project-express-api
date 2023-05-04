import express from 'express';
import cors from 'cors';
import Data from './data/books.json';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Welcome to my book API!');
});

//endpoint to get one random book
app.get('/books/random', (req, res) => {
  const randomBook = Data[Math.floor(Math.random() * Data.length)];
  randomBook.length !== 0
    ? res.json(randomBook)
    : res.status(404).send('No books found, please try again'); //if no books are found, send error message (this should not happen...)
});

// Endpoint to get all books in a specific language
app.get('/books/language/:lang', (req, res) => {
  const lang = req.params.lang;
  const booksInLanguage = Data.filter((item) => item.language_code === lang);

  booksInLanguage.length !== 0
    ? res.json(booksInLanguage)
    : res.status(404).send('No books in that language found, please try again'); //if no books are found, send error message
});

// Endpoint to get all books with a specific rating and in a specific language
app.get('/books/language/:lang/rating/:rating', (req, res) => {
  const rating = req.params.rating;
  const lang = req.params.lang;
  const booksInLanguageAndRating = Data.filter(
    (item) => item.language_code === lang && item.average_rating === +rating //+rating to convert string to number
  );
  booksInLanguageAndRating.length !== 0
    ? res.json(booksInLanguageAndRating)
    : res
        .status(404)
        .send('No books with that rating and language found, please try again'); //if no books are found, send error message
});

// Endpoint to get all books with a specific rating
app.get('/books/rating/:rating', (req, res) => {
  const rating = req.params.rating;

  const booksInRating = Data.filter((item) => item.average_rating === +rating);
  booksInRating.length !== 0
    ? res.json(booksInRating)
    : res.status(404).send('No books with that rating found, please try again'); //if no books are found, send error message
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
