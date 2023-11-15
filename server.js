import express from "express";
import cors from "cors";

// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";
 import boardGameData from "./data/boardGameData.json";

/* 
This part of the code is setting up a variable port that will be used to specify the port on which the server will listen. It uses the process.env.PORT environment variable, which is a way to allow configuration from the outside. If process.env.PORT is not defined (i.e., it's falsy, which includes being undefined), it defaults to using port 8080.

If I want to run the server on a different port, I can override the value by setting the PORT environment variable when starting the server like this:
PORT=9000 npm start
*/

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable Cross-Origin Resource Sharing (CORS) 
// and parse incoming JSON requests.
app.use(cors());
app.use(express.json());

// Define a route for the root path ('/') to display a welcome message.
/* This route is handling HTTP GET requests to the root path ('/'). When a user accesses the main URL of your application (e.g., http://localhost:8080/), this route will respond with the message "Welcome to the Board Games API!". */
app.get("/", (req, res) => {
  res.send("Welcome to the Board Games API!");
});

// Define a route to get all board games.
app.get("/games", (req, res) => {
  // Respond with the JSON data containing information about all board games.
  res.json(boardGameData);
});

// Define a route to get a specific board game based on its rank.
app.get("/games/:rank", (req, res) => {
  // Extract the game rank from the URL parameter.
  const gameRank = parseInt(req.params.rank);
  
  // Find the board game in the data with the matching rank.
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
