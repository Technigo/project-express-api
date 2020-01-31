import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

console.log(netflixData.length)
// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
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
  res.send('Hello world hej hej')
})

// app.get('/types', (req, res) => {
//   res.json(netflixData)
// })

// router  to finding specific year //
//http://localhost:8080/year/2019

// app.get('/year/:year', (req, res) => {
//   const year = req.params.year
//   const showCountry = req.query.country
//   console.log('showCountry')
//   let releasesFromYear = netflixData.filter((item) => item.release_year === +year)
// res.json(releasesFromYear)

//   if (showCountry) {
//     releasesFromYear = releasesFromYear.filter((item) => item.country)
//   }
//   res.json(releasesFromYear)
// })

// The Crossfit example: const show = athletesData.filter(item => +item.competitorid === +showId)
// due to that everything in that API was a string.

// path variable/path parameter
// shows one specific id // http://localhost:8080/shows/80115338
app.get('/shows/:id', (req, res) => {
  const showId = req.params.id
  const show = netflixData.filter(item => item.show_id === +showId)
  console.log("id path parameter")
  res.json(show)
})

// Filter based on title AND/OR country 
app.get('/shows', (req, res) => {
  // Query parameter
  const titleSearchString = req.query.title
  const countrySearchString = req.query.country

  let filteredShows = netflixData;

  if (titleSearchString) {
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString()
      return itemTitle.includes(titleSearchString)
    })
  }

  if (countrySearchString) {
    filteredShows = filteredShows.filter(item => {
      const itemCountry = item.country.toString()
      return itemCountry.includes(countrySearchString)
    })
  }

  res.json(filteredShows);
})
//  THIS ID WORKS: http://localhost:8080/shows/80141270 (BONUS FAM/SWEDEN)
// THESE TITLES WORKS: http://localhost:8080/shows?title=Orange
//  http://localhost:8080/shows?title=Little

// THESE COUNTRIES WORK: http://localhost:8080/shows?country=Sweden
// http://localhost:8080/shows?country=Denmark


//  res.json(show)
//   return showId
// })

//http://localhost:8080/country/Sweden
// app.get('/country/:country', (req, res) => {
//   const country = req.params.country
//   const fromCountry = netflixData.filter((item) => item.country === country)
//   res.json(fromCountry)
// })

//Filter based on title OR Country or decription
app.get('/shows', (req, res) => {
  //query parameter 
  const searchString = req.query.search

  let filteredShows = netflixData

  if (searchString) {
    // Filter once on multiple fields
    filteredShows = filteredShows.filter(item => {
      const itemTitle = item.title.toString()
      const itemCountry = item.country.toString()
      const itemDescription = item.description.toString()

      return itemTitle.includes(searchString) ||
        itemCountry.includes(searchString) ||
        itemDescription.includes(searchString)
    })
  }
  res.json(filteredShows);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
