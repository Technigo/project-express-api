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

// Start defining your routes here
app.get('/movies', (req, res) => {
  res.json(netflixData);
});

app.get('/movies/:title', (req, res) => {
  const title = req.params.title;
  console.log(title);
  console.log(netflixData[0].title.toLowerCase());

  // netflixData.forEach((item) => console.log(item.title.toLowerCase()));

  let singleMovie = netflixData.filter(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );
  console.log(singleMovie);
  res.json(singleMovie);
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
