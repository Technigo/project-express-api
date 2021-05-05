import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixTitles from './data/netflix-titles.json'

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

  const movies = netflixTitles.filter((titel) => titel.type === "Movie")
  let filteredMovies = movies

  if (year) {
    filteredMovies = filteredMovies.filter((movie) => movie.release_year === +year)
  }
  if (cast) {
    filteredMovies = filteredMovies.filter((movie) => {
      return movie.cast.toLowerCase().includes(cast.toLowerCase())
    })
  }
  res.json({ movies: filteredMovies })
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
