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

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  const movies = data
  if (movies) {
  res.status(200).json({
    success: true,
    message: "OK",
    body: {
      data: movies
    }
  })
} else {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    body: {}
  })
}
});

app.get('/movies', (req, res) => {
  res.json(data)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const movieFromYear = data.filter((item) => item.year === +year)
  if (year) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {movieFromYear}
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      body: {}
    })
  }
}) 

app.get('/rank/:rank', (req, res) => {
  const rank = req.params.rank
  const movieRank = data.find((item) => item.rank === +rank)

  res.json(movieRank)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
