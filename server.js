import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());
//app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello from the backend (:(:");
});

app.get("/topMusic", (req, res) => {
  res.json(topMusicData);
});

app.get("/topMusic/:id", (req, res) => {
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

//app.get("/topMusic/:genre", (req, res) => {
// const genre = reg.params.genre;
//   //console.log({ trackName });
// const showTrackName = req.query.trackName;
//   console.log(showTrackName);
//});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port} YAY YAY`);
});
