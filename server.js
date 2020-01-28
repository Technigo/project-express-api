import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(netflixData)
})


// Shows routes
app.get('/shows', (req, res) => {

  // Filter shows
  const shows = netflixData.filter((item) => item.type === "TV Show")

  // Send response
  res.json(shows)

})

app.get('/shows/:show', (req, res) => {
  const showId = req.params.show

  // Filter shows
  const show = netflixData.filter((item) => item.show_id === +showId && item.type === "TV Show")

  // Send response
  res.json(show)

})

app.get('/shows/seasons/:season', (req, res) => {
  const season = req.params.season

  const seasons = netflixData.filter((item) => {
    if (season === "1") {
      return item.duration === `${season} Season`
    } else {
      return item.duration === `${season} Seasons`
    }
  })

  res.json(seasons)
})

// Movies routes

app.get('/movies', (req, res) => {

  // Filter movies
  const movies = netflixData.filter((item) => item.type === "Movie")

  //Send response
  res.json(movies)
})

app.get('/movies/:movie', (req, res) => {
  const movieId = req.params.movie

  // Filter movies
  const movie = netflixData.filter((item) => item.show_id === +movieId && item.type === "Movie")

  // Send response
  res.json(movie)
})


// Countries route
app.get('/countries/:country', (req, res) => {
  const country = req.params.country

  const showCountry = netflixData.filter((item) => {
    const countries = item.country.split(',')

    return countries.includes(country)
  })

  res.json(showCountry)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
