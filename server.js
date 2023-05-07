import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import topMusicData from "./data/top-music.json";
import swaggerUi from 'swagger-ui-express';


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
const swaggerDocument = require('./swagger.json');
/* const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
  */

// Add middlewares to enable cors and json body parsing
app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json();
  //res.send("Welcome to the TopMusicData api");
});

app.get('/endpoints', (req, res) => {
 res.json(listEndpoints(app));
});


    // returns the full dataset
    app.get('/dataset', (req, res) => {
      try {
        let allData = topMusicData;
    
        res.status(200).json({
          success: true,
          message: "OK",
          body: {
            allData: allData
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "There was a problem handling the requested data",
          body: {}
        });
      }
    });

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
app.get('/genres', (req, res) => {
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
app.get('/genres/:genreName', (req, res) => {
  let { genreName } = req.params;
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


//gets an array of all the tracknames and artists
app.get('/songlist', (req, res) => {
 const allTracks = topMusicData.map((item) => {
    return {
      trackName: item.trackName,
      artistName: item.artistName
    }
  })

if (allTracks.length > 0) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      allTracks: allTracks
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

// Shows all available information on a single song
app.get('/songlist/single/:songname', (req, res) => {
  let { songname } = req.params;

  // Remove question marks from song name, since they don't work in a URL
  songname = songname.replace(/\?/g, "");

  console.log("songname:", songname)

  let bestMatch = null;
  let highestScore = 0;

  // Loop through each song and compare it to the user's input
  for (let i = 0; i < topMusicData.length; i++) {
    const trackName = topMusicData[i].trackName.toLowerCase();
    const userQuery = songname.toLowerCase();

    // Check the similarity score between the song name and the user's input. This is to complete the url if the user misspells or doesn't type the full title.
    let score = 0;
    let j = 0;
    for (let k = 0; k < userQuery.length; k++) {
      if (j >= trackName.length) break;
      if (userQuery[k] == trackName[j]) {
        score++;
        j++;
      }
    }
    score /= trackName.length;

    // Update the best match if this song is a better match than the previous best match
    if (score > highestScore) {
      bestMatch = topMusicData[i];
      highestScore = score;
    }
  }

  if (bestMatch) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        track: bestMatch
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Track not found",
      body: {}
    });
  }
})

// sorts all the data according to danceability or popularity, and displays specified information
app.get('/songlist/sort/:sortBy', (req, res) => {
  const { sortBy } = req.params;
  let sortedSongs = topMusicData;
console.log("sortBy:", sortBy)
  switch(sortBy) {
    case 'danceability':
      sortedSongs = topMusicData
        .sort((a, b) => b.danceability - a.danceability)
        .map(item => {
          return {
            trackName: item.trackName,
            danceability: item.danceability,
            bpm: item.bpm
          }
        })
      break;
    case 'popularity':
      sortedSongs = topMusicData
        .sort((a, b) => b.popularity - a.popularity)
        .map(item => {
          return {
            trackName: item.trackName,
            popularity: item.popularity,
            artist: item.artistName
          }
        })
      break;
    default:
      return res.status(400).json({
        success: false,
        message: "Invalid param. You can sort by 'danceability' or 'popularity'.",
        body: {}
      })
  }

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

// makes a top 10 list of songs that have the highest parameter score. For example top10/energy gives a list of the 10 songs with the most energy
app.get('/songlist/top10/:top10value', (req, res) => {
  const { top10value } = req.params;
  let  top10tracks = topMusicData
  console.log("top10value:", top10value)
  if (top10value) {
    top10tracks = topMusicData
    .sort((a, b) => b[top10value] - a[top10value])
  .slice(0, 10)
  .map(item => {
  return {
    trackname: item.trackName,
    [top10value]: item[top10value],
    artistName: item.artistName
  }
});
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        top10tracks: top10tracks
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

// empty endponint: 
// '/playlist' to make a playlist out of songs based on user input like genre and popularity score for example, and link to a spotify playlist with these songs

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "topMusicData API",
      version: "1.0.0",
      description:
        "This is a simple API application made with Express and documented with Swagger",
      },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ['./server.js'],
};


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//DOCUMENTATION
//topMusicData is an API that allows the user to fetch data about a sample of 50 popular Spotify songs.
//
// */dataset
//shows the entire unfiltered data
//accept the following query params:
//id: fetches a single song with the specified id. Available id's are 1-50

// */ genres
//returns all genres
// accepts the following query params:
//genreName: returns all the songs in a specified genre

// */songlist
// returns all tracknames
// accepts the following query params:
// songname: returns all available data on a specific song

//*/songlist/sort
//accepts the following query params:
//sortBy: sorts the data on either danceability or popularity and returns a few specifics about each song.

// */songlist/top10
// accepts the following request params:
// 'bpm', 'energy', 'danceability', 'loudness', 'liveness', 'valence', 'length', 'acousticness', 'speechiness', 'popularity'
//Returns a list of the 10 songs that score highest in the requested category