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
  res.send('<h1>Hello There!📡</h1>')
})

// display all the netflix data
app.get('/netflix', (req, res) => {
  res.json(netflixData)
})



app.get('/tv-shows', (req, res) => {
  let TvShows = netflixData.filter((item) => item.type === "TV Show")
  res.json(TvShows)
})

app.get('/movies', (req, res) => {
  let Movies = netflixData.filter((item) => item.type === "Movie")
  res.json(Movies)
})

//display the tv-shows and release-year
//http://localhost:8080/tv-shows/2015
app.get('/tv-shows/:year', (req, res) => {
  const year = req.params.year

  // Error handling - if year is not a number
  if (isNaN(Number(year))) {
    res.statusCode = 400
    res.send("Error, must send a year")
  }
  let TvShows = netflixData.filter((item) => item.type === "TV Show" &&
    item.release_year === +year)

  res.json(TvShows)
})

app.get('/movies/:year', (req, res) => {
  const year = req.params.year

  // Error handling - if year is not a number
  if (isNaN(Number(year))) {
    res.statusCode = 400
    res.send("Error, must send a year")
  }
  let Movies = netflixData.filter((item) => item.type === "Movie" &&
    item.release_year === +year)

  res.json(Movies)
})


// http://localhost:8080/api/netflix?country=nigeria&year=2018
app.get('/api/netflix', (req, res) => {

  let result = netflixData
  console.log(req.query.year)

  if (req.query.year != undefined) {
    result = result.filter((item) => item.release_year === Number(req.query.year))
  }

  if (req.query.country != undefined) {
    result = result.filter((item) => item.country.toLowerCase() === req.query.country.toLowerCase())
  }

  res.json(result)
})


//http://localhost:8080/year/2019?listed_in=Docuseries
app.get('/api/netflix/id/:id', (req, res) => {
  const id = req.params.id
  const result = netflixData.find((item) => item.show_id === +id)

  res.json(result)
});









// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})



