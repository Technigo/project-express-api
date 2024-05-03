import express from "express"
import cors from "cors"
import expressListEndpoints from "express-list-endpoints"
import netflixData from "./data/netflix-titles.json"

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json(endpoints)
})

// only movies
app.get("/movies", (req, res) => {
  const movies = netflixData.filter((item) => item.type === "Movie")
  res.json(movies)
})

//by release years
app.get("/movies/release-year", (req, res) => {
  const moviesByReleaseYear = {}
  netflixData.forEach((item) => {
    if (item.type === "Movie") {
      if (!moviesByReleaseYear[item.release_year]) {
        moviesByReleaseYear[item.release_year] = []
      }
      moviesByReleaseYear[item.release_year].push(item)
    }
  })
  res.json(moviesByReleaseYear)
})

// movies and tv shows by country
app.get("/country", (req, res) => {
  const mediaByCountry = {}
  netflixData.forEach((item) => {
    if (!mediaByCountry[item.country]) {
      mediaByCountry[item.country] = []
    }
    mediaByCountry[item.country].push(item)
  })
  res.json(mediaByCountry)
})

// movie or show based on id
app.get("/movies/:show_id", (req, res) => {
  const { show_id } = req.params
  const movie = netflixData.find(
    (item) => item.show_id.toString() === show_id && item.type === "Movie"
  )
  if (movie) {
    res.json(movie)
  } else {
    res.status(404).json({ message: "Movie not found" })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
