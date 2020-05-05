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

// ROUTES

// HOME
app.get('/', (req, res) => {
  res.send('What a time to be alive!')
})

// ALL OF THE NETFLIX CONTENT (IN THIS DATASET)
app.get('/content', (req, res) => {
  res.json(netflixData)
})

// ONLY THE MOVIES - THEN YOU CAN ADD THE YEAR IN THE URL QUERY
app.get('/movies', (req, res) => {
  //FILTERS TO JUST SHOW THE MOVIES
  let areMovies = netflixData.filter((item) => item.type === "Movie")
  
  //QUERY FOR THE YEAR
  const showYear = req.query.year
  
  if (showYear) {
    areMovies = areMovies.filter((item) => item.release_year === +showYear)
  }

  res.json(areMovies)
})

// FIND A SPECIFIC TITLE IN MOVIES
app.get('/movies/:movieTitle', (req, res) => {
  const areMovies = netflixData.filter((item) => item.type === "Movie")
  const movieTitle = req.params.movieTitle.toLowerCase()
 
  const movieData = areMovies.filter((item) => item.title.toString().toLowerCase() === movieTitle)
  
  res.json(movieData)
})

// ONLY THE TV-SHOWS - THEN YOU CAN ADD THE YEAR IN THE URL QUERY
app.get('/tv_shows', (req, res) => {
  //FILTERS TO JUST SHOW THE TV-SHOWS
  let areTVShows = netflixData.filter((item) => item.type === "TV Show")

  //QUERY FOR THE YEAR
  const showYear = req.query.year

  if (showYear) {
    areTVShows = areTVShows.filter((item) => item.type === +showYear)
  }
  res.json(areTVShows)
})

// FIND A SPECIFIC TITLE IN THE TV SHOWS
app.get('/tv_shows/:tvTitle', (req, res) => {
  const areTVShows = netflixData.filter((item) => item.type === "TV Show")
  const tvTitle = req.params.tvTitle.toLowerCase()
  
  const tvData = areTVShows.find((item) => item.title.toString().toLowerCase() === tvTitle)
  
  res.json(tvData)
})

// SEARCH FOR A SPECIFIC YEAR IN ALL THE CONTENT
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  
  const contentFromYear = netflixData.filter((item) => item.release_year === +year)

  res.json(contentFromYear)
})

// SEARCH FOR A SPECIFIC TITLE IN ALL THE CONTENT
app.get('/title/:title', (req, res) => {
  const title = req.params.title
  
  const showTitle = netflixData.find((item) => item.title === title)
  
  res.json(showTitle)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
