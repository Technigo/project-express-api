import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import netflixData from './data/netflix-titles.json';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoint list of endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

const movieByDirector = (data, director) => {
  return data.filter((movie) => {
    return movie.director.toLowerCase().indexOf(director.toLowerCase()) !== -1;
  });
};
const movieByYear = (data, year) => {
  return data.filter((movie) => {
    return movie.release_year === +year;
  });
};
//Endpoint for all movies (including querys)
app.get('/movies', (req, res) => {
  const { director, year } = req.query;
  let data = netflixData;
  console.log(year);
  if (director) {
    data = movieByDirector(data, director);
  }
  if (year) {
    data = movieByYear(data, year);
  }

  if (data.length === 0) {
    res.status(404).json({ error: 'Not Found' });
  }

  res.json(data);
});

app.get('/movies/:id', (req, res) => {
  const id = req.params.id;

  let movieByID = netflixData.find((movie) => movie.show_id === +id);

  if (movieByID) {
    res.json({ data: movieByID });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
});

//List of countries?

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
