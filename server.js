import express from "express";
import cors from "cors";

import players from "./data/football-players.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {

  const documentation = {
    "Welcome": "An API about Sweden's football team",
    "Routes": [
      {
        "/players": "List all players",
        "/players/goals/descending": "List players sorted by number of goals in descending order",
        "/players/games/descending": "List players sorted by number of games in descending order",
        "/players/position/:position": "List all players in the specified position",
        "/players/random-player": "Show info about a random player",
        "/players/name/:name": "Show info about a specific player",
      }
    ]
  }

  res.send(documentation);
});

// List all players
app.get('/players', (req, res) => {
  res.status(200).json({
    numberOfPlayers: players.length,
    players: players,
  });
})

app.get('/players/goals/descending', ( req, res ) => {

  players.sort((a, b) => b.goals - a.goals)

  res.status(200).json(players)

})

app.get('/players/games/descending', ( req, res ) => {

  players.sort((a, b) => b.games - a.games)

  res.status(200).json(players)

})

// List all players in a specific position
app.get('/players/position/:position', (req, res) => {

  const { position } = req.params

  const playersByPosition = players.filter(
    (player) => player.position === position
  )

  if (playersByPosition.length > 0) {
    res.status(200).json({
      data: playersByPosition,
      success: true,
    })
  } else {
    res.status(404).json({
      data: "Not found",
      success: true,
    })
  }
  
})


// Kanske göra om detta till en query i stället?
app.get('/players/random-player', (req, res) => {

  const randomPlayer = players[Math.floor(Math.random()*players.length)]

  res.status(200).json(randomPlayer)
})

// Get data about a specific player
app.get('/players/name/:name', ( req, res ) => {
  const { name } = req.params;

  const playerByName = players.find(
    (player) => player.name === name
  );

  if (playerByName) {
    res.status(200).json({
      data: playerByName,
      success: true,
    })
  } else {
    res.status(404).json({
      data: "Not found",
      success: false,
    })
  }

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
