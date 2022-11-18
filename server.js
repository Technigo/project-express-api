import express from "express";
import cors from "cors";
import netflixData from "./data/netflix-titles.json";

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
  res.status(200).json({
    resMessage: "Netflix movies",
    endPointsArray: "/movies - Returns an array of all movies",
    endPointsArrayQuery: "/movies ? type, director, year",
    endPointsSingleItem: "/movies/id/:id - /movies/title/:title"
  });
});

app.get("/movies", (req, res) => {
  const { type, director, year } = req.query;
  let movies = netflixData;

  if (type) {
    movies = movies.filter(movie => movie.type.toLowerCase() === type.toLowerCase());
  }
  if (director) {
    movies = movies.filter(movie => movie.director.toLowerCase() === director.toLowerCase());
  }
  if (year) {
    movies = movies.filter(movie => +movie.release_year === +year);
  }

  res.status(200).json({
    success: true,
    message: "OK",
    response: {
      netflixData: movies
    }
  });
});

app.get("/movies/id/:id", (req, res) => {
  const singleMovie = netflixData.find((movie) => {
    return movie.show_id === +req.params.id;
  });
  if (singleMovie) {
    res.status(200).json({
      success: true,
      message: "OK",
      response: {
        singleMovie: singleMovie
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      response: {}
    });
  }
});

app.get("/movies/title/:title", (req, res) => {
  const singleMovie = netflixData.find((movie) => {
    return movie.title.toLowerCase() === req.params.title.toLowerCase();
  });
  if (singleMovie) {
    res.status(200).json({
      success: true,
      message: "OK",
      response: {
        singleMovie: singleMovie
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not Found",
      response: {}
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
