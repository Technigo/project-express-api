import express from "express";
import cors from "cors";
import data from "./data/top-2000-spotify.json";

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
const listEndpoints = require('express-list-endpoints')

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
  // res.send(
  //   "Spotify playlist - Top 2000 songs",
  //   "Routes",
  //   "/tracks to Get all songs",
  //   "/artists/:artist to Get songs from a spesific artist",
  //   "/titles/:title to Get a song by its title",
  //   "/genres/:genre to Get songs by genre",
  //   );
});

app.get('/tracks', (req, res) => {
  res.json(data)
})

app.get('/artist/:artist', (req, res) => {
  const artist = req.params.artist
  let tracksOfArtist = data.filter((item) => item.artist === artist)
  res.json(tracksOfArtist)
})

app.get('/id/:id', (req, res) => {
  const id = req.params.id
  let trackById = data.find(item => item.id === +id)
  res.json(trackById)
})

app.get('/title/:title', (req, res) => {
  const title = req.params.title 
  let tracksWithTitle = data.filter((item) => item.title === title)
  res.json(tracksWithTitle)
})

app.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre
  let tracksWithGenre = data.filter((item) => item.genre === genre)
  res.json(tracksWithGenre)
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
