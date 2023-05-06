import express from "express";
import cors from "cors";

// IMPORTING THE NETFLIX JSON DATA
import netflixData from "./data/netflix-titles.json";
import listEndpoints from "express-list-endpoints"

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
    Message: "Here you can browse movies and tv-shows from Netflix. Below you find the endpoints you can use 🍿 🎬 🥤",
    Routes: [
      {
        "/directory": "= all movies and tv-shows",
        "/directory/title/:title": "= a specific movie or tv-show, write the title of the movie/tv-show instead of :title",
        "/directory/year/:year": "= get the titles from a specific year",
        "/random": "= need inspiration for a new movie or tv-show to watch? Will give you a random title"

      }
    ],
  })
});
// LIST ENDPOINTS FOR THE ROUTES 
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
});

// ALL MOVIES
app.get("/directory", (req,res) => {
  res.status(200).json(netflixData)
});

// SPECIFIC MOVIE
app.get("/directory/title/:title", (req, res) => {
  const { title } = req.params;
  const directoryTitle = netflixData.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  if (!directoryTitle) {
    res.status(404).json({
      data: "ERROR: Sorry, can not find any movie or tv-show with that title 😭",
      success: false,
    });
  } else {
    res.status(200).json({
      data: directoryTitle,
      success: true,
    });
  }
});

// YEAR
app.get("/directory/year/:year", (req, res) => {
  const year = req.params.year
  const titlesFromYear = netflixData.filter((data) => data.release_year === +year)
  res.json(titlesFromYear)
});

// RANDOM
app.get("/random", (req,res) => {
  const randomMovie = netflixData[Math.floor(Math.random()* netflixData.length)]
  if(!randomMovie) {
    res.status(404).json({
      data: "ERROR: Sorry, can not find any random movie or tv-show 😭",
      success: false, 
    });
  } else {
    res.status(200).json({
      data: randomMovie,
      success: true,
    });
  }
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
