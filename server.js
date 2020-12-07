import express from 'express'
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
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


/**
 * @api {get} /  Request all Netflix items
 * @apiName GetNetflixItems
 * @apiGroup Netflix
 *
 * @apiParam none
 *
 * @apiSuccess {String} Netflix Movie and Tv show API .
 *
 */
app.get('/', (req, res) => {

  res.send('Netflix Movie and Tv show API ')
})

app.get('/v1/netflixItems', (req, res) => {
  const page = req.query.page ?? 0
  const pageSize = req.query.pageSize ?? 20

  //Calculate the start index
  const startIndex = page * pageSize

  //Calculate the end index
  const endIndex = startIndex + +pageSize
  const netflixItemsPerPage= netflixData.slice(startIndex, endIndex)
  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(netflixData.length/ pageSize),
    numItems: netflixItemsPerPage.length,
    results: netflixItemsPerPage,
  } 
  res.send(returnObject)

})

/**
 * @api {get} /v1/movies Request all movies
 * @apiName GetMovies
 * @apiGroup Netflix
 *
 * @apiParam {Number} type Type for Movies are Movie
 *
 * @apiSuccess {String} show_id Id of the Movie
 * @apiSuccess {String} title Title of the Movie
 * @apiSuccess {String} director Name of the director of the Movie
 * @apiSuccess {String} cast Cast of the Movie
 * @apiSuccess {String} country Country where the the Movie is created.
 * @apiSuccess {String} date_added Date when the Movie was added.
 *
 */
app.get ('/v1/movies', (req, res) => {
  let movies = netflixData.filter((item) => item.type === "Movie")
  const year = req.query.release_year

  if (year) {
    movies = movies.filter((item) => item.release_year === +year)

  }
  res.json(movies)
})

// Endpoint showing all tv shows and handles query of country
app.get ('/v1/TvShows', (req, res) => {
  let tvShows = netflixData.filter((item) => item.type === "TV Show")
  const selectedCountry = req.query.country
  
  if (selectedCountry) {
    tvShows = tvShows.filter((item) => item.country.includes(selectedCountry))

  }
  res.json(tvShows)
})

// Endpoint showing netflix items by id
app.get ('/v1/id/:id', (req, res) => {
  const id = req.params.id
  let idList = netflixData.filter((item) => item.show_id === +id)
  // If id is not returing an item
  if (idList.length === 0) { 
    idList="No item with that id found"
  }

  res.json(idList)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
