import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Importing data from JSON file
import songs from "./data/top-music.json";

// Define API documentation route
app.get("/", (req, res) => {
  res.json({
    endpoints: [
      {
        method: "GET",
        path: "/songs",
        description: "Returns an array of all songs",
      },
      {
        method: "GET",
        path: "/songs/:id",
        description: "Returns a single song by ID",
      },
      {
        method: "GET",
        path: "/songs",
        query: "?genre=pop",
        description: "Filters songs by genre",
      },
    ],
  });
});

// Route to return all songs with optional filtering
app.get("/songs", (req, res) => {
  const { genre } = req.query;
  const filteredSongs = genre
    ? songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase())
    : songs;
  res.json(filteredSongs);
});

// Route to return a single song by ID
app.get("/songs/:id", (req, res) => {
  const song = songs.find(song => song.id === parseInt(req.params.id));
  if (song) {
    res.json(song);
  } else {
    res.status(404).send("Song not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
