import express, { request, response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from "./data/books.json";

import data from "./data/netflix-titles.json";
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//

const ERROR_SHOW_NOT_FOUND = { error: "No ranking results were found." };

// RESTful routes to the API

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Route to list all the books in the API as an array
app.get("/shows", (req, res) => {
  let shows = data.slice(0, 150);
  res.json(shows);
});

app.get("/shows/movies", (req, res) => {
  const movie = data.filter((item) => item.type == "Movie");
  res.json(movie);
});

app.get("/shows/tvshows", (req, res) => {
  const tvshow = data.filter((item) => item.type == "TV Show");
  res.json(tvshow);
});

app.get("/shows/tvshows/:tvshows", (req, res) => {
  const { tvshows } = req.params;
  const tvShow = data.filter((item) => item.title == tvshows);
  res.json(tvShow);
});

app.get("/shows/country/:country", (req, res) => {
  const { country } = req.params;
  const showCountry = data.filter((item) => item.country == country);
  res.json(showCountry);
});

app.get("/shows/:id", (req, res) => {
  //let shows = data;

  const { id } = req.params;
  const showFound = data.find((show) => show.show_id === +id);
  if (data) {
    res.json(showFound);
  } else {
    res.status(404).json(ERROR_SHOW_NOT_FOUND);
  }
  // const showId = data.filter((item) => item.show_id === +id);
  // if (data) {
  //   res.json(data);
  // } else res.status(404).json({ error: `show id ${id} not found` });
  //res.json(showId);
  console.log(`Req.params: ${JSON.stringify(req.params)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
