import cors from "cors";
import express from "express";
import listEndpoints from "express-list-endpoints";

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

// Start defining your routes here
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Netflix API!",
    endpoints: listEndpoints(app),
  });
});

// Return all the movies
//http://localhost:9000/movies?title=Atlantics
app.get("/movies", (req, res) => {
  const movieTitle = req.query.title;

  if (movieTitle) {
    const titleSearch = netflixData.filter((movie) =>
      movie.title.toLowerCase().includes(movieTitle.toLowerCase())
    );

    if (titleSearch.length > 0) {
      res.json(titleSearch);
    } else {
      res.status(404).send("No movie is available with that title");
    }
  } else {
    res.json(netflixData);
  }
});

//Filter movies based on the released year
//http://localhost:9000/movies/by-year?year=2019

app.get("/movies/by-year", (req, res) => {
  const { year } = req.query; // Extract the year from the query parameter

  if (!year) {
    return res.status(400).json({ error: "Year parameter is required" });
  }

  const moviesByYear = netflixData.filter(
    (movie) => movie.release_year.toString() === year
  );

  if (moviesByYear.length) {
    // if there any movies matching the given year
    res.json(moviesByYear); // return the filtered movies
  } else {
    res.status(404).json({ error: "No movies found this year" });
  }
});

// Return one movie by show_id
//http://localhost:9000/movies/81197050

app.get("/movies/:showId", (req, res) => {
  const { showId } = req.params;
  const parseId = parseInt(showId, 10);

  const movie = netflixData.find((item) => item.show_id === parseId);
  if (movie) {
    res.json(movie); //return the movie with the matching Id
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
