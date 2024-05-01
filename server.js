import cors from "cors";
import express from "express";

import netflixData from "./data/netflix-titles.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";

// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9000;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//console.log("Total of movies:", netflixData.length)

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

/* // Define the indexed Netflix data with shoerter IDs
const indexedNetflixData = netflixData.map((item, index) => ({
  ...item,
  id: index + 1, //Asign a shorter ID starting from 1
})); */

// Return all the movies
app.get("/movies", (req, res) => {
  res.json(netflixData);
});

// return one movie by Id
app.get("/movies/:showId", (req, res) => {
  const { showId } = req.params;
  /*  const parsedId = parseInt(showId, 10); */

  const movie = netflixData.find((item) => item.show_id === parseInt(showId));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send("Movies not found");
  }
});

// get movie type

app.get("/movies", (req, res) => {
  const { type } = req.query;
  if (type) {
    const filteredMovies = netflixData.filter((item) => item.type === type);
    res.json(filteredMovies);
  } else {
    res.status(400).send("Type parameter is required");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
