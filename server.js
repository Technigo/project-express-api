import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import netflixData from './data/netflix-titles.json';
import topMusicData from './data/top-music.json';

/* Defines the port the app will run on. Defaults to 8080, but can be overridden when starting the server. */
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Takes two arguments. Path and callback function. req, res => request, response. req is handeling what the frontend is sending to the backend and the res is what the backend is sending to the frontend

// lists all the endpoints
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// Testing the new way of things.
app.get('/', (req, res) => {
  res.send('Hello! Here is Hedvigs first API! ✨ 🥑 🌲');
  res.send('For more info 👉  https://github.com/HedvigM/project-express-api');
});

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Jorid', age: 0 },
    { id: 2, name: 'Hedvig', age: 30 },
    { id: 3, name: 'Jobjörn', age: 33 },
    { id: 4, name: 'Moa', age: 5 },
  ]);
});

// ---------- Using the Netflix data ----------//

// '/movies' route will show the whole array with all data from Netflix.
app.get('/movies', (req, res) => {
  res.json(netflixData);
});

// Using the params method to sort by release year.
app.get('/year/:year', (req, res) => {
  const year = req.params.year;

  // I use filter because there is a lot of movies that were released in each year.
  const releasedYear = netflixData.filter(
    (item) => item.release_year === +year
  );
  res.json(releasedYear);
});

// Using the params method to filter out one movie by title. If the movie are not found, then trigger a 404(418, i'm a teapot).
app.get('/title/:title', (req, res) => {
  const { title } = req.params;

  const titleID = netflixData.find((movie) => movie.title === title);

  if (!titleID) {
    res.status(418).send('No movie found with that id');
  } else {
    res.status(200).json({
      response: titleID,
      success: true,
    });
  }
});
// ---------- Using the Music data ----------//
// Using the query method
// to sort, write '/music?genre=pop&artist=ed' in the postman or browser.
app.get('/music', (req, res) => {
  const { artist, genre } = req.query;

  let musicToSend = topMusicData;

  if (artist) {
    musicToSend = musicToSend.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1
    );
  }

  if (genre) {
    musicToSend = musicToSend.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    );
  }

  res.json({
    response: musicToSend,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
