import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from "./data/golden-globes.json";
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
// import spotifyData from "./data/spotify.json";


// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// error message
const ERROR_SHOWS_NOT_FOUND = { error: "No show matched your request" };

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to the Netflixdata API");
});

// This route will return a collection of shows
app.get("/shows", (req, res) => {
  res.json(netflixData);
});

// This route will return a single show based on id
app.get("/shows/:id", (req, res) => {
  const id = req.params.id;
  const show = netflixData.find(
    (item) => item.show_id === +id
  );
  if (!show) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND);
  } else {
    res.json(show);
  }
});

// This route will return a collection of shows with the specified word in title
app.get("/shows/titles/:title", (req, res) => {
  const { title } = req.params;
  const filteredShows = netflixData.filter(
    (item) => item.title && item.title.toString().includes(title)
  );
  if (filteredShows.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND);
  } else {
    res.json(filteredShows);
  }
});

// This route will return a collection of shows released the specified year in the specified country
app.get("/shows/years/:year/countries/:country", (req, res) => {
  const { year, country } = req.params;

  let filteredShows = netflixData;

  filteredShows = filteredShows.filter(
    (item) => item.release_year === +year
  );
  filteredShows = filteredShows.filter(
    (item) => item.country === country
  );
  if (filteredShows.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND);
  } else {
    res.json(filteredShows);
  }
});


// This route will return a collection of shows of the specified type and matching different query searches (year and country)
app.get("/shows/types/:type", (req, res) => {
  const { type } = req.params;
  const { year, country } = req.query;

  let filteredShows = netflixData;

  filteredShows = filteredShows.filter(
    (item) => item.release_year === +year
  );
  filteredShows = filteredShows.filter(
    (item) => item.country === country
  );
  filteredShows = filteredShows.filter(
    (item) => item.type === type
  );
  if (filteredShows.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND);
  } else {
    res.json(filteredShows);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
