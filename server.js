import express, { request, response } from "express";
import cors from "cors";
import musicData from "./data/top-music.json"




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
app.get("/", (request, response) => {
  // response.send("Welcome to Top music!!")
  response.json(listEndpoints(app))

})

// Route1 : creat a new route with collection of all music data
app.get("/music", (request, response) => {
  const music = musicData;
  if (music) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        musicData: music
      }
    })
  } else {
    response.status(500).json({
      success: false,
      message: "music not found",
      body: {}
    })
  }

})

//Route2 : get one item music from music data by input music ID.
app.get("/music/:id", (request, response) => {
  const { id } = request.params
  const singleMusic = musicData.find((music) => {
    // return music.id == id;
    // return music.id === Number(id);
    return music.id.toString() === id;

  });
  if (singleMusic) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        music: singleMusic
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "music not found",
      body: {}
    })
  }
})

//Route3 : creat a new endpoint with specific artist when input artistname
app.get("/music/artist/:artist", (request, response) => {
  const { artist } = request.params;
  let filteredMusic = musicData;

  if (artist) {
    filteredMusic  = musicData.filter((singleMusic) => {
      return singleMusic.artistName.toLowerCase() === artist.toLowerCase()
    });
  } 
  if (filteredMusic) {
    response.status(200).json({
      success: true,
      message: "OK",
      body: {
        musicData: filteredMusic 
      }
    })
  } else {
    response.status(500).json({
      success: false,
      message: "music not found",
      body: {}
    })
  }
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
