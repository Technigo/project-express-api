import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixTitles from './data/netflix-titles.json'

const movies = netflixTitles.filter((titel) => titel.type === "Movie")
const tvShows = netflixTitles.filter((titel) => titel.type === "TV Show")

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Listing all endpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Listing all titles, no queries
app.get('/titels', (req, res) => {
  res.json({ titels: netflixTitles })
})

// Listing titles by id
app.get('/titels/:id', (req, res) => {
  const { id } = req.params
  const foundTitel = netflixTitles.find((titel) => titel.show_id === +id)
  if (id) {
    res.status(200).json({ show: foundTitel })
  } else {
    res.status(404).json({ status_message: "Not found" })
  }
})

app.get('/movies', (req, res) => {
  const { year } = req.query
  const { cast } = req.query
  const { director } = req.query
  const { country } = req.query

  let filteredMovies = movies

  if (year) {
    filteredMovies = filteredMovies.filter((movie) => movie.release_year === +year)
  }
  if (cast) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.cast.toLowerCase().includes(cast.toLowerCase())
    })
  }
  if (director) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.director.toLowerCase().includes(director.toLowerCase())
    })
  }
  if (country) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.country.toLowerCase().indexOf(country.toLowerCase()) !== -1
    })
  }
  res.json({ movies: filteredMovies })
})

app.get('/movies/:movieId', (req, res) => {
  const { movieId } = req.params
  const foundMovie = movies.find((titel) => titel.show_id === +movieId)
  if (movieId) {
    res.status(200).json({ show: foundMovie })
  } else {
    res.status(404).json({ status_message: "Not found" })
  }
})

app.get('/TV-shows', (req, res) => {
  const { year } = req.query
  const { cast } = req.query
  const { director } = req.query
  const { country } = req.query

  let filteredTVShows = tvShows

  if (year) {
    filteredTVShows = filteredTVShows.filter((show) => show.release_year === +year)
  }
  if (cast) {
    // eslint-disable-next-line max-len
    filteredTVShows = filteredTVShows.filter((show) => show.cast.toLowerCase().includes(cast.toLowerCase()))
  }

  if (director) {
    // eslint-disable-next-line max-len
    filteredTVShows = filteredTVShows.filter((show) => show.director.toLowerCase().includes(director.toLowerCase()))
  }
  if (country) {
    filteredTVShows = filteredTVShows.filter((show) => {
      return show.country.toLowerCase().indexOf(country.toLowerCase()) !== -1
    })
  }

  res.json({ titels: filteredTVShows })
})

app.get('/TV-shows/:showId', (req, res) => {
  const { showId } = req.params
  const foundShow = tvShows.find((titel) => titel.show_id === +showId)
  if (showId) {
    res.status(200).json({ show: foundShow })
  } else {
    res.status(404).json({ status_message: "Not found" })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
