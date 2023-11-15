import express from "express";
import cors from "cors";

import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
  // res.send("Hello Technigo!");
});

/* #REGION Movies and TV-shows

app.get("/movies", (req, res) => {
  res.send(netflixData);
});

app.get("/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId;

  const movie = netflixData.find((movie) => movie.movieId === +movieId);

  movie
    ? res.json(movie)
    : res
        .status(404)
        .send(
          "Sorry, we don't have that movie. Please try looking for a different one!"
        );
  res.send();
});

app.get("tvshows", (req, res) => {
  res.send(netflixData);
});

app.get("/tvshows/:tvshow", (req, res) => {
  const tvshowId = req.params.tvshow;

  const tvShow = netflixData.find((tvshow) => tvshow.show_id === +tvshowId);

  tvShow
    ? res.json(tvShow)
    : res
        .status(404)
        .send(
          "Sorry, we don't have that tv-show. Please check to see if you can find another one you like in our selection!"
        );
});

#ENDREGION*/

app.get("/titles", (req, res) => {
  res.send(netflixData);
});

app.get("/titles/:titleId", (req, res) => {
  const titleId = req.params.titleId;

  const title = netflixData.find((title) => title.show_id === +titleId);

  title
    ? res.json(title)
    : res
        .status(404)
        .send(
          "Sorry, we don't have this title. Please check if we have another one that you might like!"
        );
});

//404 page
app.use((req, res) => {
  res.send(`<div><h1>Oops, this page doesn't exist 👻</h1>
  <button onclick="">Go back</button></div`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} 🚀`);
});
