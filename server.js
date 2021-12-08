import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";

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

// Middlewears
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello from the backend (:(:");
});

app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app));
});

app.get("/topMusic", (req, res) => {
  const { artist, track } = req.query;
  let musicDataToSend = topMusicData;

  if (artist) {
    musicDataToSend = musicDataToSend.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1
    );
  }

  if (track) {
    musicDataToSend = musicDataToSend.filter(
      (item) => item.trackName.toLowerCase().indexOf(track.toLowerCase()) !== -1
    );
  }

  res.json({
    response: musicDataToSend,
    success: true,
  });
});

app.get("/topMusic/id/:id", (req, res) => {
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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port} YAY YAY`);
});
