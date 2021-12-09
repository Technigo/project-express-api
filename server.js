import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

import topMusicData from "./data/top-music.json";

//This is where the port that the app will run on is defined.
const port = process.env.PORT || 8080;
const app = express();

// Middlewears
app.use(cors());
app.use(express.json());

// The different routes
app.get("/", (req, res) => {
  res.send("Hello from the backend (:(:");
});

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// Query params
app.get("/topMusic", (req, res) => {
  const { artist, track } = req.query;
  let musicDataToSend = topMusicData;

  if (artist) {
    musicDataToSend = musicDataToSend.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1
    );
  }

  if (track) {
    musicDataToSend = musicDataToSend.filter(
      (item) => item.trackName.toLowerCase().indexOf(track.toLowerCase()) !== -1
    );
  }

  res.json({
    response: musicDataToSend,
    success: true,
  });
});

// Path params
app.get("/topMusic/id/:id", (req, res) => {
  const { id } = req.params;
  const topMusicId = topMusicData.find((music) => music.id === +id);

  if (!topMusicId) {
    res
      .status(404)
      .send("Sorry there was no music found with that matching id :( :(");
  } else {
    res.json(topMusicId);
  }
});

// This function starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} YAY YAY`);
});
