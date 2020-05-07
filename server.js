import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

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
  res.send(
    'Welcome! Wanna fetch some info about tv-shows and movies? Here some endpoints for you to use. http://localhost:8080/movies/ http://localhost:8080/movies/:title/ http://localhost:8080/movie/:year/'
  )
})

//Return all the data
app.get('/movies', (req, res) => {
  res.json(netflixData)
})

//Return a single movie/tv-show
app.get('/movies/:title', (req, res) => {
  const { title } = req.params
  let chosenMovie = netflixData.filter((item) => item.title.toString().toLowerCase() === title.toLowerCase())
  res.json(chosenMovie)
})

//Return all shows/movies from a chosen year
app.get('/movie/:year', (req, res) => {
  const { year } = req.params
  let showsFromYear = netflixData.filter((item) => item.release_year === +year)
  res.json(showsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
