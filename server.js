import express from "express";
import cors from "cors";
// import games from './data/top-games.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json";
// import booksData from "./data/books.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require("express-list-endpoints");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
 // res.send("Hello Technigo!");

 res.json(listEndpoints(app))
});

// get all technigo members
/* app.get("/games", (req, res) => {
  const name = req.query.name;
  const summary = req.query.summary;
  
  const gameInfo = games;

    if (name) {
      gameInfo = gameInfo.splice((singleGame) => {
        return singleGame.name.toLowercase().includes(name.toLocaleLowerCase())
      })
    }

    if (summary) {
      gameInfo = gameInfo.splice((singleGame) => {
        return singleGame.summary.toLowercase().includes(summary.toLocaleLowerCase())
      })
    }

    if (gameInfo.length !== 0){
      res.status(200).json({
        success: true,
        message: "Games",
        body: {
           games: gameInfo
        }
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
        body: {}
      })
    }
 // const { role } = req.query;
 // console.log("id: ", id)
 // const singleMember = technigoMembers.find((member) => {
    // return member._id === Number(id)
    // return member._id.toString() === id
    // return member._id === +id;
  });
*/


  app.get("/songs", (req, res) => {
    const trackName = req.query.trackName;
    const artistName = req.query.artistName;
    
    const music = topMusicData;
  
      if (trackName) {
        topMusicData = topMusicData.filter((singleSong) => {
          return singleSong.trackName.toLowercase().includes(trackName.toLocaleLowerCase())
        })
      }
  
      if (artistName) {
        topMusicData = topMusicData.filter((singleSong) => {
          return singleSong.artistName.toLowercase().includes(artistName.toLocaleLowerCase())
        })
      }
  
      if (music.length !== 0){
        res.status(200).json({
          success: true,
          message: "Music loaded",
          body: {
             topMusicData: music
          }
        })
      } else {
        res.status(400).json({
          success: false,
          message: "Something went wrong!",
          body: {}
        })
      }
    });


    app.get("/songs/:id", (req, res) => {
      const { id } = req.params;
    
      const singleSong = topMusicData.find((song) => {
        return song.id.toString() === id; 
      })
      //We 
      if (singleSong) {
        res.status(200).json({
          success: true, 
          message: "Here's the track",
          body: { 
            song: singleSong
          }
        })
      } else {
        res.status(404).json({
          success: false,
          message: "Track not found!",
          body: {}
        })
      }
      
      })

app.get("/songs/genre/:genre", (req, res) => {
  const { genre } = req.params
  let genresSearch = topMusicData.filter(item => item.genre.toLowerCase().includes(genre.toLowerCase()))

  if (genresSearch.length) {
    res.status(200).json({
      success: true,
      message: "Genre",
      body: {
        genre: genresSearch
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'Genre not found',
      body: {}
    })
  }
})
/*
 // app.get("games/")
 /app.get("/games/:name", (req, res) => {
  const {name} = req.params
  const singleGame

    if (name) {
      gameInfo = gameInfo.splice((singleGame) => {
        return singleGame.name.toLowercase().includes(name.toLocaleLowerCase())
      })
    }

    if (summary) {
      gameInfo = gameInfo.splice((singleGame) => {
        return singleGame.summary.toLowercase().includes(summary.toLocaleLowerCase())
      })
    }

    if (gameInfo.length !== 0){
      res.status(200).json({
        success: true,
        message: "Games",
        body: {
           games: gameInfo
        }
      })
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
        body: {}
      })
    }
  })

 // app.get("/games/names", (req, res) => {
    
   // const { role } = req.query;
   // console.log("id: ", id)
   // const singleMember = technigoMembers.find((member) => {
     
  
      // return member._id === Number(id)
      // return member._id.toString() === id
      // return member._id === +id;

   // });
*/
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
