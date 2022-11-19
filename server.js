import express from "express";
import cors from "cors";
import topMusicData from "./data/top-music.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// START PAGE
app.get("/", (req, res) => {
  res.json({responseMessage: "Hello Dance Music!"});
});

// ALL TRACKS - works
app.get("/tracks", (req, res) => {
  res.status(200).json({topMusicData})
});

// ALL TRACKS IN REVERSED ORDER - works
app.get("/tracks/reversed", (req, res) => {
  const topMusicDataReversed = topMusicData.reverse()
  res.status(200).json({topMusicDataReversed});
});

//TRACKS BY ID - works
app.get("/tracks/:id", (request, response) => {
  const singleTrack = topMusicData.find((track) => {
    return track.id === Number(request.params.id);
  });
  if(singleTrack) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        tracks: singleTrack
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log(singleTrack);
});

//TRACKS SEARCH BY BPM - works
app.get("/tracks/bpm/:bpm", (request, response) => {
  const singleTrack = topMusicData.find((track) => {
    return track.bpm === Number(request.params.bpm);
     });
  if(singleTrack) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        tracks: singleTrack
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "No tracks found with this BPM",
      body: {}
    });
  }
  console.log(singleTrack);
});

//OTHER TEST ROUTES WHICH DOES NOT WORK ATM ---------------------

// RANDOM TRACK - does not work!
app.get("/random-track", (req, res) => {
  const topMusicDataRandom = topMusicData[Math.floor(Math.random()* data.length)]
  if(!topMusicDataRandom) {
    res.status(404).json({
      data: "No random track found, please try again.",
      success: false, 
    })
  } else {
    res.status(200).json({
      data: topMusicDataRandom,
      success: true,
    })
  }
})

//DANCEABILITY : SORT FROM HIGHER TO LOWER RATE - does not work
app.get("/tracks/danceability/", (request, response) => {
  const singleTrack = topMusicData.find((track) => {
    return track.topMusicData.sort(
      (a, b) => b.danceability - a.danceability);
  });
  if(singleTrack) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        tracks: singleTrack
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "Not Found",
      body: {}
    });
  }
  console.log(singleTrack);
});

/*ALL TRACKS - This way also works
app.get("/tracks", (req, response) => {
  const { energy, danceability } = req.query;
  let tracks = topMusicData;
  response.status(200).json({
    success: true,
    message: "OK",
    body: {
      topMusicData: tracks
    }
  });
}); */