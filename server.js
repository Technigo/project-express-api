import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import topMusicData from './data/top-music.json';

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', age: 99 },
  { id: 2, name: 'Balice', age: 29 },
  { id: 3, name: 'Calice', age: 39 },
  { id: 4, name: 'Dalice', age: 49 },
];

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

// endpoints sends back list of possible endpoints of app
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// and here endpoints start
app.get('/users', (req, res) => {
  res.json(users);
});

// Query arams starts here 👇🏻👇🏼👇🏽
// The endpoint can be named anything, but the data need to have the same name as the imported data.
app.get('/songs', (req, res) => {
  const { title, artist } = req.query;

  let topMusicDataToSort = topMusicData;

  // indexOf... includes search results that include part of the words. Hel = both hello and helsinki.
  if (title) {
    topMusicDataToSort = topMusicDataToSort.filter(
      (item) => item.trackName.toLowerCase().indexOf(title.toLowerCase()) !== -1
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

  res.json({
    response: topMusicDataToSort,
    success: true,
  });
});

// Endpoints using path params start here 👇🏻👇🏼👇🏽

app.get('/songs/bpm/:bpm', (req, res) => {
  const { bpm } = req.params;

  const songBPM = topMusicData.find((song) => song.bpm === +bpm);

  if (!songBPM) {
    // handle if there is no data
    res.status(404).send('No song with that bpm was found.');
  } else {
    // show the data
    res.json(songBPM);
  }
});

app.get('/songs/artist/:artist', (req, res) => {
  const { artist } = req.params;

  const artistByName = topMusicData.find(
    (item) => item.artistName.toLowerCase() === artist.toLowerCase()
  );

  if (!artistByName) {
    res.status(404).json({
      response: 'no artist found by that name',
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
