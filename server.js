import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import topMusic from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/music", (req, res) => {
  const { track_name } = req.query;
  if (track_name) {
    const filteredSongs = topMusic.filter(
      (song) => song.trackName === track_name
    );
    res.json(filteredSongs);
  } else {
    res.json(topMusic);
  }
});

app.get("/music/:id", (req, res) => {
  const { id } = req.params;
  const musics = topMusic.find((music) => music.id === +id);

  if (!musics) {
    res.status(404).send(`No song with id number ${id}`);
  }
  res.json(musics);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
