import express from "express";
import cors from "cors";
import data from "./data/million-songs.json";


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(data);
});

app.get('/songs', (req, res) => {
  res.json(data)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  let musicFromYear = data.filter((item) => item.year === +year)

  res.json(musicFromYear)
})
app.get('/tags/:tag', (req, res) => {
  const tag = req.params.tag
  const musicTags = data.filter((item) => item.tags === tag)

  res.json(musicTags)
})

app.get('/artist/:artist', (req, res) => {
  const artist = req.params.artist
  const singleArtist = data.filter((item) => item.artist === artist)

  res.json(singleArtist)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
