import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'

//   PORT=9000 npm start
// process.env.PORT || 8080
const port = 3001
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
/* app.get('/', (req, res) => {
  res.send('Hello world')
}) */

// endpoint to get all tv-shows + query on director name + TODO: add status code in first res. if name of director is not found
// TODO: do something so that you don't have to spell everything super correct even if user types in lower case eg. 
app.get('/shows', (req, res) => {
  const director = req.query.director
  console.log(director)
  if (director) { 
    const tvShowList= netflixData.filter(show => show.director.includes(director))
    res.json(tvShowList)
  } else {
    res.json(netflixData)
  }
})

// Rename things ? - NOW it is a bit messy with this kind of param & query http://localhost:3001/countries/South Korea?southKorea=South Korea
// South Korean shows and films (remove films and filter only on tv-shows to continue this logic) **** this is thought for frontEnd logic appearance
app.get('/countries/:countries', (req, res) => {
  const countries = req.params.country

  const showSouthKorea = req.query.southKorea

  let tvShowsFromSouthKorea = netflixData.filter((show) => show.country === "South Korea")
  
  if (showSouthKorea) {
    res.json(tvShowsFromSouthKorea)
  } else {
    res.json(countries)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
