import express from "express";
import cors from "cors";
import data from "./data/top-movies.json";


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
const listEndpoints = require('express-list-endpoints')
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app))
//   const movies = data
//   if (movies) {
//   res.status(200).json({
//     success: true,
//     message: "OK",
//     body: {
//       data: movies
//     }
//   })
// } else {
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong",
//     body: {}
//   })
// }
});

app.get('/movies', (req, res) => {
  res.json(data)
})

app.get('/movies/year/:year', (req, res) => {
  const { year } = req.params
  const moviesFromYear = data.filter((item) => {
    return item.year === Number(year)
  })
  if (moviesFromYear) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
         year: moviesFromYear
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      body: {}
    })
  }
}) 

app.get('/movies/rank/:rank', (req, res) => {
  const { rank } = req.params
  const singleMovie = data.find((item) => {
    return item.rank === Number(rank)
  })
  if (singleMovie) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        rank: singleMovie
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Movie not found",
      body: {}
    })
  }
})

app.get('/movies/title/:title', (req, res) => {
  const { title } = req.params
  const movieTitle = data.find((item) => {
    return item.title.toLowerCase() === title.toLowerCase()
  })
  if (movieTitle) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        title: movieTitle
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Movie not found",
      body: {}
    })
  }
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieID = data.find((item) => {
    return item.movie_id.toLowerCase() === id.toLowerCase()
  })
  if (movieID) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        id: movieID
      }
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Movie not found",
      body: {}
    })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
