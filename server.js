import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";
import topMusicData from "./data/top-music.json";

console.log(topMusicData);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 3000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

app.get("/top-music", (req, res) => {
  res.json(topMusicData);
});

app.get("/genres", (req, res) => {
  const genres = [...new Set(topMusicData.map((item) => item.genre))];
  res.json(genres);
});

app.get("/songs-by-genre/:genre", (req, res) => {
  const requestedGenre = req.params.genre;
  const songs = topMusicData.filter((item) => item.genre === requestedGenre);

  if (songs.length === 0) {
    res.status(404).json({ message: "Genre Not Found"});
  } else {
    res.json(songs);
  }
});

app.get("/number-one-song", (req, res) => {
  const numberOneSong = topMusicData.reduce((maxPopularitySong, currentSong) => {
    return currentSong.popularity > maxPopularitySong.popularity ? currentSong : maxPopularitySong;
  }, topMusicData[0]);

  if (!numberOneSong) {
    res.status(404).json({ message: "No Song Found" })
  } else {
    res.json(numberOneSong);
  }
});

app.get("/songs-over-150-bpm", (req, res) => {
  const songsOver150Bpm = topMusicData.filter((item) => item.bpm > 150);
  res.json(songsOver150Bpm);
});

app.get("/most-danceable-songs", (req, res) => {
  const sortedByDanceability = [...topMusicData].sort((a, b) => b.danceability - a.danceability);
  const top10DanceableSongs = sortedByDanceability.slice(0, 10);
  res.json(top10DanceableSongs);
});

app.get("/shortest-song", (req, res) => {
  const shortestSong = topMusicData.reduce((minLengthSong, currentSong) => {
    return currentSong.length < minLengthSong.length ? currentSong : minLengthSong;
  }, topMusicData[0]);

  res.json(shortestSong);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
