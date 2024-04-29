import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";
import expressListEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Start defining your routes here
app
  .route("/")
  .all((req, res, next) => {
    console.log("Add authentication middleware");
    next();
  })
  .get((req, res) => {
    const endpoints = expressListEndpoints(app);
    res.render("index.ejs", { data: endpoints });
    // res.json(endpoints);
  })
  .post((req, res) => {
    res.send("Add a song");
  })
  .put((req, res) => {
    res.send("Update a song");
  })
  .delete((req, res) => {
    res.send("Delete a song");
  });
// app.get("/", (req, res) => {
//   const endpoints = expressListEndpoints(app);
//   res.json(endpoints);
// });

// display all songs
app.get("/songs", (req, res) => {
  const genre = req.query.genre;
  let songs = topMusicData;
  if (genre) {
    songs = topMusicData.filter(song => song.genre === genre);
  }
  // no songs matching with the genre
  if (songs.length === 0) {
    res.status(400).send(`There are no songs matching the ${genre} genre...`);
  }
  res.json(songs);
});

//display a single song
app.get("/songs/:songId", (req, res) => {
  const songId = req.params.songId;
  const song = topMusicData.find(song => song.id === +songId);
  if (song) {
    res.json(song);
  } else {
    res
      .status(400)
      .send(
        `There are no songs matching the id: ${songId}... Make sure you are inquering id from 1 - 50.`
      );
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
