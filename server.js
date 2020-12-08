import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import books from './data/books.json';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
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
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Get all the books in the list
app.get('/books', (req, res) => {
  res.json(books);
});

// Get all books in a specific language
app.get('/language/:language', (req, res) => {
  const language = req.params.language;
  const booksInLanguage = books.filter((book) => book.language_code === language);
  res.json(booksInLanguage);
});

// Get a specific book usig the ID
app.get('/id/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find((book) => book.bookID === +id);
  res.json(book);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
