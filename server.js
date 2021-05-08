import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';

import topMusicData from './data/top-music.json';

// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// // import booksData from './data/books.json'
// // import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app));
});

//endpoint to get all the 50 popular Spotify tracks and filtering by artistName, genre, trackName
app.get('/tracks', (req, res) => {
  const { artistName, genre, trackName } = req.query;
  let tracksToSend = topMusicData;

  if (artistName) {
    tracksToSend = tracksToSend.filter((track) =>
      track.artistName.toLowerCase().includes(artistName.toLowerCase()))
  }

  if (genre) {
    tracksToSend = tracksToSend.filter((track) =>
      track.genre.toLowerCase().includes(genre.toLowerCase()))
  }

  if (trackName) {
    tracksToSend = tracksToSend.filter((track) => 
      track.trackName.toLowerCase().includes(trackName.toLowerCase()))
  }

  res.json({ length: tracksToSend.length, data: tracksToSend });
});

//end point to get one specific track by id
app.get('/tracks/:id', (req,res) => {
  const { id } = req.params;
  const queriedId = topMusicData.find(track => track.id === +id)

  if (queriedId) {
    res.json({data: queriedId})
  } else {
    res.status(404).json({error: 'Not found'})
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
