import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import songs from "./data/top-music.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
