import express from "express";
import cors from "cors";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
//import goldenGlobesData from "./data/golden-globes.json";
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

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});
app.get("/songs", (req, res) => {
  res.status(200).json({
    data: topMusicData,
    success: true,
  });
});
app.get("/songs/trackName/:trackName", (req, res) => {
  const trackname = topMusicData.find(
    (data) =>
      data.trackName.toLocaleLowerCase() ===
      req.params.trackName.toLocaleLowerCase()
  );
  if (!trackname) {
    res.status(404).json({
      data: "not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: trackname,
      success: true,
    });
  }
});
app.get("/songs/artistName/:artistName", (req, res) => {
  const artistName = topMusicData.filter(
    (data) =>
      data.artistName.toLocaleLowerCase() ===
      req.params.artistName.toLocaleLowerCase()
  );

  res.status(200).json({
    data: artistName,
    success: true,
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
