import express from "express";
import cors from "cors";

import topMusicData from "./data/top-music.json";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import members from "./data/technigo-members.json"

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    "Top Music API": "Serving you info about Spotifys top tracks",
    "Routes":[{
      "/tracks":"Get all songs",
      "/tracks/artists/:artist":"Get songs from a spesific artist",
      "/tracks/songtitles/:songtitle":"Get a song by its title",
      "/tracks/genres/:genre":"Get songs by genre",
      "/tracks/ids/:id":"Get a song by id",
      "/tracks/random-track":"Get a random song"
    }],
    "Queries":[{
      "/tracks?artist=${artist}":"Get songs from a spesific artist",
      "/tracks?genre=${genre}":"Get songs by genre",
      "/tracks?danceable=true":"Get all songs which are danceable",
      "/tracks/highTempo=true":"Get all high tempo songs"
    }]
  });
});



app.get("/tracks", (req, res) => {
  const { artist, genre, danceable, highTempo  } = req.query
  let filteredTracks = topMusicData
  
  if (artist) {
    filteredTracks = filteredTracks.filter((track) => track.artistName.toLocaleLowerCase().includes(artist.toLocaleLowerCase()))
  }
  if (genre) {
    filteredTracks = filteredTracks.filter((track) => track.trackName.toLocaleLowerCase().includes(genre.toLocaleLowerCase()))
  }
  if (danceable) {
    filteredTracks = filteredTracks.filter((track) => track.danceability > 60)
  }
  if (highTempo) {
    filteredTracks = filteredTracks.filter((track) => track.bpm > 120)
  }


  if (filteredTracks.length === 0) {
    res.status(200).json({
      data: "Sorry, not able to find a track matching your search.",
      success: false
    })
  } else {
    res.status(200).json({
      data: filteredTracks,
      success: true
    })
  }

  res.status(200).json({
    data: topMusicData,
    success: true
})
})


// Example: http://localhost:8080/tracks/artists/lewis capaldi
app.get("/tracks/artists/:artist", (req, res) => {
  const artist = req.params.artist
  const trackByArtist = topMusicData.filter((track) => track.artistName.toLocaleLowerCase().includes(artist.toLocaleLowerCase()))
  
  if (trackByArtist.length === 0) {
      res.status(404).json({
        data: "Sorry, artist not found.",
        success: false
      })
  } else {
    res.status(200).json({
      data: trackByArtist,
      success: true
    })
  }
})


// Example: http://localhost:8080/tracks/songtitles/bad guy
app.get("/tracks/songtitles/:songtitle", (req, res) => {
  const songtitle = req.params.songtitle
  const songName = topMusicData.filter((track) => track.trackName.toLocaleLowerCase().includes(songtitle.toLocaleLowerCase()))

  if (songName.length === 0) {
    res.status(404).json({
      data: "Sorry, song not found.",
      success: false
    })
  } else {
    res.status(200).json({
      data: songName,
      success: true
    })
  }
})


// Example: http://localhost:8080/tracks/genres/latin
app.get("/tracks/genres/:genre", (req, res) => {
  const genre = req.params.genre
  const trackGenre = topMusicData.filter((track) => track.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase()))

  if (trackGenre.length === 0) {
    res.status(200).json({
      data: "Sorry, not able to find this genre.",
      success: false
    })
  } else {
    res.status(200).json({
      data: trackGenre,
      success: true
    })
  }
})


// Example: http://localhost:8080/tracks/id/30
app.get("/tracks/ids/:id", (req, res) => {
  const id = req.params.id
  const trackId = topMusicData.filter((track) => track.id === +id)

  if (!trackId) {
    res.status(404).json({
      data: "Sorry, can't find a track with that id.",
      success: false
    })
  } else {
    res.status(200).json({
      data: trackId,
      success: true
    })
  }
})


app.get("/tracks/random-track", (req, res) => {
  const randomTrack = topMusicData[Math.floor(Math.random() * topMusicData.length)]

  res.status(200).json({
    data: randomTrack,
    success: true
  })
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


