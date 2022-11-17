import express from "express";
import cors from "cors";
import nesGames from "./data/NES-games.json";

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
  res.json({responseMessage: "Hello Technigo!"});
});

app.get("/games", (req, res) => {
  const { title, publisher } = req.query;
  let games = nesGames;

  if (publisher) {
    games = games.filter((singleGame) => { return singleGame.publisher.toLowerCase() === publisher.toLowerCase() });
  }
  if (title) {
    games = games.filter((singleGame) => { return singleGame.title.toLowerCase() === title.toLowerCase() });
  }

  res.status(200).json({
    success: true,
    message: "OK",
    response: {
      nesGames: games
    }
  });

});

app.get("/games/:id", (req, res) => {
  const singleGame = nesGames.find((game) => {
    return game.id === Number(req.params.id);
  });
  if (singleGame) {
    res.status(200).json({
      success: true,
      message: "OK",
      response: {
        nesGames: singleGame
      }
    }); 
  } else { 
    res.status(404).json({
      success: false,
      message: "Not Found",
      response: {}
    }); 
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
