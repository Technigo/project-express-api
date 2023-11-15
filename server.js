import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";
const expressListEndpoints = require('express-list-endpoints');

const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Serving static files from the 'public' directory
app.use(express.static('public'));

// Endpoint for API documentation
app.get('/api-docs', (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Default route for the root path
app.get("/", (req, res) => {
  res.send("Welcome to the Netflix Titles API!");
});

// For all titles
app.get("/titles", (req, res) => {
  res.json(netflixData);
});

// For one title
app.get("/titles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = netflixData.find(item => item.show_id === id);

  if (!title) {
    res.status(404).send('Title not found');
  } else {
    res.json(title);
  }
});

// Title by one director
app.get("/director/:director", (req, res) => {
  const directorName = req.params.director.toLowerCase();
  const titles = netflixData.filter(item => item.director?.toLowerCase().includes(directorName));

  if (titles.length === 0) {
    res.status(404).send('No titles found for this director');
  } else {
    res.json(titles);
  }
});

// Title by release year
app.get("/year/:releaseYear", (req, res) => {
  const releaseYear = parseInt(req.params.releaseYear);
  const titles = netflixData.filter(item => item.release_year === releaseYear);

  if (titles.length === 0) {
    res.status(404).send('No titles found from this year');
  } else {
    res.json(titles);
  }
});

// Remove title (won't work with JSON and the deletion will not show when the server restarts)
app.delete("/titles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const titleIndex = netflixData.findIndex(item => item.show_id === id);

  if (titleIndex !== -1) {
    netflixData.splice(titleIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).send('Title not found');
  }
});

// Filter titles by director, country, rating, and type
app.get("/titles", (req, res) => {
  let { director, country, rating, type } = req.query;
  let filteredTitles = netflixData;

  if (director) {
    director = director.toLowerCase();
    filteredTitles = filteredTitles.filter(item => item.director?.toLowerCase().includes(director));
  }

  if (country) {
    country = country.toLowerCase();
    filteredTitles = filteredTitles.filter(item => item.country?.toLowerCase().includes(country));
  }

  if (rating) {
    rating = rating.toLowerCase();
    filteredTitles = filteredTitles.filter(item => item.rating?.toLowerCase() === rating);
  }

  if (type) {
    type = type.toLowerCase();
    filteredTitles = filteredTitles.filter(item => item.type?.toLowerCase() === type);
  }

  res.json(filteredTitles);
});

// Dummy for recommendations
app.get('/titles/recommendations', (req, res) => {
  const { country, cast } = req.query;
  res.json({ message: 'Recommendation feature is under development.' });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

