import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import netflixData from './data/netflix-titles.json';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

app.get('/movies', (req, res) => {
  res.status(200).json({
    data: netflixData,
    success: true,
  });
});

//Country
app.get('/movies/country/:country', (req, res) => {
  const { country } = req.params;
  const whatCountry = netflixData.filter(
    (movie) => movie.country.toLowerCase() === country.toLowerCase()
  );

  res.status(200).json({
    data: whatCountry,
    success: true,
  });
});

//Movie title
app.get('/movies/title/:title', (req, res) => {
  const { title } = req.params;
  const whatTitle = netflixData.find(
    (movie) => movie.title.toLowerCase() === title.toLowerCase()
  );

  if (!whatTitle) {
    res.status(404).json('Sorry! Not found.');
  } else {
    res.status(200).json({
      data: whatTitle,
      success: true,
    });
  }
});

//Release year
app.get('/movies/releaseyear/:year', (req, res) => {
  const { year } = req.params;
  const whatYear = netflixData.filter(
    (movie) => movie.release_year.toString() === year
  );

  res.status(200).json({
    data: whatYear,
    success: true,
  });
});

//Release year
app.get('/movies/:id/', (req, res) => {
  const { id } = req.params;
  const whatId = netflixData.filter((movie) => movie.show_id.toString() === id);

  res.status(200).json({
    data: whatId,
    success: true,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
