import express from "express";
import cors from "cors";
import path from "path";
import avocadoSalesData from "./data/avocado-sales.json";
import listEndpoints from "express-list-endpoints";

console.log(avocadoSalesData.length);

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Construct the absolute file path using the path module
const avocadoFilePath = path.join(__dirname, "data", "avocado-sales.json");


// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app));
  
});

app.get("/music", (req, res) => {
  res.json(topMusicData);
});

app.get("/music/artist", (req, res) => {
  const artistName = req.query.artist || "";
  let filteredMusic = topMusicData;

  if (artistName) {
    filteredMusic = filteredMusic.filter((item) =>
      item.artistName === artistName);
  }

  res.json(filteredMusic);
});

app.get("/music/:id", (req, res) => {
  const id = req.params.id;
  const popularity = req.query.popularity;
  let music = topMusicData.filter((item) => item.id === +id);
  

  if ( popularity > 76 ) {
    music = music.filter((item) => item.popularity > 76);
  }

  if (music.length === 0) {
    return res.status(404).json({ error: "Music not found" });
  }

  res.json(music);
 
});

// Dummy endpoint for future expansion (e.g., more complex operations)
app.get("/music/search", (req, res) => {
  res.json({ message: "This endpoint is reserved for future search functionality" });
});

app.post("/music", (req, res) => {
  res.status(501).json({ error: "Not Implemented", message: "This endpoint is reserved for future POST operations" });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
