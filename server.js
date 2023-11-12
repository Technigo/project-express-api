import express from "express";
import cors from "cors";
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

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
// Start defining your routes here
//Homepage//
app.get("/", (req, res) => {
  res.send("Welcome to the Netflix Titles API!");
});

//For all titles//
app.get("/titles", (req, res) => {
  res.json(netflixData);
});

//For one title//
app.get("/titles/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = netflixData.find(item => item.show_id === id);

  if (!title) {
    res.status(404).send('Title not found');
  } else {
    res.json(title);
  }
});

//Title by one direcor//
app.get("/director/:director", (req, res) => {
  const directorName = req.params.director.toLowerCase();
  const titles = netflixData.filter(item => item.director?.toLowerCase().includes(directorName));

  if (titles.length === 0) {
    res.status(404).send('No titles found for this director');
  } else {
    res.json(titles);
  }
});

//Title by releaseyear//
app.get("/year/:releaseYear", (req, res) => {
  const releaseYear = parseInt(req.params.releaseYear);
  const titles = netflixData.filter(item => item.release_year === releaseYear);

  if (titles.length === 0) {
    res.status(404).send('No titles found from this year');
  } else {
    res.json(titles);
  }
});

//Remove title, won't work with JSON and the deletion will not show when server restarts//
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

//Filter titles by director,  country, rating //
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

//Dummy for recommendations//
app.get('/titles/recommendations', (req, res) => {
  const { country, cast } = req.query;
  res.json({ message: 'Recommendation feature is under development.' });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
