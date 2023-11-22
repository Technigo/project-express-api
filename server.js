import express from "express";
import cors from "cors";
import goldenGlobesData from "./data/golden-globes.json";
import listEndpoints from 'express-list-endpoints';

console.log(goldenGlobesData.length);
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
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
  res.json(listEndpoints(app));
});
// Test by adding / ( you will recieve the endpoint structure as an answer )

app.get('/nominations', (req, res) => {
  if (!Array.isArray(goldenGlobesData)) {
    res.status(500).send('Server error: Unable to retrieve data');
  } else {
    res.json(goldenGlobesData);
  }
});

// Test by adding /nominations

app.get('/nominee/:nominee', (req, res) => {
  const nominee = req.params.nominee;
  const nomination = goldenGlobesData.find((item) => item.nominee === nominee);
  
  if (nomination) {
    res.json(nomination);
  } else {
    res.status(404).send('Nomination not found');
  }
});

// Test by adding tex  /nominee/Kathryn%20Bigelow

// use to /nominations test endpoint!

app.get('/year/:year', (req, res) => {
  const year = req.params.year;
  const showWon = req.query.won;
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_film === +year);

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win);
  }
  
  // Error handling for no matching results
  if (nominationsFromYear.length === 0) {
    res.status(404).send(`No nominations found for the film year ${year}`);
  } else {
    res.json(nominationsFromYear);
  }
});
// Test by adding tex /year/2009 or /year/2009?won=true


// Use to /year/2020 test endpoint!

app.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const film = req.query.film;
  let nominationsInCategory = goldenGlobesData.filter((item) => item.category === category);

  if (film) {
    nominationsInCategory = nominationsInCategory.filter((item) => item.film.includes(film));
  }

  if (nominationsInCategory.length === 0) {
    res.status(404).send(`No nominations found for category '${category}'` + (film ? ` with film '${film}'` : ''));
  } else {
    res.json(nominationsInCategory);
  }
});
// Test by adding /category/Best%20Director%20-%20Motion%20Picture or somthing like this /category/Best%20Director%20-%20Motion%20Picture?film=Avatar

// Use /category , /category/Best%20Motion%20Picture%20-%20Drama to test endpoint!

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
