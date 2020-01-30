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

  let filteredShows = netflixData.filter((item) => item.type === "TV Show")

  if (seasonsSearchString) {
    filteredShows = netflixData.filter((item) => {

      // Replace all characters that are not digits from the duration string
      const showSeasons = item.duration.replace(/\D+/, '')

      return item.type === "TV Show" && showSeasons === seasonsSearchString

    })
  }

  if (countrySearchString) {
    filteredShows = netflixData.filter((item) => {

      const formattedCountry = item.country.toLowerCase()
      const formattedSearchString = countrySearchString.toLowerCase()

      return item.type === "TV Show" && formattedCountry.includes(formattedSearchString)

    })
  }

  res.json(filteredShows)

})

app.get('/shows/:show', (req, res) => {
  const showId = req.params.show

  const show = netflixData.filter((item) => item.show_id === +showId && item.type === "TV Show")

  res.json(show)

})

// Movies routes

app.get('/movies', (req, res) => {
  const countrySearchString = req.query.country

  let filteredMovies = netflixData.filter((item) => item.type === "Movie")

  if (countrySearchString) {
    filteredMovies = netflixData.filter((item) => {

      const formattedCountry = item.country.toLowerCase()
      const formattedSearchString = countrySearchString.toLowerCase()

      return item.type === "Movie" && formattedCountry.includes(formattedSearchString)

    })
  }

  res.json(filteredMovies)
})

app.get('/movies/:movie', (req, res) => {
  const movieId = req.params.movie

  const movie = netflixData.filter((item) => item.show_id === +movieId && item.type === "Movie")

  res.json(movie)

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
