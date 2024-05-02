import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";

import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Route to show documentation of the API
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json(endpoints);
});

// Start defining your routes here

// Get all topMusicData
app.get("/tracks", (req, res) => {
  const {
    artist,
    genre,
    bpm,
    trackName,
    popularity,
    danceability,
    page,
    pageSize,
  } = req.query;

  // Convert page and pageSize to numbers (default to 1 and 10 if not provided)
  const pageNumber = parseInt(page) || 1;
  const limit = parseInt(pageSize) || 10;

  // Calculate the start and end indices for pagination
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = pageNumber * limit;

  //Copy original data for filtering
  let filteredTracks = [...topMusicData];

  //Apply filters
  if (artist) {
    const artistName = artist.toLowerCase();
    filteredTracks = filteredTracks.filter(
      (track) => track.artistName.toLowerCase() === artistName
    );
  }

  if (genre) {
    const genreName = genre.toLowerCase();
    filteredTracks = filteredTracks.filter(
      (track) => track.genre.toLowerCase() === genreName
    );
  }

  if (bpm) {
    const bpmValue = parseInt(bpm);
    filteredTracks = filteredTracks.filter((track) => track.bpm === bpmValue);
  }

  if (trackName) {
    const trackNameValue = trackName.toLowerCase();
    filteredTracks = filteredTracks.filter((track) =>
      track.trackName.toLowerCase().includes(trackNameValue)
    );
  }

  if (popularity) {
    const popularityValue = parseInt(popularity);
    filteredTracks = filteredTracks.filter(
      (track) => track.popularity === popularityValue
    );
  }

  if (danceability) {
    const danceabilityValue = parseInt(danceability);
    filteredTracks = filteredTracks.filter(
      (track) => track.danceability === danceabilityValue
    );
  }
  // Get subset of tracks based on pagination
  const paginatedTracks = filteredTracks.slice(startIndex, endIndex);
  //return paginated tracks along with metadata
  res.json({
    total: filteredTracks.length,
    page: pageNumber,
    pageSize: limit,
    data: paginatedTracks,
  });
});

//Get one song based on id
app.get("/tracks/:trackId", (req, res) => {
  const { trackId } = req.params;

  const track = topMusicData.find((track) => +trackId === track.id);

  if (track) {
    res.json(track);
  } else {
    // If track not found, return 404 with a custom error message
    res.status(404).json({ error: "Track not found" });
  }
});

//API-documentation-page
app.get("/documentation", (req, res) => {
  const documentation = `
  <h1> API Endpoint Usage Instructions </h1>
  <h2>Get all tracks:</h2>
  <p>Endpoint: <a href="https://top-music.onrender.com/tracks">https://top-music.onrender.com/tracks</a></p>
  <p>Method: GET</p>
  <h2>Get a specific track by ID:</h2>
  <p>Endpoint: <a href="https://top-music.onrender.com/tracks/:trackId">https://top-music.onrender.com/tracks/:trackId</a></p>
  <p>Example: <a href="https://top-music.onrender.com/tracks/15">https://top-music.onrender.com/tracks/15</a></p>
  <p>Method: GET</p>
  <h2>Filter tracks by query parameters:</h2>
  <p>To filter tracks, append query parameters to the /tracks endpoint.</p>
  <p>Example filters:</p>
    <ul>
      <li>Filter by artist: <a href="https://top-music.onrender.com/tracks?artist=Shawn%20Mendes">https://top-music.onrender.com/tracks?artist=Shawn%20Mendes</a></li>
      <li>Filter by popularity: <a href="https://top-music.onrender.com/tracks?popularity=85">https://top-music.onrender.com/tracks?popularity=85</a></li>
      <li>Filter by genre: <a href="https://top-music.onrender.com/tracks?genre=reggaeton%20flow">https://top-music.onrender.com/tracks?genre=reggaeton%20flow</a></li>
    </ul>
    <p>Supported query parameters: artist, genre, bpm, popularity, danceability, trackName</p>
     
    <h2>Pagination:</h2>
    <p>You can paginate through the list of tracks by using the following query parameters:</p>
    <ul>
      <li><strong>page</strong> (optional): Specifies the page number to retrieve. Defaults to 1 if not provided.</li>
      <li><strong>pageSize</strong> (optional): Specifies the number of items per page. Defaults to 10 if not provided.</li>
    </ul>
    <p>Example usage:</p>
    <ul>
      <li>Get the first page with default page size:<br>
        <code>GET /tracks?page=1</code>
      </li>
      <li>Get the second page with a custom page size of 20:<br>
        <code>GET /tracks?page=2&pageSize=20</code>
      </li>
    </ul>`;
  res.send(documentation);
});

// Catch-all route handler for invalid URLs
app.use((req, res) => {
  res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
