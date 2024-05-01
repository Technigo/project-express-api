import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";

import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Route to show documentation of the API
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Start defining your routes here

// Get all topMusicData
app.get("/tracks", (req, res) => {
  const { artist, genre, bpm, trackName, popularity, danceability } = req.query;
  let filteredTracks = [...topMusicData];

  if (artist) {
    const artistName = artist.toLowerCase();
    filteredTracks = filteredTracks.filter(
      (track) => track.artistName.toLowerCase() === artistName
    );
  }

  if (genre) {
    const genreName = genre.toLowerCase();
    filteredTracks = filteredTracks.filter(
      (track) => track.genre.toLowerCase() === genreName
    );
  }

  if (bpm) {
    const bpmValue = parseInt(bpm);
    filteredTracks = filteredTracks.filter((track) => track.bpm === bpmValue);
  }

  if (trackName) {
    const trackNameValue = trackName.toLowerCase();
    filteredTracks = filteredTracks.filter((track) =>
      track.trackName.toLowerCase().includes(trackNameValue)
    );
  }

  if (popularity) {
    const popularityValue = parseInt(popularity);
    filteredTracks = filteredTracks.filter(
      (track) => track.popularity === popularityValue
    );
  }

  if (danceability) {
    const danceabilityValue = parseInt(danceability);
    filteredTracks = filteredTracks.filter(
      (track) => track.danceability === danceabilityValue
    );
  }

  res.json(filteredTracks);
});

//Get one song based on id
app.get("/tracks/:trackId", (req, res) => {
  const { trackId } = req.params;

  const track = topMusicData.find((track) => +trackId === track.id);

  if (track) {
    res.json(track);
  } else {
    // If track not found, return 404 with a custom error message
    res.status(404).json({ error: "Track not found" });
  }
});

// Catch-all route handler for invalid URLs
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
