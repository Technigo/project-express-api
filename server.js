import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json';
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json';
import netflixData from './data/netflix-titles.json';
// import topMusicData from './data/top-music.json';

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/shows', (req, res) => {
  res.json(netflixData);
});

console.log(netflixData.length);

app.get('/shows/id/:id', (req, res) => {
  const id = req.params.id;
  const showID = netflixData.find((show) => show.show_id === +id);

  if (!showID) {
    res.status(404).send('Show not found :(');
  } else {
    res.json(showID);
  }
});

app.get('/shows/releaseyear/:year', (req, res) => {
  const year = req.params.year;
  // const showType = req.params.type;
  let releaseYear = netflixData.filter((show) => show.release_year === +year);

  // if (showType === 'Movie') {
  //   releaseYear = releaseYear.filter((show) => show.type === showType);
  // } else {
  res.json(releaseYear);
  // }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
