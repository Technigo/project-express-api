import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import data from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
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

//all shows

app.get("/shows", (req, res) => {
  let shows = data.slice(0, 200);
  const country = req.query.country;
  if (country) {
    shows = data.filter((item) => item.country === country);
  }
  res.json(shows);
});

//query for anything

app.get("/shows/any", (req, res) => {
  let shows = data.slice(0, 200);
  const query = req.query.query;
  if (query) {
    shows = data.filter(
      (item) =>
        item.title === query ||
        item.type === query ||
        item.director === query ||
        item.release_year === +query ||
        item.country === query
    );
  }
  res.json(shows);
});

//all shows limited

app.get("/shows/page", (req, res) => {
  const page = req.query.page;
  let shows = data.slice(0, 50);
  if (page) {
    shows = data.slice(page * 50, page * 50 + 50);
  }
  res.json(shows);
});

//tv shows

app.get("/shows/tvshows", (req, res) => {
  const tvData = data.filter((item) => item.type == "TV Show");
  res.json(tvData);
});

//movies

app.get("/shows/movies", (req, res) => {
  const movieData = data.filter((item) => item.type == "Movie");
  res.json(movieData);
});

//shows from a specific year

app.get("/shows/year/:year", (req, res) => {
  const year = req.params.year;
  const showsFromYear = data.filter((item) => item.release_year == year);
  res.json(showsFromYear);
});

//show with a specific title

app.get("/shows/:showID", (req, res) => {
  const titleID = req.params.showID;
  const titleWithID = data.find((item) => item.show_id == +titleID);
  if (!titleWithID) {
    res.send("Not Found!!");
  } else {
    res.json(titleWithID);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
