import express from "express";
import cors from "cors";
import avocado from './data/avocado-sales.json'
import books from './data/books.json'
import movies from './data/netflix-titles.json'

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
app.get("/", (req, res) => {
  res.send(movies);
});

app.get("/movies", (req, res) => {
  const releaseYear = req.query.release_year;
  console.log(releaseYear);
  let allMovies = movies.filter((movie) => movie.type === "Movie");
  if(releaseYear) {
    allMovies = allMovies.filter((movie) => movie.release_year === +releaseYear )
  }
  res.json(allMovies)
})

app.get("/tvShows", (req, res) => {
  res.send(movies.filter((movie) => movie.type === "TV Show"))
})

app.get('/country/:country', (req, res) => {
  const selectedCountry = req.params.country;
  selectedCountry.toLowerCase();
  const moviesFromCountry = movies.filter((movie) => movie.country.toLowerCase() === selectedCountry);
  res.send(moviesFromCountry);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
