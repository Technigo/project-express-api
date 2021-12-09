/* eslint-disable implicit-arrow-linebreak */
import express from "express";
import cors from "cors";
// import listEndpoints from "express-list-endpoints";

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

// Routes
app.get("/", (req, res) => {
  res.send(games);
});

app.get("/games", (req, res) => {
  const { genre, platform } = req.query;

  let gamesToSend = games;

  if (genre) {
    gamesToSend = gamesToSend.filter(
      (item) => item.Genre.toLowerCase().indexOf(genre.toLowerCase()) === 0
    );
  }

  if (platform) {
    gamesToSend = gamesToSend.filter(
      (item) =>
        item.Platform.toString()
          .toLowerCase()
          .indexOf(platform.toLowerCase()) === 0
    );
  }

  res.json({
    response: gamesToSend,
    success: true,
  });
});

app.get("/games", (req, res) => {
  res.json(games);
});

// get a specific game based on id, using param
app.get("/games/:id", (req, res) => {
  const { id } = req.params;

  const gamesId = games.find((game) => game.Rank === +id);

  if (!gamesId) {
    res.status(404).send("No games found with that id");
  } else {
    res.json(gamesId);
  }
});

// get all games from a name
app.get("/games/name/:name", (req, res) => {
  const { name } = req.params;

  const titleByName = games.filter(
    (game) => game.Name.toString().toLowerCase() === name.toLowerCase()
  );

  if (!titleByName.length) {
    res.status(404).json({
      response: "No games found with that name",
      success: false,
    });
  } else {
    res.status(200).json({
      response: titleByName,
      success: true,
    });
  }
});

// get all games from a platform
app.get("/games/platforms/:platform", (req, res) => {
  const { platform } = req.params;

  const platformByName = games.filter(
    (game) => game.Platform.toString().toLowerCase() === platform.toLowerCase()
  );

  if (!platformByName) {
    res.status(404).json({
      response: "No games found with that publisher, or try publishers",
      success: false,
    });
  } else {
    res.status(200).json({
      response: platformByName,
      success: true,
    });
  }
});

// get all games from a year
app.get("/games/year/:year", (req, res) => {
  const { year } = req.params;

  const years = games.filter((game) => game.Year === +year);

  if (!years) {
    res.status(404).json({
      response: "No games found in that year",
      success: false,
    });
  } else {
    res.status(200).json({
      response: years,
      success: true,
    });
  }
});

// get all games from a genre
app.get("/games/genres/:genre", (req, res) => {
  const { genre } = req.params;

  const genreByName = games
    .toString()
    .filter((game) => game.Genre.toLowerCase() === genre.toLowerCase());

  if (!genreByName) {
    res.status(404).json({
      response: "No games found with that genre, or try to write genres",
      success: false,
    });
  } else {
    res.status(200).json({
      response: genreByName,
      success: true,
    });
  }
});

// get all games from a publisher
app.get("/games/publishers/:publisher", (req, res) => {
  const { publisher } = req.params;

  const publisherByName = games
    .toString()
    .filter((game) => game.Publisher.toLowerCase() === publisher.toLowerCase());

  if (!publisherByName) {
    res.status(404).json({
      response:
        "No games found with that publisher, or try to write publishers",
      success: false,
    });
  } else {
    res.status(200).json({
      response: publisherByName,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
