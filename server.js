import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndPoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.json(listEndPoints(app));
});

// get music and filter genre, using path and query
// returns a collection of results
app.get("/top-music", (request, response) => {
  const { genre } = request.query;
  let music = topMusicData;
  if (genre) {
    music = topMusicData.filter((musicGenre) => {
      return musicGenre.genre.toLowerCase() === genre.toLowerCase();
    })
  }

  if (music) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        topMusicData: music
      }
    })
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    })
  }
});

// get artist with path param
// returns a collection of results (if the artist has multiple songs ex. Ed Sheeran)
app.get("/top-music/:artist", (request, response) => {
  const theArtist = topMusicData.filter((artist) => {
    return artist.artistName.toString() === request.params.artist;
  });

  if (theArtist) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        artist: theArtist
      }
    })
  } else {
    response.status(404).json({
      success: false,
      message: "Artist not found",
      body: {}
    })
  }
});

// get id with path param
// returns a single result
app.get("/top-music/track/:id", (request, response) => {
  const { id } = request.params;
  const singleTrack = topMusicData.find((track) => {
    return track.id === Number(id);
  });

  if (singleTrack) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        track: singleTrack
      }
    })
  } else {
    response.status(404).json({
      success: false,
      message: "No result found",
      body: {}
    })
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
