import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json';
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json';
console.log(`Number of books: ${booksData.length}`);
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
  res.send('Hello API');
});

// A Collection of results - An array with book elements
// that can be filtered by title or author
app.get('/books', (req, res) => {
  const { author, title } = req.query;

  console.log(`The title value is: ${title}`);
  console.log(`The authors value is: ${author}`);

  // Query parameter filters for author and title
  if (author) {
    const filteredAuthors = booksData.filter((item) =>
      item.authors.toLowerCase().includes(author.toLowerCase())
    );
    res.json(filteredAuthors);
  } else if (title) {
    const filteredTitles = booksData.filter((item) =>
      item.title.toString().toLowerCase().includes(title.toLowerCase())
    );
    res.json(filteredTitles);
  } else {
    res.json(booksData);
  }
});

// A Single result - A single book element find by id
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  const book = booksData.find((item) => item.bookID === +id);

  // If the book doesn't exist, status set to 404 and returning a useful data in the response
  if (!book) {
    res.status(404).send({ error: `No book with id: ${id} found` });
  }

  res.json(book);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
