import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music";

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (request, response) => {
  response.json("this is top music on spötify");
});

app.get("/songs", (request, response) => {
  let songs = topMusicData;

  const {
    trackName,
    artistName,
    genre,
    bpm,
    energy,
    danceability,
    loudness,
    liveness,
    valence,
    length,
    acousticness,
    speechiness,
    popularity
  } = request.query;

  //get song from specific song name
  if (trackName) {
    songs = songs.filter(singleSongData => singleSongData.trackName.toLowerCase() === trackName.toLowerCase());
  }

  //get music from specific artist
  if (artistName) {
    songs = songs.filter(singleSongData => singleSongData.artistName.toLowerCase() === artistName.toLowerCase());
  }

  //get music from specific genre
  if (genre) {
    songs = songs.filter(singleSongData => singleSongData.genre.toLowerCase() === genre.toLowerCase());
  }

  //get music from specific bpm
  if (bpm) {
    songs = songs.filter(singleSongData => singleSongData.bpm === +bpm);
  }

  //get music from specific energy
  if (energy) {
    songs = songs.filter(singleSongData => singleSongData.energy === +energy);
  }

  //get music from specific danceability
  if (danceability) {
    songs = songs.filter(singleSongData => singleSongData.danceability === +danceability);
  }

  //get music from specific loudness
  if (loudness) {
    songs = songs.filter(singleSongData => singleSongData.loudness === +loudness);
  }

  //get music from specific liveness
  if (liveness) {
    songs = songs.filter(singleSongData => singleSongData.liveness === +liveness);
  }

  //get music from specific valence
  if (valence) {
    songs = songs.filter(singleSongData => singleSongData.valence === +valence);
  }

  //get music from specific length
  if (length) {
    songs = songs.filter(singleSongData => singleSongData.length === +length);
  }

  //get music from specific acousticness
  if (acousticness) {
    songs = songs.filter(singleSongData => singleSongData.acousticness === +acousticness);
  }

   //get music from specific speechiness
  if (speechiness) {
    songs = songs.filter(singleSongData => singleSongData.speechiness === +speechiness);
  }

   //get music from specific popularity
  if (popularity) {
    songs = songs.filter(singleSongData => singleSongData.popularity === +popularity);
  } 

  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      topMusicData: songs
    }
  });
});

app.get("/songs/:id", (request, response) => {
  const singleSong = topMusicData.find((song) => {
    return song.id === Number(request.params.id);
  });

  if (singleSong) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        song: singleSong
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log(singleSong)
});

// app.get("/songs/:id", (request, response) => {
//   const singleSong = request.params.id
//   const popMusic = request.query.genre
//   let topPopMusic = topMusicData.filter((item) => item.genre === +singleSong)

//   if (popMusic) {
//     topPopMusic = topPopMusic.filter((item) => item.genre)
//   }
//   response.status(200).json(topPopMusic);
// });



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
