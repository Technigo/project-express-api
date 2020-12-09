import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'
console.log (netflixData.length)
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const ERROR_SHOWS_NOT_FOUND = { error: 'No results were found' }

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//shows the whole array of Netflix shows and movies
app.get('/shows', (req, res) => {
  res.json(netflixData)
})

//Shows all objects with the release date of a specific year
app.get('/shows/year/:year', (req, res) => {
  const year = req.params.year
  const releaseYear = netflixData.filter((item) => item.release_year === +year)

 //this shows an error message if there are no movies or shows from a specific year
  if (releaseYear.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND)

  } else {
  res.json(releaseYear)
  }
})

//shows one object with a specific id
app.get('/shows/id/:id', (req, res) => {
  const id = req.params.id
  const netflixId = netflixData.find((item) => item.show_id === +id)

  //If the id is false then return an error message
  if (!netflixId) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND)

  } else {
    res.json(netflixId)
  }
})

//shows movies and shows from a specific country 
app.get('/shows/country/:country', (req, res) => {
  const country = req.params.country
  const netflixCountry = netflixData.filter((item) => item.country === country)

  //this shows an error message if there are no movies or shows from a specific country
  if (netflixCountry.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND)
  } else {
    res.json(netflixCountry)
  }
})

/* app.get('/shows/:year/countries', (req, res) => {
    const { year } = req.params
    const { country } = req.query

    let filteredShows = netflixData

    filteredShows = filteredShows.filter(
      (test) => +test.release_year === +year 
    )
    
    filteredShows = filteredShows.filter(
      (test) => test.country === country
    )
    res.json(filteredShows)
}) 
 */
/* app.get('/shows/:year/country/:country', (req, res) => {
  const { year, country } = req.params;
  const countryShows = netflixData.find(
    (countryShows) => +countryShows.year === +year && countryShows.country === +country)
    res.json(countryShows)
})
 */


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
