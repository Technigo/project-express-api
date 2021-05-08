import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())


// == Defining routes ==

// list all the endpoints (_ works like a placeholder for req)
app.get('/', (_, res) => {
  res.send(listEndpoints(app))
})

// ** Endpoint to get all the shows **

app.get('/shows', (req, res) => {
  const { title, cast, country, director } = req.query
  let shows = netflixData

  // Filters so the user can search for items in the endpoint
  if (title) {
    shows = shows.filter(show => show.title.toString().includes(title))
  }
  if (cast) {
    shows = shows.filter(show => show.cast.toString().includes(cast))
  }
  if (country) {
    shows = shows.filter(show => show.country.toString().includes(country))
  }
  if (director) {
    shows = shows.filter(show => show.director.toString().includes(director))
  }

  // Show an error message if the returning array is empty (no search result)
  if (shows.length === 0) {
    res.status(404).send('Not found')

  // Show all data
  } else {
    res.json(shows)
  }
})

// ** Endpoint to get only movies **

app.get('/movies', (req, res) => {
  let movies = netflixData.filter(show => show.type === "Movie")
  const { title, cast, country, director } = req.query

  // Filters so the user can search for items in the movies endpoint
  if (title) {
    movies = movies.filter(show => show.title.toString().includes(title))
  }
  if (cast) {
    movies = movies.filter(show => show.cast.toString().includes(cast))
  }
  if (country) {
    movies = movies.filter(show => show.country.toString().includes(country))
  }
  if (director) {
    movies = movies.filter(show => show.director.toString().includes(director))
  }

  // Show an error message if the returning array is empty (no search result)
  if (movies.length === 0) {
    res.status(404).send('Not found')

  // Show all data for the movies
  } else {
    res.json(movies)
  }
})

// ** Endpoint to get only TV-shows **

app.get('/tv-shows', (req, res) => {
  let tvShows = netflixData.filter(show => show.type === "TV Show")
  const { title, cast, country, director } = req.query

  // Filters so the user can search for items in the tv-shows endpoint
  if (title) {
    tvShows = tvShows.filter(show => show.title.toString().includes(title))
  }
  if (cast) {
    tvShows = tvShows.filter(show => show.cast.toString().includes(cast))
  }
  if (country) {
    tvShows = tvShows.filter(show => show.country.toString().includes(country))
  }
  if (director) {
    tvShows = tvShows.filter(show => show.director.toString().includes(director))
  }

  // Show an error message if the returning array is empty (no search result)
  if (tvShows.length === 0) {
    res.status(404).send('Not found')

  // Show all data for the movies
  } else {
    res.json(tvShows)
  }
})

// ** Endpoint to get only one show by title **

app.get('/shows/title/:title', (req, res) => {
  const { title } = req.params
  const showTitle = netflixData.find(show => show.title === title)

  if (!showTitle) {
    res.status(404).send(`No show with the title ${title} exists`)
  }
  res.json(showTitle)
})

// ** Endpoint to get only one show by id **

app.get('/shows/id/:id', (req, res) => {
  const { id } = req.params
  const show = netflixData.find(show => show.show_id === +id) 

  if (!show) {
    res.status(404).send(`No show with id number ${id} exists`)
  }
  res.json(show)
})


// == Start the server ==

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
