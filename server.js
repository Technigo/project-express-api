import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";
import expressListEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// handle not implemented error for requests other than GET
const handle501Error = action => {
  const jsonMsg = {
    success: false,
    code: 501,
    message: "Not Implemented",
    body: {
      error: `${action}ing a song is not implemented yet. Try GET method instead.`,
    },
  };
  return jsonMsg;
};

// handle bad requet error for incorrect params
const handle400Error = () => {
  const jsonMsg = {
    success: false,
    code: 400,
    message: "Bad Request",
    body: {
      error:
        "Your params or query params are not acceptable. Go to the homepage and check what params are acceptable.",
    },
  };
  return jsonMsg;
};

// handle not found error when no matching items for the given params
const handle404Error = errorMsg => {
  const jsonMsg = {
    success: false,
    code: 404,
    message: "Not Found",
    body: {
      error: errorMsg,
    },
  };
  return jsonMsg;
};

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Define routes
// Homepage route
app
  .route("/")
  .all((req, res, next) => {
    if (req.method !== "GET") {
      res.status(501).json(handle501Error(req.method));
    }
    next();
  })
  .get((req, res) => {
    const endpoints = expressListEndpoints(app);
    res.render("index.ejs", { data: endpoints });
  });

// display all songs
app
  .route("/songs")
  .all((req, res, next) => {
    if (req.method !== "GET") {
      res.status(501).json(handle501Error(req.method));
    }
    next();
  })
  .get((req, res) => {
    const genre = req.query.genre;
    if (!genre) {
      return res.status(501).json(handle400Error());
    }
    let songs = topMusicData;
    if (genre) {
      songs = topMusicData.filter(song => song.genre === genre);
    }
    // no songs matching with the genre
    if (songs.length === 0) {
      res
        .status(400)
        .send(
          handle404Error(`There are no songs matching the ${genre} genre...`)
        );
    } else {
      res.json(songs);
    }
  });

//display a single song
app
  .route("/songs/:songId")
  .all((req, res, next) => {
    if (req.method !== "GET") {
      res.status(501).json(handle501Error(req.method));
    }
    next();
  })
  .get((req, res) => {
    const songId = req.params.songId;
    if (!+songId || +songId % 1 !== 0) {
      return res.status(400).json(handle400Error());
    }
    const song = topMusicData.find(song => song.id === +songId);
    if (song) {
      res.json(song);
    } else {
      res
        .status(400)
        .send(
          handle404Error(
            `There are no songs matching the id: ${songId}... Make sure you are inquering id from 1 - 50.`
          )
        );
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
