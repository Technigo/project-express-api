import express, { response } from 'express';
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
  res.send('Hello asstwat!');
});


//shows all movies
app.get('/topmovies', (req, res) => {
  res.json(imdbData);
});

//makes it possible to search for a movie base on its rank
app.get('/rank/:rank', (req, res) => {
  const rank = req.params.rank
  const rankId = imdbData.filter((item) => item.rank === +rank)
  console.log(rankId)

  res.json(rankId)
});

//filters movies based on the release year

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const releaseYear = imdbData.filter((item) => item.year === +year)
  console.log(releaseYear)
  //adding a plus in front of year turns our string into number

  res.json(releaseYear)
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
