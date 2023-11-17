import express from "express";
import cors from "cors";

import boardGameData from "./data/boardGameData.json";

const port = process.env.PORT || 8080;

const listEndpoints = require("express-list-endpoints")
const app = require('express')();

// Add middlewares to enable Cross-Origin Resource Sharing (CORS) 
// and parse incoming JSON requests.
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
     // If the query parameter 'showEndpoints' is true, display the API documentation.
    // Otherwise, provide a welcome message.
    // http://localhost:8080/?showEndpoints=true
    if (req.query.showEndpoints === "true") {
        res.json(listEndpoints(app));
    } else {
        res.send("Welcome to the Top 100 Board Games API!");
    }
});


// Define a route to get all board games.
app.get("/games", (req, res) => {
     // Retrieve a list of board games based on specified filters and pagination.
    // Supports filtering by year, game type, sorting by rating, searching by name, and pagination.

    const { year, gametype, sortBy, name, page = 1, pageSize = 20 } = req.query;

    // Create a copy of the original boardGameData for each request.
    // Using the spread operator (...) ensures that modifications made during one user's request don't affect the original data or other users' views.
    let filteredGames = [...boardGameData];


    // Filter by year:
    // /games?year=2017, for example.
    if (year) {
        filteredGames = filteredGames.filter((game) => game.Year === +year);
    }

    // Filter by type of game:
    // /games?gametype=strategy 
    if (gametype) {
        filteredGames = filteredGames.filter((game) => game.Type.toLowerCase() === gametype.toLowerCase());
    }

    // Sort by rating:
    // /games?sortBy=rating, for example.
    if (sortBy === "rating") {
        filteredGames.sort((a, b) => b.Rating - a.Rating);
    }

    // Search by name:
    // /games?name=Gloomhaven
    // /games?name=GlooM
    // /games?name=haVen
    if (name) {
        filteredGames = filteredGames.filter((game) => game.Name.toLowerCase().includes(name.toLowerCase()));
    }

    // Implement pagination:
    /*
      Examples: 
        /games?page=1&pageSize=all
        /games?page=1 (defaults to pageSize = 10, the first 10 games)
        /games (also defaults to pageSize = 10, the first 10 games)
        /games?page=2&pageSize=5 get the second page with 5 games per page.
      */
    const isAllGamesRequested = pageSize === "all" || pageSize > filteredGames.length;
    const start = (page - 1) * pageSize;
    const end = isAllGamesRequested ? filteredGames.length : start + parseInt(pageSize);
    const paginatedGames = filteredGames.slice(start, end);

    // Check if there are no matching games
    if (paginatedGames.length === 0) {
        return res.status(404).json({ error: "No matching games found" });
    }
    
    res.json(paginatedGames);

    // Test URL: http://localhost:8080/games?page=1&pageSize=all&name=pand&sortBy=rating
    // Response: all pandemic games sorted by rating
});

// Define a route to get a specific board game based on its rank.
app.get("/games/:rank", (req, res) => {

     // Retrieve a specific board game based on its rank.
    const gameRank = parseInt(req.params.rank);

    const game = boardGameData.find((game) => game.Rank === gameRank);

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
