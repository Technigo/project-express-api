import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import songs from "./data/top-music.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send(listEndpoints(songs));
});

app.get("/songs", (req, res) => {
  const { artist_name } = req.query;
  if (artist_name) {
    const filteredSongs = songs.filter((song) => {
      return (
        song.artistName.toLowerCase().indexOf(artist_name.toLowerCase()) !== -1
      );
    });
    res.json(filteredSongs);
  } else {
    res.json(songs);
  }
});

app.get("/songs/:id", (req, res) => {
  const { id } = req.params;
  const chosenSong = songs.find((song) => song.id === +id);

  if (!chosenSong) {
    res.status(404).send(`No song with id number ${id}`);
  }
  res.json(chosenSong);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
