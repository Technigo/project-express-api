import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import swiftData from "./data/swift.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Startingpoint
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// List of all the songs
app.get("/songs", (req, res) => {
  res.json(swiftData);
});

// specific song based on index
app.get("/songs/index/:index", (req, res) => {
  const { index } = req.params;
  const songIndex = swiftData.find((song) => song.index === +index);
  if (!songIndex) {
    res.status(404).send("No song found by that number, try again");
  } else {
    res.json(songIndex);
  }
});

// find a song by title
app.get("/songs/title/:title", (req, res) => {
  const { title } = req.params;
  const songName = swiftData.find(
    (song) => song.name.toLowerCase() === title.toLowerCase()
  );
  if (!songName) {
    res.status(404).send("No song found by that name, try again");
  } else {
    res.json(songName);
  }
});

// filter songs from a specific album
app.get("/songs/album", (req, res) => {
  const { album } = req.query;
  let filteredAlbums = swiftData;

  if (album) {
    filteredAlbums = filteredAlbums.filter(
      (item) => item.album.toLowerCase().indexOf(album.toLowerCase()) !== -1
    );
    res.json(filteredAlbums);
  } else {
    res.status(404).send("No album found, try again");
  }
});

// filter songs from a specific year
app.get("/songs/year", (req, res) => {
  const { year } = req.query;
  let songsPerYear = swiftData;

  if (!year) {
    res.status(404).send("No album found that year, try again");
  } else {
    songsPerYear = songsPerYear.filter(
      (item) => item.release_date.slice(0, 4) === year.slice(0, 4)
    );
    res.json(songsPerYear);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
