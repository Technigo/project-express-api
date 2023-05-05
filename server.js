import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";


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
  const navigation = {
    guide: "Routes for movies API",
    Endpoints: [
      {
        "/movies": "Display all movies",
        "/movies/title/:title": "Search for a title movie",
      },
    ],
  };
  res.send(navigation)
});

// Route to see all available endpoints
app.get("/endpoints", (req, res) => {
 res.send(listEndpoints(app))
 });

// get all netflix data
app.get("/movies", (request, response) => {
  const { title } = request.query;
  let movies = netflixData;
  if (title) {
    movies = movies.filter((singleMovie) => {
      return singleMovie.title.toLowerCase() == title.toLowerCase();
    })
  }
  response.status(200).json({
    data: netflixData,
    success: true,
  });
})


app.get("/movies/search", (request, response) => {
  const { title, release_year } = request.query;
  let filteredMovies = netflixData;
  if (title) {
    filteredMovies = filteredMovies.filter((singleMovie) => {
      return singleMovie.title.toLowerCase === (title.toLowerCase());
    });
  }
  if (release_year) {
    filteredMovies = filteredMovies.filter((singleMovie) => {
      return singleMovie.release_year === release_year;
    });
  }
  if (filteredMovies.length > 0) {
    response.status(200).json({
      success: true,
      message: "OK",
      data: filteredMovies,
    });
  } else {
    response.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});


// get titles from netflixdata
app.get("/movies/:title", (request, response) => {
  const { title } = request.params;
  const singleTitle = netflixData.find((movie) => {
    return movie.title.toLowerCase() == title.toLowerCase();
  });
  if (singleTitle) {
    response.status(200).json({
      success:true,
      message:"OK",
      body: {
        movie: singleTitle
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "title not found",
      body: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
