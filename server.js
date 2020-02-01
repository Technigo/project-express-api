import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import netflixData from './data/netflix-titles.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Two routes here

//First route filter once on multiple fields based on title OR country OR desription OR genre
app.get('/api', (req, res) => {
  // query parameter
  const searchString = req.query.search;
  let filteredApi = netflixData;

  if (searchString) {
    filteredApi = filteredApi.filter(item => {
      const itemTitle = item.title.toString();
      const itemCountry = item.country.toString();
      const itemDescription = item.description.toString();
      const itemGenre = item.listed_in.toString();
      return (
        itemTitle.includes(searchString.toLowerCase()) ||
        itemCountry.includes(searchString) ||
        itemDescription.includes(searchString) ||
        itemGenre.includes(searchString)
      );
    });
  }
  res.json(filteredApi);
});

// Second route has a path parameter to filter by year and two guery parameters to filter by genre OR/AND type.
app.get('/api/:year', (req, res) => {
  const year = req.params.year;
  const showGenre = req.query.listed_in;
  const showType = req.query.type;

  let releaseYear = netflixData.filter(item => item.release_year === +year);

  if (showType) {
    releaseYear = releaseYear.filter(type => {
      const typeItem = type.type.toLowerCase();
      return typeItem.includes(showType.toLowerCase());
    });
  }

  if (showGenre) {
    releaseYear = releaseYear.filter(item => {
      const genreItem = item.listed_in.toLowerCase();
      return genreItem.includes(showGenre.toLowerCase());
    });
  }

  res.json(releaseYear);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
