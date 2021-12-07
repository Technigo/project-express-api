import express from 'express'
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
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining routes here
app.get('/', (req, res) => {
  res.send('Welcome to my API. You can find some selected Netlify-data here')
})

// route provides a sorted list of all countries that are in netflixData
app.get('/countries', (req, res) => {
  const countries = Array.from(new Set(netflixData.map(item => item.country))).sort()
  res.json(countries)
})

// route with all movies from the provided country
app.get('/countries/:country', (req, res) => {
  const { country } = req.params
  const contentByCountry = netflixData.filter((item => item.country.toLowerCase() === country))

  if (!contentByCountry) {
    res.status(404).send('Sorry, but there is no content for this country')
  } else {
    res.json(contentByCountry)
  } 
})

// route provides all movies
app.get('/movies', (req, res) => {
  const movies = netflixData.filter(item => item.type === "Movie")
  res.json(movies)
})

// route provides one movie
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = netflixData.find(item => item.show_id === +id)

  if (!movie) {
    res.status(404).send('No movie found, that matches this ID')
  } else {
    res.json(movie)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
