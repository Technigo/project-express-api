import express from "express";
import cors from "cors";

import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// http://localhost:8080/
app.get("/", (req, res) => {
  res.send("Top 50 popular songs on spotify");
});

// Get all songs
// http://localhost:8080/songs
app.get("/songs", (req, res) => {
  res.json(topMusicData);
});

// Get one song based on id
// http://localhost:8080/songs/2
app.get("/songs/:songId", (req, res) => {
  const { songId } = req.params;

  const song = topMusicData.find((song) => +songId === song.id);

  if (song) {
    res.json(song);
  } else {
    res.send("No song was found");
  }
});

// Get artist of a specifik song
// http://localhost:8080/songs/2/artist
app.get("/songs/:songId/artist", (req, res) => {
  const { songId } = req.params;

  const song = topMusicData.find((song) => +songId === song.id);

  if (song) {
    res.json({ artistName: song.artistName });
  } else {
    res.send("No song was found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
