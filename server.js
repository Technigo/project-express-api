import express from "express";
import cors from "cors";

import titles from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Netflix titles, the API");
});

app.get("/netflix-titles", (req, res) => {
  res.json(titles);
});

app.get("/netflix-titles/movies", (req, res) => {
  let movies = titles.filter((title) => title.type === "Movie");
  res.json(movies);
});

app.get("/netflix-titles/tv-shows", (req, res) => {
  let tvShows = titles.filter((title) => title.type === "TV Show");
  res.json(tvShows);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
