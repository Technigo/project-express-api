import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import topMusicData from './data/top-music.json';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Routes start here
app.get('/', (req, res) => {
  res.send('Hello :>');q
});

// endpoints sends back list of possible endpoints of app
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// Query params starts
// The endpoint can be named anything, but the data need to have the same name as the imported data.
app.get('/songs', (req, res) => {
  const { musicGenre, title, artist } = req.query;

  let topMusicDataToSort = topMusicData;


  if (musicGenre) {
    topMusicDataToSort = topMusicDataToSort.filter(
      (item) =>
        item.genre.toLowerCase().indexOf(musicGenre.toLowerCase()) !== -1
    );
  }
  
  if (artist) {
    topMusicDataToSort = topMusicDataToSort.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1
    );
  }

  if (title) {
    topMusicDataToSort = topMusicDataToSort.filter(
      (item) => item.trackName.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
  }

  res.json({
    response: topMusicDataToSort,
    success: true,
  });
});

// Endpoints using path params

app.get('/songs/id/:id', (req, res) => {
  const { id } = req.params;

  const songId = topMusicData.find((song) => song.id === +id);

  if (!songId) {
    res.status(404).send('No song with that ID was found.');
  } else {
    res.status(200).json({
      response: songId,
      success: true,
    });
  }
});

app.get('/songs/popularity/:popularity', (req, res) => {
  const { popularity } = req.params;

  const songpopularity = topMusicData.find((song) => song.popularity === +popularity);

  if (!songBPM) {
    res.status(404).send('No song with that popularity was found.');
  } else {
    res.status(200).json({
      response: songpopularity,
      success: true,
    });
  }
});

app.get('/songs/artist/:artist', (req, res) => {
  const { artist } = req.params;

  const artistByName = topMusicData.find(
    (item) => item.artistName.toLowerCase() === artist.toLowerCase()
  );

  if (!artistByName) {
    res.status(404).json({
      response: 'No artist by that name was found',
      success: false,
    });
  } else {
    res.status(200).json({
      response: artistByName,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});