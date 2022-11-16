import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.json("this is top music on spötify");
});

app.get("/songs", (request, response) => {
  response.status(200).json({topMusicData: topMusicData});
});

app.get("/songs/:id", (request, response) => {
  const singleSong = topMusicData.find((song) => {
    return song.id === Number(request.params.id);
  });
  console.log(singleSong)
  response.status(200).json(singleSong);
});

app.get("/songs/:id", (request, response) => {
  const singleSong = request.params.id
  const popMusic = request.query.genre
  let topPopMusic = topMusicData.filter((item) => item.genre === +singleSong)

  if (popMusic) {
    topPopMusic = topPopMusic.filter((item) => item.genre)
  }

  response.status(200).json(topPopMusic);
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
