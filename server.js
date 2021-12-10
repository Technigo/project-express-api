import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import netflixData from './data/netflix-titles.json';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Start defining your routes here
// app.get('/shows', (req, res) => {
//   res.json(netflixData);
// });

app.get('/', (req, res) => {
  // res.send('Welcome to netFlix data endpoints');
  res.json(listEndpoints(app));
});

// app.get('/endpoints', (req, res) => {

// });

//endpoints by using one or more queries
app.get('/shows', (req, res) => {
  const { title, type, cast, country, year } = req.query;
  let showsToDisplay = netflixData;

  if (title) {
    showsToDisplay = showsToDisplay.filter((show) =>
      show.title.toString().toLowerCase().includes(title.toLowerCase())
    );
  }
  if (type) {
    showsToDisplay = showsToDisplay.filter((show) =>
      show.type.toString().toLowerCase().includes(type.toLowerCase())
    );
  }
  if (country) {
    showsToDisplay = showsToDisplay.filter(
      (show) => show.country.toString().toLowerCase() === country
    );
  }
  if (cast) {
    showsToDisplay = showsToDisplay.filter((show) =>
      show.cast.toString().toLowerCase().includes(cast.toLowerCase())
    );
  }
  if (year) {
    showsToDisplay = showsToDisplay.filter(
      (show) => show.release_year === +year
    );
  }
  res.json({
    response: showsToDisplay,
    success: true,
  });
});

// endpoint to get a specific shows by id
app.get('/shows/id/:id', (req, res) => {
  const { id } = req.params;
  const showID = netflixData.find((show) => show.show_id === +id);

  if (!showID) {
    res.status(404).send(`No show found with id number ${id} :(`);
  } else {
    res.json({
      response: showID,
      success: true,
    });
  }
});

//endpoint to get shows depending on category
app.get('/shows/category/:category', (req, res) => {
  const { category } = req.params;

  let showByCategory = netflixData.filter((show) =>
    show.listed_in.toString().toLowerCase().includes(category.toLowerCase())
  );

  res.json({
    response: showByCategory,
    success: true,
  });
});

// endpoint to get all shows from a specific year, and also possible to add query to sort tvshows or movies
app.get('/shows/releaseyear/:year', (req, res) => {
  const { year } = req.params;
  const { type } = req.query;

  let releaseYear = netflixData.filter((show) => show.release_year === +year);

  if (type) {
    releaseYear = releaseYear.filter((show) =>
      show.type.toString().toLowerCase().includes(type.toLowerCase())
    );
  }
  res.json({
    response: releaseYear,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
