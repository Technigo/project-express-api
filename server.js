import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import netflixData from './data/netflix-titles.json';
let movies = netflixData;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here

app.get('/api/movies', (req, res) => {
  const queryYear = +req.query.year;

  if (queryYear) {
    movies = movies.filter(movie => movie.release_year === queryYear);
  }

  if (movies.length > 0) {
    res.json(movies);
  } else {
    res.status(404).send('No movies found.');
  }
});

app.get('/api/movies/:id', (req, res) => {
  const id = +req.params.id;
  // console.log({ year });
  const movie = movies.find(item => item.show_id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send(`No movie found with id ${id}.`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
