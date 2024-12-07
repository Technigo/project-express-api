import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
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
// app.get("/", (req, res) => {
//   res.send("Hello Technigo!");
// });

// Route to return entire song array
app.get("/songs", (req, res) => {
  res.json(topMusicData);
});

// Route for single song info by ID
app.get("/songs/:id", (req, res) => {
  const songId = Number(req.params.id);
  const song = topMusicData.find((song) => song.id === songId);

  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: "Song not found" });
  }
});

// Route for songs by artist
app.get("/songs/artist/:artistName", (req, res) => {
  const artistName = req.params.artistName.toLowerCase();
  const songsByArtist = topMusicData.filter(
    (song) => song.artistName.toLowerCase() === artistName
  );

  if (songsByArtist.length > 0) {
    res.json(songsByArtist);
  } else {
    res.status(404).json({ error: "No songs found for this artist" });
  }
});

// Route for songs by genre
app.get("/songs/genre/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase();
  const songsByGenre = topMusicData.filter(
    (song) => song.genre.toLowerCase() === genre
  );

  if (songsByGenre.length > 0) {
    res.json(songsByGenre);
  } else {
    res.status(404).json({ error: "No songs found in this genre" });
  }
});

// Documentation route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    documentation: expressListEndpoints(app),
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
