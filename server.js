import express, { response } from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";

//Global variables
const trackNames = topMusicData.map((item) => item.trackName);
console.log(trackNames)

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
   

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints');

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("go to /endpoints to see available endpoints");
});

app.get('/endpoints', (req, res) => {
 res.json(listEndpoints(app));
//res.json(data)
});

app.get('/dataset', (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      data: topMusicData
    }
  })
})

//gets an array of all the tracknames
app.get('/songlist', (req, res) => {
  const { songs } = req.query;
  console.log(req.query)
  let filteredTrackNames = topMusicData
 
  if (songs) {
    filteredTrackNames = topMusicData.filter((singleSongs) => {
    return singleSongs.trackName.toLowerCase() === songs.toLowerCase();
  });
}

if (filteredTrackNames.length > 0) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      trackNames: trackNames
    }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "There was a problem handling the requested data",
      body: {}
    });
  }
});

// to search for a single track by name
app.get('/songlist/name/:songname', (req, res) => {
const { songname } = req.params;
const song = topMusicData.find((track) => {
  return track.trackName == songname
})
if(song) {
  res.status(200).json({
    success: true,
      message: "OK",
      body: {
        track: song
      }});
  } else {
    res.status(404).json({
      success: false,
      message: "Track not found",
      body: {}
    });
  }
})

//returns a single track based on id
app.get('/dataset/:id', (req, res) => {
  const { id } = req.params;
  const singletrack = topMusicData.find((track) => {
    return track.id === Number(id);
  });
  if (singletrack) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        track: singletrack
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Track not found",
      body: {}
    });
  }
});

// returns a list of all genres in the dataset
app.get('/genre', (req, res) => {
  const { genres } = req.query;
  console.log(req.query)
  let filteredByGenres = topMusicData
 
  if (genres) {
    filteredByGenres = topMusicData.filter((singleGenres) => {
    return singleGenres.genre.toLowerCase() === genres.toLowerCase();
  });
}

const genreNames = filteredByGenres.map((item) => item.genre);

if (filteredByGenres.length > 0) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      genreNames: genreNames
    }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "There was a problem handling the requested data",
      body: {}
    });
  }
});


//returns all the songs in a specified genre
app.get('/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const songsFilteredByGenreName = topMusicData.filter((song) => {
    return song.genre.toLowerCase() === genreName.toLowerCase();
  });

  if (songsFilteredByGenreName.length > 0) {
    const songNames = songsFilteredByGenreName.map((song) => song.trackName);
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        songNames: songNames
      }
    })
  } else {
    res.status(500).json({
      success: false,
      message: "No such genre in the top 50",
      body: {}
    });
  }
})

//songs sorted by danceability starting with the most danceable
app.get('/songlist/danceability', (req, res) => {
  const sortedSongs = topMusicData
  .sort((a, b) => b.danceability - a.danceability)
  .map(item =>item.trackName); 

  if (sortedSongs.length > 0) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      songs: sortedSongs
    }
  })
} else {
  res.status(500).json({
    success: false,
    message: "There was a problem handling the requested data",
    body: {}
  });
}
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

