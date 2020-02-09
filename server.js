import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// PORT SETUP
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// MIDDLEWARES 
// To enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.send('API for Netflix shows, available endpoints: /shows -> /:id, /movies, /tv-shows, ?title=X for search and ?page=X for pagination')
})

// GET ALL DATA WITH PAGINATION OR FILTERED WITH TITLE IN QUERY
// req = request-object, res = result-object
app.get('/shows', (req, res) => {
  const page = req.query.page
  const titleSearchString = req.query.title
  let filteredShows = netflixData
  const PER_PAGE = 20 // Sets 20 shows per page
  const startIndex = PER_PAGE * +page

  if (titleSearchString) {
    filteredShows = filteredShows.filter((item) => {
      const itemTitle = item.title.toString().toLowerCase() // toString since titles might be number
      return itemTitle.includes(titleSearchString.toLowerCase())
    })
  }

  if (page) {
    // StartIndex and the upcoming shows updates when increasing page number in endpoint
    filteredShows = filteredShows.slice(startIndex, startIndex + PER_PAGE)
  }

  // Return data and total pages of data
  res.json({
    totalPages: Math.floor(netflixData.length / PER_PAGE),
    filteredPages: Math.floor(netflixData.length / PER_PAGE),
    filteredShows
  })
})

// GET DATA FROM TYPE MOVIE
app.get('/shows/movies', (req, res) => {
  const page = req.query.page;
  const PER_PAGE = 20
  const movies = netflixData.filter((item) => item.type === "Movie")
  let filteredShows = movies

  if (page) {
    const startIndex = PER_PAGE * +page
    filteredShows = movies.slice(startIndex, startIndex + PER_PAGE)
  }
  res.json({
    totalPages: Math.floor(netflixData.length / PER_PAGE),
    filteredPages: Math.floor(movies.length / PER_PAGE),
    filteredShows
  })
})

// GET DATA FROM TYPE TV SHOW
app.get('/shows/tv-shows', (req, res) => {
  const page = req.query.page;
  const PER_PAGE = 20
  const tvShows = netflixData.filter((item) => item.type === "TV Show")
  let filteredShows = tvShows

  if (page) {
    const startIndex = PER_PAGE * +page
    filteredShows = tvShows.slice(startIndex, startIndex + PER_PAGE)
  }
  res.json({
    totalPages: Math.floor(netflixData.length / PER_PAGE),
    filteredPages: Math.floor(tvShows.length / PER_PAGE),
    filteredShows
  })
})

// GET A SPECIFIC SHOW
app.get('/shows/:id', (req, res) => {
  const showId = req.params.id
  const show = netflixData.find((item) => item.show_id === +showId)
  if (show) {
    res.json(show)
  } else {
    res.status(404).send(`No show found with id: ${showId}`)
  }
})

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
