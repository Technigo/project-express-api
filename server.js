import express, { request } from 'express'
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
//   PORT=9000 npm start
const port = process.env.PORT || 9000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
//endpoint to get all movies
app.get('/movies', (req, res) => {
  const { title } = req.query
  if (title) {
    const filteredMovies = netflixData.filter(movie => movie.title.includes(title))
    res.json(filteredMovies) 
}
  res.json(netflixData)
})

//endpoint to get one specific movie
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  const movie = netflixData.find(movie => movie.show_id === +id)
  if (!movie) {
    res.status(404).send(`No movie with id number ${id}`)
  }
  res.json(movie)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
