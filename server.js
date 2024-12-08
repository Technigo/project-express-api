import express from "express";
import cors from "cors";
import fs from "fs";
import listEndpoints from "express-list-endpoints";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Named logging middleware to log every request
function logRequests(req, res, next) {
  const date = new Date();
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(`${formattedDate} - ${req.method} request to ${req.url}`);
  next();
}

app.use(logRequests);

// Load JSON data dynamically
function loadSongsData() {
  try {
    return JSON.parse(fs.readFileSync("./data/top-music.json", "utf8"));
  } catch (error) {
    console.error("Error loading the songs data:", error);
    throw error;
  }
}

// API documentation route
app.get("/", (req, res) => {
  res.json({
    Welcome: "Welcome to the Music API",
    Endpoints: listEndpoints(app).map((endpoint) => {
      return {
        path: endpoint.path,
        methods: endpoint.methods,
        middlewares: ["logRequests"], 
      };
    }),
  });
});

// Routes
app.get("/songs", (req, res) => {
  try {
    const songs = loadSongsData();
    const { genre } = req.query;
    const filteredSongs = genre
      ? songs.filter((song) => song.genre.toLowerCase() === genre.toLowerCase())
      : songs;
    res.json(filteredSongs);
  } catch (error) {
    res.status(500).send("Failed to load songs data.");
  }
});

app.get("/songs/:id", (req, res) => {
  try {
    const songs = loadSongsData();
    const song = songs.find((song) => song.id === parseInt(req.params.id));
    if (song) {
      res.json(song);
    } else {
      res.status(404).send("Song not found");
    }
  } catch (error) {
    res.status(500).send("Failed to load songs data.");
  }
});

// Catch non-existent routes
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Something went seriously wrong!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
