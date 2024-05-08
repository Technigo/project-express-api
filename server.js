import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";
import expressListEndpoints from "express-list-endpoints"


// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
// http://localhost:8080
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
});
// Get all top music songs
// http://localhost:8080/top-music
app.get("/top-music", (req, res) => {
  let filterSongs = [...topMusicData];

  //query for a song genre
  const genreSearch = req.query.genre;

  if (genreSearch) {
    filterSongs = filterSongs.filter((song) =>
      song.genre.toLowerCase().includes(genreSearch.toLowerCase())
    );
  }
  if (filterSongs.length > 0) {
    res.json(filterSongs);
  } else {
    res.status(404).send("No song was found based on typed genre");
  }
});
// Get one song based on id
//http://localhost:8080/top-music/9 <for e
app.get("/top-music/:songID", (req, res) => {
  const { songID } = req.params;

  const song = topMusicData.find(song => +songID === song.id);

  if (song) {
    res.json(song);
  } else {
    res.status(404).send("No song with that ID was found :(");
  }
});
//Filter songs by
// app.get("/top-songs/", (req, res) => {
//   const MusicInStock = topMusicData.filter((song) => song.inStock);

//   if (MusicInStock.length > 0) {
//     res.json(MusicInStock);
//   } else {
//     res.status(404).send("No music");
//   }
// });
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
