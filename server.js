import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 9090;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({responsmessage: "Movie time"});
});
app.get("/type", (req, res) => {
  // return the category title in netflixData array try: 
  res.json(netflixData);
})
app.get("/movies/:year", (req, res) => {
  const year = req.params.year;
  const filteredMovies = netflixData.filter((movie) => movie.release_year === +year);
  res.json(filteredMovies);
});
app.get("/country/:country", (req, res) => {
  const country = req.params.country;
  const filteredCountry = netflixData.filter((movie) => movie.country === country);
  res.json(filteredCountry);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});