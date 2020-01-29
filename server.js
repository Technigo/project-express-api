import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// PORT SETUP
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.send('API for Netflix shows')
})

// GET ALL DATA OR FILTERED WITH TYPE IN QUERY PARAMETER
app.get('/shows', (req, res) => {
  // Variable for qeury parameter
  const typesSearchString = req.query.types
  // Variable for all data
  let filteredShows = netflixData
  // If query is applied in endpoint, filter on that type
  if (typesSearchString) {
    filteredShows = netflixData.filter((item) => item.type.toLowerCase().replace(' ', '-') === typesSearchString.toLowerCase())
  }
  // Return data (filtered or not depending on endpoint used)
  res.json(filteredShows)
})

// SEARCH QUERY TO SEARCH FOR A SHOW TITLE?
// watch out for errors when searching for title in string or number

// GET A SPECIFIC SHOW
// Find() searches through child elements and returns the first matching child
// HOW TO USE THE STATUS CODE 404?
// For goal to return a single result:
// Search for title, put the result in an array and fetch the id's of them..?
app.get('/shows/:id', (req, res) => {
  const showId = req.params.id
  const show = netflixData.find((item) => item.show_id === +showId)
  if (show) {
    res.json(show)
  } else {
    res.send('Show not found')
  }
})


// If your dataset is large, try implementing 'pages' using .slice() to return only a selection of results from the array. 
// You could then use a query parameter to allow the client to ask for the next 'page'.

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
