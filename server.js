import express, { request, response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import data from "./data/netflix-titles.json";

// Variable that will show an error message when no results are found
const ERROR_SHOW_NOT_FOUND = { error: "No results were found." };

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(
    "Hello Netflix! See the README file on Github to learn how to filter the API."
  );
});

// Route to list all the content in the show array
app.get("/shows", (req, res) => {
  let shows = data.slice(0, 150);
  res.json(shows);
});

// Route to list all the movies in the show array
app.get("/shows/movies", (req, res) => {
  let movieArray = data.slice(0, 150);
  const movie = movieArray.filter((item) => item.type == "Movie");
  res.json(movie);
});

// This route makes it possible to search a specific movie and display the object
app.get("/shows/movies/:movies", (req, res) => {
  const { movies } = req.params;
  const movie = data.filter((item) => item.title == movies);
  if (movie.length === 0) {
    res.status(404).json(ERROR_SHOW_NOT_FOUND);
  } else {
    res.json(movie);
  }
});

// Route to list all the tv shows in the show array
app.get("/shows/tvshows", (req, res) => {
  const tvshow = data.filter((item) => item.type == "TV Show");
  res.json(tvshow);
});

// This route makes it possible to search a specific tv show and display the object
app.get("/shows/tvshows/:tvshows", (req, res) => {
  const { tvshows } = req.params;
  const tvShow = data.filter((item) => item.title == tvshows);
  if (tvShow.length === 0) {
    res.status(404).json(ERROR_SHOW_NOT_FOUND);
  } else {
    res.json(tvShow);
  }
});

// This route makes it possible to search a specific country and list all shows from that country
app.get("/shows/countries/:countries", (req, res) => {
  const { countries } = req.params;
  const showCountry = data.filter((item) => item.country == countries);
  if (showCountry.length === 0) {
    res.status(404).json(ERROR_SHOW_NOT_FOUND);
  } else {
    res.json(showCountry);
  }
});

// This route makes it possible to search on the id and return a single object from the array
app.get("/shows/:id", (req, res) => {
  const { id } = req.params;
  const showFound = data.find((show) => show.show_id === +id);
  if (!showFound === true) {
    res.status(404).json(ERROR_SHOW_NOT_FOUND);
  } else {
    res.json(showFound);
  }

  console.log(`Req.params: ${JSON.stringify(req.params)}`);
});

// Dummy endpoint for future coding
app.get("/shows/categories", (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
