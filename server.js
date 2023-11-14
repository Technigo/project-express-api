import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
//const app = express();

// Import a module for listing all endpoints in the app
const listEndpoints = require("express-list-endpoints")
const app = require('express')();

// Add middlewares to enable cors and json body parsing (cors= API kan berätta var requests kmr ifrån, express läser requesten)
app.use(cors());
app.use(express.json());

// Start defining your routes here

// Default route to list all available endpoints in the app
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

// Endpoint for all the data from netflixData
app.get('/titles', (req, res) => {
  res.json(netflixData)
  console.log(`Showing netliixdata`)
})

// Endpoint to fetch a specific title by its show_id
app.get('/titles/id/:id', (req, res) => {
  const id = req.params.id;
  const movieId = netflixData.find((netflixTitle) => netflixTitle.show_id === +id);

    // Respond with the details of the specific title
  res.json(movieId);
});

// Endpoint to fetch titles in a specific category
app.get('/titles/categories/:category', (req, res) => {
  const requestedCategory = req.params.category.toLowerCase();
  const moviesInCategory = netflixData.filter(movie => movie.listed_in.toLowerCase().includes(requestedCategory));
  const movieTitles = moviesInCategory.map(movie => movie.title);

    // Respond with the titles in the specified category
  res.json({ moviesInCategory: movieTitles });
});

// Endpoint to fetch titles of a specific type (movie or TV show)
app.get('/titles/types/:type', (req, res) => {
  const requestedType = req.params.type.toLowerCase();
  const movieOrTvshow = netflixData.filter(typeOfMedia => typeOfMedia.type.toLowerCase().includes(requestedType));
  const mediaTitlesType = movieOrTvshow.map(typeOfMedia => typeOfMedia.title);

    // Respond with the titles of the specified type
  res.json({ movieOrTvshow: mediaTitlesType });
})

// Endpoint to fetch titles from a specific country
app.get('/titles/countries/:country', (req, res) => {
  const requestedCountry = req.params.country.toLowerCase();
  const mediaFromCountry = netflixData.filter(mediaCountry => mediaCountry.country.toLowerCase().includes(requestedCountry));
  const mediaTitlesCountry = mediaFromCountry.map(mediaCountry => mediaCountry.title);

    // Respond with the titles from the specified country
  res.json({ mediaFromCountry: mediaTitlesCountry })
})


// Start the server and log a message when it's running
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


