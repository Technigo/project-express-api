import express from "express";
import cors from "cors";
import boardgames from "./data/boardgames.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// API Documentation
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Jonas boardgames API! Choose from the endpoints below:",
    endpoints: {
      "/boardgames": "Explore all boardgames",
      "/category?category=<category>": "Get all boardgames by category",
      "/maxPlayers?maxPlayers=<number>": "Get all boardgames by maximum number of players",
      "/boardgames/:id": "Get a single boardgames by ID"
    }
  });
});

// Return all boardgames
app.get("/boardgames", (req, res) => {
  res.json(boardgames);
});

// Return all boardgames within a specific category
app.get("/category", (req, res) => {
  const category = req.query.category;
  const filteredGames = boardgames.filter(game =>
    game.category.toLowerCase() === (category || "").toLowerCase()
  );
  res.json(filteredGames);
});

// Return all boardgames with a specific maximum number of players
app.get("/maxPlayers", (req, res) => {
  const maxPlayers = parseInt(req.query.maxPlayers, 10);

  if (isNaN(maxPlayers)) {
    return res.json([]);
  }

  const filteredMaxPlayers = boardgames.filter(game =>
    game.maxPlayers === maxPlayers
  );

  res.json(filteredMaxPlayers);
});

// Return a specific boardgame by ID
app.get("/boardgames/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const boardgame = boardgames.find(game => game.id === id);

  if (boardgame) {
    res.json(boardgame);
  } else {
    res.status(404).json({ error: "Boardgame not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
