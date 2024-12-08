"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _expressListEndpoints = _interopRequireDefault(require("express-list-endpoints"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Path to your JSON dataset
var dataPath = _path["default"].resolve("./data/kpop-album-releases.json");

// Load the dataset
var data = [];
try {
  var rawData = _fs["default"].readFileSync(dataPath, "utf-8");
  data = JSON.parse(rawData);
  console.log("Dataset loaded successfully:", data.length, "records found.");
} catch (error) {
  console.error("Error loading dataset:", error.message);
}
var port = process.env.PORT || 8080;
var app = (0, _express["default"])();

// Middleware
app.use((0, _cors["default"])());
app.use(_express["default"].json());

// Root Endpoint: API Documentation
app.get("/", function (req, res) {
  var endpoints = (0, _expressListEndpoints["default"])(app).map(function (endpoint) {
    return {
      path: endpoint.path,
      methods: endpoint.methods,
      middlewares: endpoint.middlewares.length ? endpoint.middlewares : ["anonymous"]
    };
  });
  res.json(endpoints);
});

// Get all albums
app.get("/api/albums", function (req, res) {
  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(500).json({
      error: "No albums found. Please check your dataset."
    });
  }
});

// Get a specific album by ID
app.get("/api/albums/:id", function (req, res) {
  var id = parseInt(req.params.id);
  console.log("Searching for album with ID:", id);
  console.log("Dataset size:", data.length);
  var album = data.find(function (album) {
    return album.id === id;
  });
  if (album) {
    console.log("Album found:", album);
    res.json(album);
  } else {
    console.log("Album not found for ID:", id);
    res.status(404).json({
      error: "Album not found"
    });
  }
});

// Get albums by a specific artist
app.get("/api/albums/artist/:artist", function (req, res) {
  var artist = req.params.artist.toLowerCase();
  var albums = data.filter(function (album) {
    return album.artist.toLowerCase().includes(artist);
  });
  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({
      error: "No albums found for the given artist"
    });
  }
});

// Get albums by category
app.get("/api/albums/category/:category", function (req, res) {
  var category = req.params.category.toLowerCase();
  var albums = data.filter(function (album) {
    return album.category.toLowerCase() === category;
  });
  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({
      error: "No albums found in the given category"
    });
  }
});

// Get albums released in a specific year
app.get("/api/albums/year/:year", function (req, res) {
  var year = parseInt(req.params.year);
  var albums = data.filter(function (album) {
    return album.year === year;
  });
  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({
      error: "No albums found for the given year"
    });
  }
});

// Get albums with a minimum rating
app.get("/api/albums/rating/:rating", function (req, res) {
  var rating = parseFloat(req.params.rating);
  var albums = data.filter(function (album) {
    return album.rating >= rating;
  });
  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({
      error: "No albums found with the given rating"
    });
  }
});

// Start the server
app.listen(port, function () {
  console.log("Server running on http://localhost:".concat(port));
});
