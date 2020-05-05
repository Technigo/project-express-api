import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import topMusicData from './data/top-music.json'

const port = process.env.PORT || 8080;
const app = express();

// Middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());
// ---------------------------------------------------- //
app.get("/", (req, res) => {
  res.send("My API endpoints: /all, all/comedies/, /all:id, /movie, /tv, /year/:year, and a res.status(404).send");
});
// ---------------------------------------------------- //
// IF CHANGING THE ROUTE - restart server if error
// ---------------------------------------------------- //

// Get ALL movies and tv shows:
// http://localhost:8080/all
app.get("/all", (req, res) => {
  res.json(netflixData);
});

// Get all by actor Brad Pitt
// http://localhost:8080/all/star?name=Brad%20Pitt
app.get("/all/star", (req, res) => {
  const { name } = req.query;

  const movieStar = netflixData.filter((person) => person.cast.includes(name))

  res.json(movieStar)
})


// Get a specific id based on ("show_id"):
// http://localhost:8080/all/81193313
app.get("/all/:id", (req, res) => {
  const movieId = req.params.id;
  const showId = netflixData.find((item) => item.show_id === +movieId);
  if (showId) {
    res.json(showId);
  } else {
    res.status(404).send(`No info found for id: ${movieId}. Please try again!`)
  }
});

// Get only Type: MOVIES:
// http://localhost:8080/movie/
app.get("/movie", (req, res) => {
  // const movies = req.params.movies
  const movieAll = netflixData.filter((item) => item.type === "Movie") 
  // const filteredMovies = movies
  res.json(movieAll)
})

// Get only Type: TV Show:
// http://localhost:8080/tv/
app.get("/tv", (req, res) => {
  // const tvshow = req.params.movies
  const tvAll = netflixData.filter((item) => item.type === "TV Show")
  // const filteredMovies = movies
  res.json(tvAll)
})


// Get ALL per year:
// http://localhost:8080/year/2008
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  // console.log({year})
  const releaseYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releaseYear)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

