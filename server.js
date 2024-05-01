import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";

import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const endpointDescr = [
  "Display API endpoints and instruction",
  "Display all songs with the ability to filter in query params based on genre and artist.",
  "Display a single song based on the id in param",
];
const port = process.env.PORT || 8080;
const app = express();

// Define a middleware to handle global error
const errorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 400;
  error.message =
    error.message ||
    "Your params or query params are not acceptable. Go to the homepage and check what params are acceptable.";
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    success: false,
  });
};

// Define a middleware to control the request method
const methodController = (req, res, next) => {
  if (req.method !== "GET") {
    const err = new Error(
      `${req.method} method is not implemented yet. Try GET method instead.`
    );
    err.statusCode = 501;
    throw err;
  }
  next();
};

// Define a middleware to refuse all the query params
const queryParamContoller = (req, res, next) => {
  const queryParams = req.query;
  if (Object.keys(queryParams).length > 0) throw new Error();
  next();
};

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
// Add middleware to enable fetching static files from public folder
app.use(express.static("public"));
// Add middleware to limit the request method to GET
app.use(methodController);

// Endpoints
// Homepage endpoint: display API endpoints & instruction
// middleware: if homepage gets any query params -> throw 400 error
app.get("/", queryParamContoller, (req, res) => {
  let endpoints = expressListEndpoints(app);
  endpoints.map(
    (endpoint, index) => (endpoint.description = endpointDescr[index])
  );
  res.render("index.ejs", { data: endpoints });
});

// songs endpoint: display all songs and filter songs based on genre and/or artist
app.get("/songs", (req, res, next) => {
  const queryParams = req.query;
  const { genre, artist } = queryParams;
  let songs = topMusicData;
  try {
    if (Object.keys(queryParams).length > 0) {
      if (genre && artist) {
        songs = topMusicData.filter(
          song =>
            song.genre === genre.toLowerCase() &&
            song.artistName.toLowerCase() === artist.toLowerCase()
        );
      } else if (genre) {
        songs = topMusicData.filter(song => song.genre === genre.toLowerCase());
      } else if (artist) {
        songs = topMusicData.filter(
          song => song.artistName.toLowerCase() === artist.toLowerCase()
        );
      } else {
        throw new Error();
      }
      if (songs.length === 0) {
        const err = new Error(
          `There are no songs matching the ${genre ? "genre:" + genre : ""}${
            genre && artist ? " and " : ""
          }${artist ? "artist:" + artist : ""}...`
        );
        err.statusCode = 404;
        throw err;
      }
    }
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

//song/id endpoint: display a single song
// middleware: if homepage gets any query params -> throw 400 error
app.get("/songs/:songId", queryParamContoller, (req, res, next) => {
  const songId = req.params.songId;
  const song = topMusicData.find(song => song.id === +songId);
  if (song) {
    res.json(song);
  } else {
    const err = new Error(
      `There are no songs matching the id:${songId}... Make sure you are inquering id from 1 - 50.`
    );
    err.statusCode = 404;
    next(err);
  }
});

//any other endpoints with GET method that are not acceptable -> 404 error
app.use((req, res, next) => {
  const err = new Error(`Cannot find endpoint: ${req.originalUrl}.`);
  err.statusCode = 404;
  next(err);
});
// Add middleware to handle the global error coming from any of the endpoints
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
