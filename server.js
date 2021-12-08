import express from "express"
import cors from "cors"

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from "./data/netflix-titles.json"
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here

app.get("/", (req, res) => {
  res.send("This is the root-endpoint, like the homepage url")
})

app.get("/netflixtitles", (req, res) => {
  res.json(netflixData)
})

app.get("/year/:year", (req, res) => {
  const year = req.params.year
  let releaseYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releaseYear)
})

app.get("/tvshows", (req, res) => {
  const tvshows = netflixData.filter((item) => item.type === "TV Show")
  res.json(tvshows)
})

app.get("/movies", (req, res) => {
  const movies = netflixData.filter((item) => item.type === "Movie")
  res.json(movies)
})

app.get("/netflixtitles/:show_id", (req, res) => {
  const { show_id } = req.params

  const showId = netflixData.find((show) => show.show_id === +show_id)

  if (!showId) {
    res.status(404).send(" we couldn't find a show with that name")
  } else {
    res.json(showId)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
