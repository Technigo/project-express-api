import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from "./data/netflix-titles.json";
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());
// ---------------------------------------------------- //
// ---------------------------------------------------- //

// MY API ENDPOINT:
app.get("/", (req, res) => {
  res.send("My API endpoint");
});
// ---------------------------------------------------- //

// Start defining your routes here:
// IF CHANGING THE ROUTE - restart server

// ---------------------------------------------------- //
// Get ALL movies and tv shows:
// http://localhost:8080/all
app.get("/all", (req, res) => {
  res.json(netflixData);
});

// ---------------------------------------------------- //
// Get a specific id ("show_id"):
// http://localhost:8080/all/81193313
app.get("/all/:id", (req, res) => {
  const movieId = req.params.id;
  const showId = netflixData.find((item) => item.show_id === +movieId);
  if (showId) {
    res.json(showId);
  } else {
    // res.json("404");
    res.status(404).send(`No info found for id: ${movieId}. Please try again!`)
  }
});

// ---------------------------------------------------- //
// Get only Type: MOVIES:
// http://localhost:8080/movie/
app.get("/movie", (req, res) => {
  // const movies = req.params.movies
  const movieAll = netflixData.filter((item) => item.type === "Movie")
  // const filteredMovies = movies
  res.json(movieAll)
})
// ---------------------------------------------------- //
// Get only Type: TV Show:
// http://localhost:8080/tv/
app.get("/tv", (req, res) => {
  // const tvshow = req.params.movies
  const tvAll = netflixData.filter((item) => item.type === "TV Show")
  // const filteredMovies = movies
  res.json(tvAll)
})

// ---------------------------------------------------- //
// Get ALL per year:
// http://localhost:8080/year/2008
app.get("/year/:year", (req, res) => {
  const year = req.params.year
  // console.log({year})
  const releaseYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releaseYear)
})

// ---------------------------------------------------- //










// ---------------------------------------------------- //
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



/*

// Get only Tv shows:
app.get("/tv-shows", (req, res) => {
  const tvShows = req.params.tvShows;
  const showTV = req.query.showTV;

  const allTV = netflixData.filter((item) => item.type === "TV Show");

  if (showTV) {
    res.json(allTV);
  }
});






*/