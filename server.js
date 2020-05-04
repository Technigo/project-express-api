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
  res.send('What a time to be alive!')
})

app.get('/content', (req, res) => {
  res.json(netflixData)
})

app.get('/movies', (req, res) => {
  const areMovies = netflixData.filter((item) => item.type === "Movie")
  res.json(areMovies)
})


// Would like to only check the ids of the movies. Not filter through all the data
// app.get('/movies/:id', (req, res) => {
//   // const areMovies = netflixData.filter((item) => item.type === "Movie")
//   const id = req.params.id
//   const specificMovie = netflixData.filter((movie) => movie.show_id === +id)

//   specificMovie ? res.json(specificMovie) : res.send("No movie was found with that Id")
// })



app.get('/movies/:movieTitle', (req, res) => {
  const areMovies = netflixData.filter((item) => item.type === "Movie")
  const movieTitle = req.params.movieTitle.toLowerCase()
 
  const movieData = areMovies.filter((item) => item.title.toString().toLowerCase() === movieTitle)
  
  res.json(movieData)
})

// app.get('movies/:director', (req, res) => {
//   const director = req.query.
//   const byDirector = netflixData.filter((item) => item.director === {director})
//   console.log(byDirector)
// })

app.get('/tv_shows', (req, res) => {
  const areTVShows = netflixData.filter((item) => item.type === "TV Show")
  res.json(areTVShows)
})

app.get('/tv_shows/:tvTitle', (req, res) => {
  const areTVShows = netflixData.filter((item) => item.type === "TV Show")
  const tvTitle = req.params.tvTitle.toLowerCase()
  console.log(tvTitle)
  const tvData = areTVShows.find((item) => item.title === tvTitle)

  res.json(tvData)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  console.log(year)
  const contentFromYear = netflixData.filter((item) => item.release_year === +year)
  res.json(contentFromYear)
})


app.get('/title/:title', (req, res) => {
  const title = req.params.title
  console.log(title)
  const showTitle = netflixData.find((item) => item.title === title)
  console.log(showTitle)
  res.json(showTitle)
})


// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

// app.get('/nominations', (req, res) => {
//   res.json(goldenGlobesData)
// })

// app.get('/year/:year', (req, res) => {
//   const year = req.params.year
//   const showWon = req.query.win
//   let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

//   if (showWon) {
//     nominationsFromYear = nominationsFromYear.filter((item) => item.win)
//   }

//   res.json(nominationsFromYear)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
