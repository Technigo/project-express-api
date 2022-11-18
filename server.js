import express from "express";
import cors from "cors";
import data from "./data/netflix-titles.json"
import listEndpoints from "express-list-endpoints";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send({
    Message: "Here you can browse in Netflix movie and tv shows. Below you find the endpoints you can use. ",
    Routes: [
      {
        "/movies": "show all movies and tv shows",
        "/movies/title/:title": "Show a specifick title, write the name of the movie/tv show you want to see instead of :title",
        "/movies/type/:type": " shows only titles that is a movie or tv show, type  movie or tv show ",
        "/random-movie": "need inspiration for a new movie/tv show to watch? Will give you a random title"

      }
    ],
  })
});

// list endpoints for all routers that is created in this file. 
app.get("/endpoints", (req, res) => {
  res.send(listEndpoints(app))
})

// see all movies in the data file
app.get("/movies", (req,res) => {
  const { title, country, director, cast } = req.params; 
  let allMovies = data.slice(0, 200)
  if (title) {
    allMovies = allMovies.filter((movie) => movie.title.toLocaleLowerCase() === title.toLocaleLowerCase())
  }
  if (country) {
    allMovies = allMovies.filter((movie) => movie.country.toLocaleLowerCase().includes() === country.toLocaleLowerCase())
  }
  if (director) {
    allMovies = allMovies.filter((movie) => movie.director.toLocaleLowerCase().includes() === director.toLocaleLowerCase())
  }
  if (cast) {
    allMovies = allMovies.filter((movie) => movie.cast.toLocaleLowerCase().includes() === cast.toLocaleLowerCase())
  }
    res.status(200).json({
      data: allMovies,
      success: true,
    });
 console.log(allMovies)
})

// see specific movie title 
app.get("/movies/title/:title", (req, res) => {
  const { title } = req.params;
  const moviesByName = data.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  if (!moviesByName) {
    res.status(404).json({
      data: "Oh sorry, we cant find a movie with that name. ",
      success: false,
    });
  } else {
    res.status(200).json({
      data: moviesByName,
      success: true,
    });
  }
});

// make it more clear if you looking at movies or tvshow 
app.get("/movies/type/:type", (req, res) => {
  const { type } = req.params;
  
  const typeOfMovie = data.filter((item) => item.type.toLowerCase() === type.toLowerCase())
  if(!typeOfMovie) {
    res.status(404).json({
      data: "Not found",
      success: false, 
    })
  } else {
    res.status(200).json({
      data: typeOfMovie,
      success: true,
    })
  }
})

// random movie title
app.get("/random-movie", (req,res) => {
  const randomMovie = data[Math.floor(Math.random()* data.length)]
  if(!randomMovie) {
    res.status(404).json({
      data: "Opps, we couldnt find any random movie right now. Please try again.",
      success: false, 
    })
  } else {
    res.status(200).json({
      data: randomMovie,
      success: true,
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


