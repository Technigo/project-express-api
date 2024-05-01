import express from "express";
import cors from "cors";
import expressListEndpoints from "express-list-endpoints";
import topMusicData from "./data/top-music.json";


const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  const info = endpoints.map((endpoint) => ({
    path: endpoint.path,
    methods: endpoint.methods.join(", "),
    description: endpoint.descriptor,
  }));
  res.json(info);
});


//Songs
app.get("/songs", (req, res) => {
  res.json(topMusicData);
})

app.get("/songs/:id", (req, res) => {
 const id = req.params.id
 const songID = topMusicData.filter((song) => song.id === +id)
 if (songID.length !== 0) {
    res.json(songID)
  } else {
    res.status(404).send("No such ID was found");
  };
})


// Genres
app.get("/genres", (req, res) => {
  const songGenres = topMusicData.sort((a, b) => (a.genre > b.genre ? 1 : -1)).map(song => song.genre.charAt(0).toUpperCase() + song.genre.slice(1))
  const uniqueGenres = [...new Set(songGenres)]
  res.json(uniqueGenres);
})

app.get("/genres/:genre", (req, res) => {
  const genre = req.params.genre
  const songGenre = topMusicData.filter(song => song.genre.replaceAll(" ", "") === genre)
  if (songGenre.length !== 0) {
    res.json(songGenre);
  } else {
    res.status(404).send("No such genre was found");
  }
})


// Artists
app.get("/artists", (req, res) => {
  const artistNames = topMusicData.sort((a, b) => (a.artistName > b.artistName ? 1 : -1)).map(song => song.artistName);
  const uniqueArtists = [...new Set(artistNames)]
  res.json(uniqueArtists);
})

app.get("/songs/artists/:artistName", (req, res) => {
  const artistName = req.params.artistName
  const nameOfArtist = topMusicData.filter(song => song.artistName.replaceAll(" ", "").toLowerCase() === artistName)
  if (nameOfArtist) {
    res.json(nameOfArtist.length !== 0);
  } else {
    res.status(404).send("No such artist was found");
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
