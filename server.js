import express from "express";
import expressListEndpoints from "express-list-endpoints";
import cors from "cors";
import gratefulDeadData from "./data/grateful-dead.json";

// Defines the port the app will run on.
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

//Get all albums
app.get("/albums", (req, res) => {
  let filteredAlbums = [...gratefulDeadData];

  //query for an album title or search for a letter/word included in an album title
  const albumSearch = req.query.title;
  if (albumSearch) {
    filteredAlbums = filteredAlbums.filter((item) =>
      item.title.toLowerCase().includes(albumSearch.toLowerCase())
    );
  }
  if (filteredAlbums.length > 0) {
    res.json(filteredAlbums);
  } else {
    res.status(404).send("No album titles found.");
  }
});

// Get one album based on id
app.get("/albums/:albumId", (req, res) => {
  const { albumId } = req.params;

  const album = gratefulDeadData.find((item) => +albumId === item.id);

  if (album) {
    res.json(album);
  } else {
    res
      .status(404)
      .send(
        "Sorry, no album found. They did indeed release a lot of records, so please try again"
      );
  }
});

//Get albums filtered by year
app.get("/album/:albumRelease", (req, res) => {
  const albumRelease = req.params.albumRelease;
  const showYear = req.query.year;

  let albumYear = gratefulDeadData.filter(
    (item) => item.year === +albumRelease
  );

  if (showYear) {
    albumYear = albumYear.filter((item) => item.yearOfRelease);
  }
  res.json(albumYear);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
