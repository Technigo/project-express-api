import express from "express";
import cors from "cors";
import data from "./data/top-2000-spotify.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// This enables to get a list of all routes, here used in main page
const listEndpoints = require('express-list-endpoints')

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
});

//Get all tracks
app.get('/tracks', (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      data
    }
  });
})

//Get tracks by artist
app.get('/artist/:artist', (req, res) => {
  const artist = req.params.artist
  const tracksOfArtist = data.filter((item) => item.artist === artist)

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      data: tracksOfArtist
    }
  });
})

//Get track by ID, error message if not found
app.get('/id/:id', (req, res) => {
  const id = req.params.id
  const trackById = data.find(item => item.id === +id)
  if(trackById) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        item: trackById
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
})

//Get track by title
app.get('/title/:title', (req, res) => {
  const title = req.params.title 
  const tracksWithTitle = data.filter((item) => item.title === title)

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      data: tracksWithTitle
    }
  });
})

//Get track by title
app.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre
  const tracksWithGenre = data.filter((item) => item.genre === genre)

  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      data: tracksWithGenre
    }
  });
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
