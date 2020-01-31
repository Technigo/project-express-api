import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(netflixData)
})

// Shows routes
app.get('/shows', (req, res) => {
  const seasonsSearchString = req.query.seasons
  const countrySearchString = req.query.country

  const shows = netflixData.filter((item) => item.type === "TV Show")
  let filteredShows = shows

  if (seasonsSearchString) {
    filteredShows = shows.filter((show) => {
      // Replace all characters that are not digits from the duration string
      const showSeasons = show.duration.replace(/\D+/, '')

      return showSeasons === seasonsSearchString
    })
  }

  if (countrySearchString) {
    filteredShows = shows.filter((show) => {
      const showCountries = show.country.toLowerCase()
      const searchString = countrySearchString.toLowerCase()

      return showCountries.includes(searchString)
    })
  }

  res.json(filteredShows)
})

app.get('/shows/:show', (req, res) => {
  const showId = req.params.show

  const show = netflixData.filter((item) => item.show_id === +showId && item.type === "TV Show")

  if (show.length === 0) {
    return res.status(404).json({
      message: "Show not found"
    })
  }

  res.json(show)
})

// Movies routes

app.get('/movies', (req, res) => {
  const countrySearchString = req.query.country

  const movies = netflixData.filter((item) => item.type === "Movie")
  let filteredMovies = movies

  if (countrySearchString) {
    filteredMovies = movies.filter((movie) => {
      const movieCountries = movie.country.toLowerCase()
      const searchString = countrySearchString.toLowerCase()

      return movieCountries.includes(searchString)
    })
  }

  res.json(filteredMovies)
})

app.get('/movies/:movie', (req, res) => {
  const movieId = req.params.movie

  const movie = netflixData.filter((item) => item.show_id === +movieId && item.type === "Movie")

  if (movie.length === 0) {
    return res.status(404).json({
      message: "Movie not found"
    })
  }

  res.json(movie)

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})