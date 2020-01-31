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
  res.send('API for Netflix shows, available endpoints: /shows, /shows/:id, ?page= for pagination, ?type=movie, ?type=tv-show, ')
})

// GET ALL DATA WITH PAGINATION OR FILTERED WITH TYPE/TITLE IN QUERY PARAMETER
app.get('/shows', (req, res) => {
  // Variable for qeury parameter
  const page = req.query.page;
  const typesFilter = req.query.type
  const titleSearchString = req.query.title
  // Variable for all data
  let filteredShows = netflixData
  const PER_PAGE = 10

  if (page) {
    // Show 10 shows per page
    // Set start index to 10 * the page we type in endpoint
    const startIndex = PER_PAGE * +page
    // StartIndex and the upcoming shows updates when increasing page number in endpoint
    filteredShows = filteredShows.slice(startIndex, startIndex + PER_PAGE);
  }

  // If types query is applied in endpoint
  if (typesFilter) {
    filteredShows = filteredShows.filter((item) => item.type.toLowerCase().replace(' ', '-') === typesFilter.toLowerCase())
  }

  // If title query is applied in endpoint, toString since titles might be number
  if (titleSearchString) {
    filteredShows = filteredShows.filter((item) => {
      const itemTitle = item.title.toString().toLowerCase()
      return itemTitle.includes(titleSearchString)
    })
  }
  // Return data (filtered or not depending on endpoint used)
  res.json({
    totalPages: Math.floor(netflixData.length / PER_PAGE),
    filteredShows
  })
})

// GET A SPECIFIC SHOW
// Find() searches through child elements and returns the first matching child
app.get('/shows/:id', (req, res) => {
  const showId = req.params.id
  const show = netflixData.find((item) => item.show_id === +showId)
  if (show) {
    res.json(show)
  } else {
    res.status(404).send(`No show found with id: ${showId}`)
  }
})


// If your dataset is large, try implementing 'pages' using .slice() to return only a selection of results from the array. 
// You could then use a query parameter to allow the client to ask for the next 'page'.

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
