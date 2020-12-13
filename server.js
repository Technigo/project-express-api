import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import spotifyData from "./data/spotify-releases.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// error message
const ERROR_RELEASES_NOT_FOUND = { error: "No release matched your request" };

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to the Spotify Releases API");
});

// This route will return a collection of releases. It can be filtered by type, artist and title.
app.get("/releases", (req, res) => {
  const { type, artist, title } = req.query;

  let filteredReleases = spotifyData;

  if (type) {
    filteredReleases = filteredReleases.filter(
      (item) => item.album_type === type
    );
  };
  if (artist) {
    filteredReleases = filteredReleases.filter(
      (item) => item.artists.map((artist) => artist.name).toString().includes(artist)
    );
  };
  if (title) {
    filteredReleases = filteredReleases.filter(
      (item) => item.name && item.name.toString().includes(title)
    );
  };
  if (filteredReleases.length === 0) {
    res.status(404).json(ERROR_RELEASES_NOT_FOUND);
  } else {
    res.json({
      total: filteredReleases.length,
      releases: filteredReleases
    });
  }
});

// This route will return a single release based on id
app.get("/releases/:id", (req, res) => {
  const { id } = req.params;
  const release = spotifyData.find(
    (item) => item.id === id
  );
  if (!release) {
    res.status(404).json(ERROR_RELEASES_NOT_FOUND);
  } else {
    res.json(release);
  }
});

// This route will return a collection of releases for the specified artist
app.get("/releases/artist/:artist", (req, res) => {
  const { artist } = req.params;
  const filteredReleases = spotifyData.filter(
    (item) => item.artists.map((artist) => artist.name).toString() === artist
  );
  if (filteredReleases.length === 0) {
    res.status(404).json(ERROR_RELEASES_NOT_FOUND);
  } else {
    res.json({
      total: filteredReleases.length,
      releases: filteredReleases
    });
  };
});

// This route will return a collection of releases in the specified market for the specified type
app.get("/releases/market/:market/type/:type", (req, res) => {
  const { market, type } = req.params;

  let filteredReleases = spotifyData;

  filteredReleases = filteredReleases.filter(
    (item) => item.available_markets.includes(market)
  );
  filteredReleases = filteredReleases.filter(
    (item) => item.album_type === type
  );
  if (filteredReleases.length === 0) {
    res.status(404).json(ERROR_RELEASES_NOT_FOUND);
  } else {
    res.json({
      total: filteredReleases.length,
      releases: filteredReleases
    });
  };
});

// This route will return a list of all available release types.
app.get("/types", (req, res) => {
  const allTypes = spotifyData.map((item) => item.album_type);
  const types = [...new Set(allTypes)].sort();
  res.json({
    total: types.length,
    types
  });
});

// This route will return a list of all available released titles.
app.get("/titles", (req, res) => {
  const titles = spotifyData.map((item) => item.name.toString())
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  res.json({
    total: titles.length,
    titles
  });
});

// This route will return a list of all artists with released titles.
app.get("/artists", (req, res) => {
  const allArtists = spotifyData.map((item) => item.artists.map((artist) => artist.name))
    .join()
    .split(",");
  const artists = allArtists.reduce(
    (unique, item) => unique.includes(item) ? unique : [...unique, item], []
  ).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  res.json({
    total: artists.length,
    artists
  });
});

// This route will return a list of all markets where titles are released.
app.get("/markets", (req, res) => {
  const allMarkets = spotifyData.map((item) => item.available_markets)
    .join()
    .split(",");
  const markets = allMarkets.filter((item, index) => allMarkets.indexOf(item) === index).sort();
  res.json({
    total: markets.length,
    markets
  });
});

//Dummy endpoints for red level
app.get("/releases/month/:month", (req, res) => {
  res.send("Dummy endpoint that will return a list of all releases during the specified month");
});

app.get("/releases/start/:start/stop/:stop", (req, res) => {
  res.send("Dummy endpoint that will return a list of all releases during the specified period");
});

app.get("/releases/theme/:theme", (req, res) => {
  res.send("Dummy endpoint that will return a list of all releases with the specified theme");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
