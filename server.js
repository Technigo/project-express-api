import express from 'express';
import cors from 'cors';
import imdbData from './data/imdb-top-250-movies.json';

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
  res.send('Hello banana!');
});

app.get('/topmovies', (req, res) => {
  res.json(imdbData);
});

app.get('/topmovies/:rank', (req, res) => {
  const rank = req.params.rank
  const rankId = imdbData.filter((item) => item.rank === +rank)
  console.log(rankId)

  res.json(rankId)
});


app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const releaseYear = imdbData.filter((item) => item.year === +year)
  console.log(releaseYear)

  res.json(releaseYear)
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
