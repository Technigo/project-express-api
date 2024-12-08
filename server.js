import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

// Path to your JSON dataset
const dataPath = path.resolve("./data/kpop-album-releases.json");

// Load the dataset
let data = [];
try {
  const rawData = fs.readFileSync(dataPath, "utf-8");
  data = JSON.parse(rawData);
  console.log("Dataset loaded successfully:", data.length, "records found.");
} catch (error) {
  console.error("Error loading dataset:", error.message);
}

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Endpoint: API Documentation
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the K-Pop Album Releases API",
    documentation: {
      endpoints: {
        "/": "API documentation",
        "/api/albums": "Get all albums",
        "/api/albums/:id": "Get a specific album by ID",
        "/api/albums/artist/:artist": "Get albums by a specific artist",
        "/api/albums/category/:category": "Get albums by category",
        "/api/albums/year/:year": "Get albums released in a specific year",
        "/api/albums/rating/:rating": "Get albums with a minimum rating",
      },
    },
  });
});

// Get all albums
app.get("/api/albums", (req, res) => {
  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(500).json({ error: "No albums found. Please check your dataset." });
  }
});

// Get a specific album by ID
app.get("/api/albums/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  console.log("Searching for album with ID:", id);
  console.log("Dataset size:", data.length);

  const album = data.find((album) => album.id === id);

  if (album) {
    console.log("Album found:", album);
    res.json(album);
  } else {
    console.log("Album not found for ID:", id);
    res.status(404).json({ error: "Album not found" });
  }
});

// Get albums by a specific artist
app.get("/api/albums/artist/:artist", (req, res) => {
  const artist = req.params.artist.toLowerCase();
  const albums = data.filter((album) =>
    album.artist.toLowerCase().includes(artist)
  );

  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({ error: "No albums found for the given artist" });
  }
});

// Get albums by category
app.get("/api/albums/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();
  const albums = data.filter(
    (album) => album.category.toLowerCase() === category
  );

  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({ error: "No albums found in the given category" });
  }
});

// Get albums released in a specific year
app.get("/api/albums/year/:year", (req, res) => {
  const year = parseInt(req.params.year);
  const albums = data.filter((album) => album.year === year);

  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({ error: "No albums found for the given year" });
  }
});

// Get albums with a minimum rating
app.get("/api/albums/rating/:rating", (req, res) => {
  const rating = parseFloat(req.params.rating);
  const albums = data.filter((album) => album.rating >= rating);

  if (albums.length > 0) {
    res.json(albums);
  } else {
    res.status(404).json({ error: "No albums found with the given rating" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
