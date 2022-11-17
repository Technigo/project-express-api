import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import data from "./data/books.json";
// import data from "./data/golden-globes.json";
// import data from "./data/netflix-titles.json";
// import data from "./data/top-music.json";
import data from "./data/top-2000-spotify.json";

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
  res.send(
    "Hello music!"
    // Routes
    //   /tracks":"Get all songs",
    //   /artists/:artist":"Get songs from a spesific artist",
    //   /titles/:title":"Get a song by its title",
    //   /genres/:genre":"Get songs by genre",

    // "Queries"
    //   /tracks?highbpm":"Get tracks with -80 bpm",
    //   /tracks?mediumbpm":"Get tracks with 80-120 bpm",
    //   /tracks?lowbpm":"Get tracks with 120+ bpm",
    );
});

app.get('/tracks', (req, res) => {
  const highBpm = req.query.highBpm
  const mediumBpm = req.query.mediumBpm
  const lowBpm = req.query.lowBpm
  // const { lowBpm, mediumBpm, highBpm } = req.query
  let filteredTracks = data

  if (lowBpm) {filteredTracks = filteredTracks.filter((item) => item.bpm < 80)}
   
  if (mediumBpm) {filteredTracks = filteredTracks.filter((item) => item.bpm > 91 && item.bpm < 119)}

  if (highBpm) {filteredTracks = filteredTracks.filter((item) => item.bpm > 120)} 

  res.json(filteredTracks)
})

app.get('/artist/:artist', (req, res) => {
  const artist = req.params.artist
  console.log({ artist })
  // const showWon = req.query.won 
  let tracksOfArtist = data.filter((item) => item.artist === artist)

  // if (showWon) { nominationsFromYear = nominationsFromYear.filter((item) => item.win) }

  res.json(tracksOfArtist)
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
