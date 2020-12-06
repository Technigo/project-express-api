import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello nerd')
})

// Endpoint showing all movies and handles query of release_year
app.get ('/movies', (req, res) => {
  let movies = netflixData.filter((item) => item.type === "Movie")
  const year = req.query.release_year
  
  if (year) {
    movies = movies.filter((item) => item.release_year === +year)

  }
  res.json(movies)
})
// Endpoint showing all tv shows and handles query of country
app.get ('/TvShows', (req, res) => {
  let tvShows = netflixData.filter((item) => item.type === "TV Show")
  const selectedCountry = req.query.country
  
  if (selectedCountry) {
    tvShows = tvShows.filter((item) => item.country.includes(selectedCountry))

  }
  res.json(tvShows)
})

// Endpoint showing netflix items by id
app.get ('/id/:id', (req, res) => {
  const id = req.params.id
  res.json(netflixData.filter((item) => item.show_id === +id))

})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
