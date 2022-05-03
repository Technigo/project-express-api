import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
import netflixData from './data/netflix-titles.json';
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
  res.send('Hello Technigo!');
});

app.get('/movies', (req, res) => {
  res.status(200).json(netflixData);
});

app.get('/movies/:country', (req, res) => {
  const whatCountry = netflixData.find(
    (movie) => movie.country.toLowerCase() === req.params.country
  );

  res.status(200).json(whatCountry);
});

app.get('/:title', (req, res) => {
  const whatTitle = netflixData.find(
    (movie) => movie.title.toLowerCase() === req.params.title
  );

  res.status(200).json(whatTitle);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
