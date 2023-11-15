import express from "express";
import cors from "cors";

import boardGameData from "./data/boardGameData.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable Cross-Origin Resource Sharing (CORS) 
// and parse incoming JSON requests.
app.use(cors());
app.use(express.json());

// Define a route for the root path ('/') to display a welcome message.
app.get("/", (req, res) => {
  res.send("Welcome to the Top 100 Board Games API!");
});

// Define a route to get all board games.
app.get("/games", (req, res) => {


    const { year, gametype, sortBy, name, page = 1, pageSize = 10, category } = req.query;
  // Filter by year:
// /games?year=2017, for example.

  if (year) {
    const filteredGamesYear = boardGameData.filter((game) => game.Year === +year);

    res.json(filteredGamesYear);
  }

  // Filter by type of game:
  // /games?gametype=strategy 

  if (gametype) {
    const filteredGamesType = boardGameData.filter((game) => game.Type.toLowerCase() === gametype.toLowerCase());

    res.json(filteredGamesType);
  }

  // Sort by rating:
    // /games?sortBy=rating, for example.

  if (sortBy === "rating") {

    // The result is a new array ('sortedGames') with games sorted by descending rating.
    const sortedGames = boardGameData.sort((a, b) => b.Rating - a.Rating);

    res.json(sortedGames);
  }


  // Search by name:
     // /games?name=Gloomhaven

  if (name) {

    const matchingGames = boardGameData.filter((game) =>
      game.Name.toLowerCase().includes(name.toLowerCase())
    );

    return res.json(matchingGames);
  }


  // Implement pagination:
/*
  Examples: 
    /games?page=1&pageSize=all
    /games?page=1 (defaults to pageSize = 10, the first 10 games)
    /games (also defaults to pageSize = 10, the first 10 games)
    /games?page=2&pageSize=5 get the second page with 5 games per page.
  */
  const isAllGamesRequested = pageSize === "all" || pageSize > boardGameData.length;

  const start = (page - 1) * pageSize;
 
  const end = isAllGamesRequested ? boardGameData.length : start + parseInt(pageSize);

  const paginatedGames = boardGameData.slice(start, end);

  res.json(paginatedGames);


});

// Define a route to get a specific board game based on its rank.
app.get("/games/:rank", (req, res) => {

  const gameRank = parseInt(req.params.rank);

  const game = boardGameData.find((item) => item.Rank === gameRank);

  // If the game is not found, respond with a 404 error.
  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  // Respond with the JSON data of the specific board game.
  res.json(game);
});

// Start the server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
