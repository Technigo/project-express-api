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
  res.send('Find Netflix data')
})

// Search the whole data base
app.get('/movies', (req, res) => {
  res.json(netflixData)
})

// Search on country and type Movie or TV Show
app.get('/country/:country', (req, res) => {
  const country = req.params.country
  const showType = req.query.type
  let movieFromCountry = netflixData.filter((item) => item.country === country)
  
  if (showType) {
    movieFromCountry = movieFromCountry.filter((item) => item.type ===  showType)
  }

  res.json(movieFromCountry)
})

// Query search on Titel always toLowerCase
app.get('/search', (req, res) => {
  const searchString = req.query.search

  let filteredShows = netflixData

  if (searchString) {
    filteredShows = filteredShows.filter(item => {
      console.log("in if")
      const itemTitle = item.title.toString()
      return itemTitle.toLowerCase().includes(searchString.toLowerCase())
    })
  }
  res.json(filteredShows)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
