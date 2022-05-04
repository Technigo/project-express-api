import express from "express";
import cors from "cors";
import songs from "./data/top-music.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import netflixData from "./data/netflix-titles.json";
//import goldenGlobesData from "./data/golden-globes.json";

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
  res.send("Hello world");
});

app.get("/songs", (req, res) => {
  res.status(200).json(songs)
})

app.get("/songs/id/:id", (req, res) => {
  const songById = songs.find(
    (song) => song.id == req.params.id
  );

  if (!songById) {
    res.status(400).json({
      data: "Not found",
      success: false,
    });
  } else {
    res.status(200).json({
      data: songById,
      sucess: true,
    });
  }
});

app.get("/songs/artist/:artistName", (req, res) => {
  const { artistName } = req.params
  
  const songsByArtist = songs.filter(
    (songs) => songs.artistName.toLowerCase() === artistName.toLowerCase()
  );
  
  res.status(200).json({
    data: songsByArtist,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
