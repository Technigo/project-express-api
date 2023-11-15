import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import netflixData from "./data/netflix-titles.json";
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

console.log(netflixData.length);
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({ endpoints });
});

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

app.get("/allTitles", (req, res) => {
  res.json(netflixData);
});

//Filter
// app.get("/movies", (req, res)) => {
//   const typeMovie = req.query.type;
//   let movies = netflixData.filter((item)=>item.type === typeMovie)
// }

//Filter the movies / tv show from certain year with params, then further filter the data with query
app.get("/year/:releaseYear", (req, res) => {
  const years = req.params.releaseYear;
  const countries = req.query.country;

  let releaseYear = netflixData.filter((item) => item.release_year === +years);
  // Filter the movies / tv show from certain year & certain country
  if (countries) {
    // Filter the data base on both year and country
    releaseYear = releaseYear.filter((item) => {
      // Split the item's countries string into an array
      const itemCountries = item.country
        .split(",")
        .map((country) => country.trim());
      // Check if any of the requested countries is included in the movie/tv show's countries
      // The URL should look like this /year/:releaseYear?country=YourCountry
      return itemCountries.includes(countries);
    });
  }
  res.json(releaseYear);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
