/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import express from 'express';
import cors from 'cors';

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json';
import topMusicData from './data/top-music.json';

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
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/songs', (req, res) => {
  res.json(topMusicData);
});

app.get('/songs/:id', (req, res) => {
  const { id } = req.params;

  const songId = topMusicData.find(song => song.id === +id);

  if (!songId) {
    console.log('no title found');
    res.status(404).send('No song found with that title');
  } else {
    res.json(songId);
  }
});

app.get('/songs/:bpm', (req, res) => {
  const { bpm } = req.params;

  const nameOfArtist = topMusicData.find(artist => artist.bpm === +bpm);

  if (!nameOfArtist) {
    console.log('no artist found');
    res.status(404).send('No artist found with that name');
  } else {
    res.json(nameOfArtist);
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
