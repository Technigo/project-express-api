import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";

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

// get music and filter genre
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
