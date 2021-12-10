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
  res.send('Add /endpoints to see all possible endpoints');
});

// endpoints sends back list of possible endpoints of app
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// Query params starts here 👇🏻👇🏼👇🏽
// The endpoint can be named anything, but the data need to have the same name as the imported data.
app.get('/songs', (req, res) => {
  const { musicGenre, title, artist } = req.query;

  let topMusicDataToSort = topMusicData;

  // indexOf... includes search results that include part of the words. Hel = both hello and helsinki.
  if (musicGenre) {
    topMusicDataToSort = topMusicDataToSort.filter(
      (item) =>
        item.genre.toLowerCase().indexOf(musicGenre.toLowerCase()) !== -1
    );
  }
  // if again! we can enter one, both or none of the if statements.
  // filtering the same results one more time
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

// Endpoints using path params start here 👇🏻👇🏼👇🏽

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

app.get('/songs/bpm/:bpm', (req, res) => {
  const { bpm } = req.params;

  const songBPM = topMusicData.find((song) => song.bpm === +bpm);

  if (!songBPM) {
    res.status(404).send('No song with that exact bpm was found.');
  } else {
    res.status(200).json({
      response: songBPM,
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
