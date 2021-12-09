import express from 'express';
import cors from 'cors';
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

// Get all tracks
app.get('/tracks', (req, res) => {
  res.json(topMusicData);
});

// Get track by id
app.get('tracks/:id', (req, res) => {
  const { id } = req.params;

  const trackId = topMusicData.find((track) => track.id === +id);

  if (!trackId) {
    console.log('No track by that name');
  } else {
    res.json(trackId);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
