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

//display the tv-shows and release-year
app.get('/tv-shows/:year', (req, res) => {

  const year = req.params.year
  let showSeries = netflixData.filter((item) => item.type === "TV Show" && item.release_year === +year)
  res.json(showSeries)
})

//using params, to search the tv-shows and movies
app.get('/netflix/:type', (req, res) => {
  const type = req.params.type
  let show = netflixData.filter((item) => item.type.toLowerCase() === type.toLowerCase())
  res.json(show)

})


app.get('/api/netflix', (req, res) => {
  // http://localhost:8080/api/netflix?type=movie&country=nigeria&year=2018

  let result = netflixData.filter((item) => item.type.toLowerCase() === req.query.type && item.country.toLowerCase() === req.query.country && item.release_year === +req.query.year)

  res.json(result)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
