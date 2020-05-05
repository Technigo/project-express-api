import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import netflixData from './data/netflix-titles.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
console.log(netflixData.length);

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/movies', (req, res) => {
  res.json(netflixData);
});

// route for getting data on a certain movie
app.get('/movies/:movie', (req, res) => {
  const movie = req.params.movie;
  const chosenMovie = netflixData.filter((item) => item.title === movie);
  res.json(chosenMovie);
});

// route for getting movies from a certain category
app.get('/genres/:genre', (req, res) => {
  const genre = req.params.genre;
  const movieGenre = netflixData.filter((item) =>
    item.listed_in.toLowerCase().includes(genre.toLowerCase())
  );
  res.json(movieGenre);
});

// route for getting movies with a certain actor
app.get('/actors/:actor', (req, res) => {
  const actor = req.params.actor;
  const chosenActor = netflixData.filter((item) =>
    item.cast.toLowerCase().includes(actor.toLowerCase())
  );
  res.json(chosenActor);
});

// route for getting movies with a certain director
app.get('/directors/:director', (req, res) => {
  const director = req.params.director;
  const chosenDirector = netflixData.filter((item) =>
    item.director.toLowerCase().includes(director.toLowerCase())
  );
  res.json(chosenDirector);
});

// route for getting movies from a certain year
app.get('/year/:year', (req, res) => {
  const year = req.params.year;
  const releaseYear = netflixData.filter((item) => item.release_year === +year);
  res.json(releaseYear);
});

// route for getting movies from a certain country
app.get('/countries/:country', (req, res) => {
  const country = req.params.country;
  const chosenCountry = netflixData.filter(
    (item) => item.country.toLowerCase() === country.toLowerCase()
  );
  res.json(chosenCountry);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('404.ejs');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
