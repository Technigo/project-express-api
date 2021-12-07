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
  res.json(musicData);
});

/* filter out tracks after genre */

app.get("/genre/:genre", (req, res) => {
  const { genre } = req.params;

  const genreTrack = musicData.filter((item) => item.genre === genre);

  if (!genreTrack) {
    res.status(404);
  } else {
    res.json(genreTrack);
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

    /* If track exist */

    if (nameArtistTrack) {
      res.json(nameArtistTrack);
    } /* and if not exists, the string from track is not match with some of the trackNames from the artist */ else if (
      !nameArtistTrack
    ) {
      res.json("Sorry that track doesn't exist");
    }

    /* If artist not exists. if array is empty */
  } else if (nameArtist.length === 0) {
    res.json("Sorry that artist doesn't exist");
  } /* if artist exist and no track is stated */ else {
    res.json(nameArtist);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
