import express, { response } from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Middleware to handle 404 errors
const notFound = (req, res, next) => {
  res.status(404).send("Not found");
};

// Start defining your routes here
app.get("/netflix", (req, res) => {
  res.json(netflixData);
});
app.get("/topmusic", (req, res) => {
  res.json(topMusicData);
});

app.get("/", (req, res) => {
  res.send("Find your groove!");
});             

//endpoint that returns all data from the topMusicData array
app.get("/topmusic/:artist", (req, res) => {
  const artist = req.params.artist;

//returns all data from the topMusic-route filtered by artist "http://localhost:9090/topmusic/Ed Sheeran"
  const filteredArtist = topMusicData.filter((song) => song.artistName === artist);
  res.json(filteredArtist);
});

//endpoint that returns all data from topMusic-route that has a bmp over 100 "http://localhost:9090/topmusic/bpm/100"
app.get("/topmusic/bpm/:bpm", (req, res) => {
  const bpm = +req.params.bpm;
  filteredBpm = topMusicData.filter((song) => song.bpm > bpm);
  console.log(filteredBpm);
  res.json(filteredBpm);
});

//endpoint to get single song by id "http://localhost:9090/topmusic/id/1"
app.get("/topmusic/id/:id", (req, res) => {
  const id = +req.params.id;
  const songId = topMusicData.find((song) => song.id === id);

  if (songId) {
    res.json(songId);
  } else {
    // If songId is undefined (i.e. there's no match), call the notFound middleware
    notFound(req, res, next);
  }
});

// endpoint go select songs by genre using query parameters "http://localhost:9090/topmusic/genre?genre=pop"
app.get("/topmusic/genre", (req, res) => {
  const genre = req.query.genre;
  const genreFilter = topMusicData.filter((song) => song.genre === genre);
  res.json(genreFilter);
});

// Use notFound middleware to handle any other routes that haven't matched yet
app.use(notFound);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
