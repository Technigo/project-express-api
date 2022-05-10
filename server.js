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
    "About": "This is an open API about the Sweden women's national football team",
    "Routes": [
      {
        "/players": "Get all players",
        "/players/goals/descending": "Get all players sorted by number of goals in descending order",
        "/players/games/descending": "Get all players sorted by number of games in descending order",
        "/players/position/${position}": "Get all players in a specific position (goalkeeper, defender, midfielder or forward)",
        "/players/random": "Get random player",
        "/players/name/${name}": "Get a specific player by name",
      }
    ]
  }

  res.send(documentation);
});

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
      success: false,
    })
  }
  
})



app.get('/players/random', (req, res) => {

  const randomPlayer = players[Math.floor(Math.random()*players.length)]

  res.status(200).json(randomPlayer)
})

app.get('/players/name/:name', ( req, res ) => {
  const { name } = req.params;

  const playerByName = players.find(
    (player) => player.name.toLowerCase() === name.toLowerCase()
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
