import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

// Dataset from Technigo
import topMusicData from "./data/top-music.json";

const port = process.env.PORT || 8080;
const app = express();

// Middleware which enables cprs and json body parsing
app.use(cors());
app.use(express.json());

// This shows up to tell you which endpoints we have
app.get("/", (req, res) => {
  res.send("Add /endpoints to see all endpoints");
});

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

// First endpoint for all tracks
app.get("/tracks", (req, res) => {
  res.json(topMusicData);
});

// second endpoint for id
app.get("/tracks/:id", (req, res) => {
  const { id } = req.params;

  const trackId = topMusicData.find((tracks) => tracks.id === +id);

  if (!trackId) {
    res.status(404).send("No track found with that id");
  } else {
    res.json(trackId);
  }
});

// Third endpoint for name of artist
app.get("/tracks/artist/:artist", (req, res) => {
  const { artistName } = req.params;

  const artistByName = topMusicData.find(
    (item) => item.artistName === artistName
  );

  if (!artistByName) {
    res.status(404).json({
      response: "No artist found with that name",
      success: false,
    });
  } else {
    res.status(200).json({
      response: artistByName,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
