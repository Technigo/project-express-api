import express from "express";
import cors from "cors";

/* Data - json-file */
import musicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here

/* Sending full data set */
app.get("/", (req, res) => {
  if (!musicData) {
    /* 404 - No success to get data */
    res.status(404).json({
      response: "404 Not Found",
      success: false
    });
  } else {
    /* 200 - success to get the full dataset*/
    res.status(200).json({
      response: musicData,
      success: true
    });
  }
});

/* filter out tracks after genre */

app.get("/genre/:genre", (req, res) => {
  const { genre } = req.params;

  const genreTrack = musicData.filter((item) => item.genre === genre.toLowerCase());

  if (!genreTrack) {
    /* 404 - No success to get data */
    res.status(404).json({
      response: "404 Not Found",
      success: false
    });
  } else {
    /* 200 - success to get data, all tracks/other info from an genre*/
    res.status(200).json({
      response: genreTrack,
      success: true
    });
  }
});

/* Find a artist OR artist and track */

app.get("/artist/:artist", (req, res) => {
  const { artist } = req.params;
  const { track } = req.query;

  /* Filter artist */

  let nameArtist = musicData.filter(
    (item) => item.artistName.toLowerCase() === artist.toLowerCase()
  );

  /* Check if track is choosen */

  if (track) {
    let nameArtistTrack = nameArtist.find(
      (item) => item.trackName.toLowerCase() === track.toLowerCase()
    );

    if (!track) {
      res.status(404).json({
        /* 404 - No success to get data */
        response: "404 Not Found",
        success: false
      });
    } else {
      /* 200 - success to get data, gives back searched track(one object due to find filtration of nameArtist) from an artists tracklist*/
      res.status(200).json({
        response: nameArtistTrack,
        success: true
      });
    }

    /* If no track is search, only artist */
  } else {
    /* 404 - No success to get data */
    if (!artist) {
      res.status(404).json({
        response: "404 Not Found",
        success: false
      });
    } else {
      /* 200 - success to get data, all tracks/other info from an artist*/
      res.status(200).json({
        response: nameArtist,
        success: true
      });
    }
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
