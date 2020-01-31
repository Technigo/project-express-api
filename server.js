import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json';
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json';
import netflixData from './data/netflix-titles.json';
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

app.get('/netflix', (req, res) => {
  res.json(netflixData);
});

app.get('/shows/:id', (req, res) => {
  const id = req.params.id;
  console.log({ id });
  const showId = netflixData.filter(item => item.show_id === +id);
  console.log('id path parameter');
  res.json(showId);
});

//This works
//Filter based on title OR country OR description
app.get('/api', (req, res) => {
  // query parameter
  const searchString = req.query.search;
  let filteredApi = netflixData;

  if (searchString) {
    //Filter once on multiple fields
    filteredApi = filteredApi.filter(item => {
      const itemTitle = item.title.toString();
      const itemCountry = item.country.toString();
      const itemDescription = item.description.toString();
      const itemType = item.type.toString();
      return (
        itemTitle.includes(searchString.toLowerCase()) ||
        itemCountry.includes(searchString) ||
        itemDescription.includes(searchString) ||
        itemType.includes(searchString)
      );
    });
  }
  res.json(filteredApi);
});

app.get('/shows', (req, res) => {
  const titleSearch = req.query.title;
  const showCountry = netflixData;

  if (titleSearch) {
    showCountry = showCountry.filter(item => {
      return itemTitle.includes(titleSearch.toLowerCase());
    });
  }

  res.json(showCountry);
});

// Is working
app.get('/shows/:year', (req, res) => {
  const year = req.params.year;
  const showGenre = req.query.genre;
  const showType = req.query.type;

  let releaseYear = netflixData.filter(item => item.release_year === +year);

  if (showType) {
    releaseYear = releaseYear.filter(type =>
      type.type.toLowerCase().includes(showType.toLowerCase())
    );
  }

  res.json(releaseYear);
});

app.get('/books', (req, res) => {
  const { page } = req.query; // "2"
  const startIndex = +page * 20;

  res.json(booksData.slice(startIndex, 20)); // only sends 20 item on one page.
});

app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  console.log();
  const findBook = booksData.find(book => book.bookId === +id);
  res.json(findBook);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
