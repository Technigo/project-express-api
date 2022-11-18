import cors from "cors";
import express from "express";
import topMusic from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, 
// but can be overridden when starting the server. 
// Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.status(200).send("Hello World!");
});

app.get('/songs/:id', (req, res) => {
  const id = req.params.id;
  let songById = topMusic.find(song => song.id === +id);
  res.status(200).json({
    response: songById,
    success: true
   });
});

app.get('/songs/', (req, res) => {
  const { bpm, genre } = req.query;
  let songs = topMusic;

  if (genre) {
    songs = songs.filter(song => song.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  if (bpm) {
    songs = songs.filter(song => song.bpm === +bpm);
  }

  res.status(200).json({
    response: songs,
    success: true
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
