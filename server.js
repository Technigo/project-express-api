import express from "express";
import cors from "cors";
import artistsMoma from './data/artists-moma.json';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndPoints = require('express-list-endpoints')

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndPoints(app))
});

app.get("/artists", (req, res) => {
  const { gender } = req.query;
  let artists = artistsMoma;
  if (gender) {
    artists = artistsMoma.filter((artist) => {
      return artist.Gender.toLowerCase() === gender.toLowerCase();
    });
  } 
  if (artists) {
    res.status(200).json({
      success: true,
      massage: "OK",
      body: {
        artistsMoma: artists
      }
    });
  } else {
    res.status(500).json({
      success: false,
      massage: "Something went wrong",
      body: {}
    });
  }
});

app.get("/nationality/:nationality", (req, res) => {
  const nationality = req.params.nationality
  const { gender } = req.query;
  let artistsNationality = artistsMoma.filter((artist) => {
    return artist.Nationality.toLowerCase().includes(nationality.toLowerCase())
  })
  if (gender) {
    artistsNationality = artistsNationality.filter((artist) => {
      return artist.Gender.toLowerCase() === gender.toLowerCase();
    });
  } 
  if (nationality) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        artist: artistsNationality
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  }
});

app.get("/born-after/:year", (req, res) => {
  const year = req.params.year;
  const { nationality } = req.query;
  let artistsBornAfter = artistsMoma.filter((artist) => artist.Birth_Year > year )
  if (nationality) {
    artistsBornAfter = artistsBornAfter.filter((artist) => {
      return artist.Nationality.toLowerCase() === nationality.toLowerCase();
    });
  } 
  if (year) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        artist: artistsBornAfter
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "No artist this young",
      body: {}
    });
  }
});


app.get("/artists/:id", (req, res) => {
  const { id } = req.params
  const singleArtist = artistsMoma.find((artist) => {
    return artist.Artist_ID === +id
  })
  if (singleArtist) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        artistsMoma: singleArtist
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Artist not found",
      body: {}
    });
  }
});

app.get("/artists/name/:name", (req, res) => {
  const { name } = req.params
  console.log("The name parameter is:", name);
  const singleArtistName = artistsMoma.find((artist) => {
    return artist.Name.toLowerCase().includes(name.toLowerCase())
  })
  if (singleArtistName) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        artist: singleArtistName
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Artist not found",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
