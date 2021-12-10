import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import topMusicData from './data/top-music.json';

// Defines the port the app will run on. Defaults to 8080, but can // be overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send(`List all possible endpoints by typing /endpoints on the URL bar`);
});

// Send list of all endpoints
app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app));
});

// Get all tracks. Optional: Filter by song title and/or artist.

// Example: /tracks?artist=Ed Sheeran&songTitle=Perfect

app.get('/tracks', (req, res) => {
  const { songTitle, artist } = req.query;

  let tracksToFilter = topMusicData;

  if (songTitle) {
    tracksToFilter = tracksToFilter.filter(
      (item) =>
        item.trackName.toLowerCase().indexOf(songTitle.toLowerCase()) !== -1,
    );
  }
  if (artist) {
    tracksToFilter = tracksToFilter.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1,
    );
  }

  res.json({
    response: tracksToFilter,
    success: true,
  });
});

// Get track by id
// Example: /tracks/id/89

app.get('/tracks/id/:id', (req, res) => {
  const { id } = req.params;

  const trackId = topMusicData.find((track) => track.id === +id);

  if (!trackId) {
    res.status(404).send('No track by that ID');
  } else {
    res.status(200).json({
      response: trackId,
      success: true,
    });
  }
});

// Get tracks by genre
// Example: /tracks/genre/canadian pop

app.get('/tracks/genre/:genre', (req, res) => {
  const { genre } = req.params;

  const trackByGenre = topMusicData.find(
    (track) => track.genre.toLowerCase() === genre.toLowerCase(),
  );

  if (!trackByGenre) {
    res.status(404).send('No tracks from that genre');
  } else {
    res.status(200).json({
      response: trackByGenre,
      success: true,
    });
  }
});

/*  Get tracks for your party (i.e. danceability over the number you specify. Test with different values, i.e. 70 if you're looking for more energetic dances.)
 */

// Example: /tracks/danceability/60

app.get('/tracks/danceability/:danceability', (req, res) => {
  const { danceability } = req.params;

  const trackForParty = topMusicData.filter(
    (track) => parseInt(track.danceability, 10) > +danceability,
  );

  if (!trackForParty) {
    res.status(404).send('No tracks with that danceability');
  } else {
    res.status(200).json({
      response: trackForParty,
      success: true,
    });
  }
});

// Get tracks for your workout, i.e. energy > 80. No parameters needed.

app.get('/tracks/workout/', (req, res) => {
  const trackForWorkout = topMusicData.filter(
    (track) => parseInt(track.energy, 10) > 80,
  );

  if (!trackForWorkout) {
    res.status(404).send('No tracks with such an energy');
  } else {
    res.status(200).json({
      response: trackForWorkout,
      success: true,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
