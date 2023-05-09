import express, { response } from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9090;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Middleware to handle 404 errors
const notFound = (req, res, next) => {
  res.status(404).send("Not found");
};

// Start defining your routes here

app.get("/topmusic", (req, res) => {
  res.json(topMusicData);
});

app.get("/", (req, res) => {
    res.json(listEndpoints(app));
  });            

//endpoint that returns all data from the topMusicData array
app.get("/topmusic/:artist", (req, res) => {
  const artist = req.params.artist;

//returns all data from the topMusic-route filtered by artist "http://localhost:9090/topmusic/EdSheeran"
  const filteredArtist = topMusicData.filter((song) => song.artistName === artist);
  res.json(filteredArtist);
});

//endpoint that returns all data from topMusic-route based on bpm of the song "http://localhost:9090/topmusic/bpm/100"
app.get("/topmusic/bpm/:bpm", (req, res) => {
  const bpm = +req.params.bpm;
  const bpmFilter = topMusicData.filter((song) => song.bpm >= bpm);
  res.json(bpmFilter);
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

// get songs by genre "http://localhost:9090/topmusic/genre/pop"
app.get("/topmusic/genre/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase(); // convert to lowercase
  const genreFilter = topMusicData.filter((song) => song.genre.toLowerCase() === genre); // ignore case-sensitivity
  res.json({ genreFilter });
});


// Use notFound middleware to handle any other routes that haven't matched yet
app.use(notFound);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
