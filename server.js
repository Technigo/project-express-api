import express, { request } from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

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

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})


// Start defining your routes here
//endpoint to output movies by title, release year, cast and country
app.get('/movies', (req, res) => {
  const { title, year, cast, country} = req.query
  let moviesToSend = netflixData

  if (title) {
    moviesToSend = moviesToSend
      .filter(movie => movie.title.toString().toLowerCase().includes(title.toLowerCase()))
  } 

  if (year) {
    moviesToSend = moviesToSend
      .filter(movie => movie.release_year === +year)
  }

  if (cast) {
    moviesToSend = moviesToSend
      .filter(movie => movie.cast.toString().toLowerCase().includes(cast.toLowerCase()))
  }

  if (country) {
    moviesToSend = moviesToSend
      .filter(movie => movie.country.toString().toLowerCase() === country)
  }

  res.json(moviesToSend)
})

//endpoint to output possible types of movies
app.get('/movies/types', (req, res) => {
  const typesDuplicated = netflixData.map(item => item.type)

  const uniqueTypes = []
  typesDuplicated.forEach(item => {
    if (!uniqueTypes.includes(item)) {
      uniqueTypes.push(item)
    }
  })
  res.json(uniqueTypes)
})

//endpoint to get one specific movie by id
app.get('/movies/id/:id', (req, res) => {
  const { id } = req.params
  const movie = netflixData.find(movie => movie.show_id === +id)
  if (!movie) {
    res.status(404).send(`No movie with id number ${id}`)
  }
  res.json(movie)
})

app.get('/movies/dummy', (req, res) => {
  res.send('')
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
