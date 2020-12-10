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

//Error message that is reused in every route
const ERROR_SHOWS_NOT_FOUND = { error: 'No results were found' }

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Netflix movies & TV shows')
})


// a) Shows the whole array of Netflix shows and movies
app.get('/shows', (req, res) => {
  res.json(netflixData)
})


// b) Shows a list of all the Netlix titles
app.get('/shows/titles', (req, res) => {
  res.json(netflixData.map(item => item.title))
})


// c) Shows all objects (movies and tv-shows) with the release date from a specific year
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


// d) shows one object with a specific id
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


// e) shows movies and shows from a specific country 
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


// f) Shows movies and tv-shows from a specified genre. If you search for e.g Comedies you will also get results where many different genres are listed for the same movie/show. It also works to write comedies (lowercase c) or even only part of a word like comed.
app.get('/shows/genre/:genre', (req, res) => {
  const genre = req.params.genre
  const showsGenre = netflixData.filter((item) => item.listed_in.toLowerCase().includes(genre.toLowerCase()))

  //shows error message if the specified word isn't included within a genre.
  if (showsGenre.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND)
  } else { 
    res.json(showsGenre)
  }
  })


// g) Similar to the one above but here you will only get the movies/shows which is defined with only one genre, for example Comedies(written exactly like that). If you write comedies (with lowercase c you will get an error message)
app.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre
  const movieGenre = netflixData.filter((item) => item.listed_in === genre)

//shows an error message if a genre doesn't exist or is misspelled. 
  if (movieGenre.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND)
  } else { 
    res.json(movieGenre)
}
})


// h) Here we can query a movie/show title. We can use the query method since several movies/shows can have the same name. We have to write like this in the browser: localhost:8080/shows/title?title=xxx
app.get('/shows/title', (req, res) => {
  const title  = req.query.title
  if (title) {
    const filteredTitle = netflixData.filter((item) => item.title === title)
    res.json(filteredTitle)
  } else {
    res.json(netflixData)
  }
})


 // i) Two params are used to return movies that are of the type "movie" and from a specified year.
app.get('/shows/:year/type/:type', (req, res) => {
  const { year, type } = req.params;
  const yearType = netflixData.filter((yearType) => {
    return +yearType.release_year === +year && yearType.type === type
  })
//error message that is displayed if one or two of the parameteras don't exist
  if (yearType.length === 0) {
    res.status(404).json(ERROR_SHOWS_NOT_FOUND)
  } else {
    res.json(yearType)
  } 
})

 // j) DUMMY ENDPOINT: Create some empty/dummy endpoints which could contain more complex operations in the future.  Find good names for them. (RED LEVEL)
 app.get('/shows/maxduration/:maxduration', (req, res) => {
//Suggestion:Here we could do a conditional that all movies with the maximum duration of 90 min should be shown. First filter out all movies and then use and if statement to show movies with a maximum of 90 min.
  res.json()
 })


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
