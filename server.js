import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints'

// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'

import topMusicData from './data/top-music.json';

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:

//PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// The first endpoint returns a collection of all top music 
app.get('/tracks', (request, response) => {
  response.json(topMusicData);
});

// All artists
app.get('/artists', (request, response) => {
  const artists = topMusicData.map((item) => item.artistName)
  const uniqueArtists = [...new Set(artists)];
  response.json(uniqueArtists);
});

// All tracks
app.get('/songs', (request, response) => {
  const tracks = topMusicData.map(item => item.trackName);
  const uniqueTracks = [...new Set(tracks)];

  response.json(uniqueTracks);
});

// Sorting all tracks by popularity 
app.get('/songs', (request, response) => {
  const sort = request.query.sort;

  if (sort && sort === "popularity") {
    const topTracks = topMusicData.sort((a, b) => b[sort] - a[sort]);
    response.json(topTracks)

    if (topTracks.length === 0) {
      const error = new Error("Not found");
      error.status = 404;
      throw error
    };
  };
});

// Search by id 
app.get('/tracks/:id', (request, response) => {
  const id = request.params.id
  const topmusicID = topMusicData.find((item) => item.id === +id);
  response.json(topmusicID);
});

// Search by trackname
app.get('/track/:trackName', (request, response, next) => {
  const trackName = request.params.trackName;
  const songs = topMusicData.filter((item) => item.trackName === trackName);
  const tracks = songs.map(item => item.trackName);
  const uniqueTracks = [...new Set(tracks)];
  
  // If track is not found
  if (uniqueTracks.length === 0) {
    const error = new Error(`${trackName} not found`);
    error.status = 404;
    throw error;
  };

  response.json(uniqueTracks);
});

// Filter by popularity, /the count means that the number the user define after / will be how many songs the filtering will filter on
app.get('/tracks/:number', (request, response) => {
  const number = request.params.number
  const sortedSongs = [...topMusicData]
  sortedSongs.sort((a, b) => b.popularity - a.popularity)
  const topTenSongs = sortedSongs.slice(0, number);

  response.json(topTenSongs);
});

// Shows the top 3 most popular songs
app.get('/topthree', (request, response) => {
  const sortedSongs = [...topMusicData]
  sortedSongs.sort((a, b) => b.popularity - a.popularity)
  const topThreeSongs = sortedSongs.slice(0, 3)

  response.json(topThreeSongs);
});

// Empty endpoints to create in future
app.get('/topmusic/trending', (req, res, next) => {
  res.send('This does not exist yet!')
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
