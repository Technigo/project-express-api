import express from "express";
import cors from "cors";

import games from "./data/games.json";

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
  res.send(games);
});
app.get("/games", (req, res) => {
  res.json(games);
});

// get a specific company based on id, using param
app.get("/games/:id", (req, res) => {
  const { id } = req.params;

  const gamesId = games.find((game) => game.Rank === +id);

  if (!gamesId) {
    res.status(404).send("No games found with that id");
  } else {
    res.json(gamesId);
  }
});

// get all games from a platform
app.get("/games/platforms/:platform", (req, res) => {
  const { platform } = req.params;

  const platforms = games.filter((game) => game.Platform === platform);

  if (!platforms) {
    res
      .status(404)
      .send("No games found with that platform, or try to write platform");
  } else {
    res.json(platforms);
  }
});

// get all games from a year
app.get("/games/year/:year", (req, res) => {
  const { year } = req.params;

  const years = games.filter((game) => game.Year === +year);

  // doesn't return error
  if (!years) {
    res.status(404).send("No games found in that year");
  } else {
    res.json(years);
  }
});

// get all games from a genre
app.get("/games/genres/:genre", (req, res) => {
  const { genre } = req.params;

  const genres = games.filter((game) => game.Genre === genre);

  if (!genres) {
    res
      .status(404)
      .send("No games found with that genre, or try to write genres");
  } else {
    res.json(genres);
  }
});

// get all games from a publisher
app.get("/games/publishers/:publisher", (req, res) => {
  const { publisher } = req.params;

  const publishers = games.filter((game) => game.Publisher === publisher);

  if (!publishers) {
    res
      .status(404)
      .send("No games found from that publisher, or try to write publishers");
  } else {
    res.json(publishers);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
