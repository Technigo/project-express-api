import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";


// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Homescreen/Start defining your routes here
app.get("/", (req, res) => {
  const navigation = {
    guide: "Routes for movies API",
    Endpoints: [
      {
        "/movies": "Display all movies",
        "/movies/release_year/:release_year": "Display movies from year",
        "/movies/title/:title": "Search for a title"
      },
    ],
  };
  res.send(navigation)
});
// Get all Method
app.get("/movies", (req, res) => {
  res.json(netflixData)
})
// Get by ID Method number
app.get("/release_year/:release_year", (req, res) => {
  const release_year = req.params.release_year
  const moviesFromYear = netflixData.filter((movies) => movies.release_year === +release_year)
  res.json(moviesFromYear)
})
// Get by ID Method string
app.get("/title/:title", (req, res) => {
  const title = req.params.title
  const titlesFromNetflix = netflixData.filter((title) => title.title.toLowerCase() === title)
  res.json(titlesFromNetflix)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
