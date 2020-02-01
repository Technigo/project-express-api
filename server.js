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
  res.send('API for Netflix shows, available endpoints: /shows, /:id, /types/:type, ?page=X for pagination')
})

// GET ALL DATA WITH PAGINATION OR FILTERED WITH TYPE/TITLE IN QUERY PARAMETER
app.get('/shows', (req, res) => {
  // Variable for qeury parameter
  const page = req.query.page
  // const typesFilter = req.query.type
  const titleSearchString = req.query.title
  // Variable for all data
  let showData = netflixData
  // Show 10 shows per page
  const PER_PAGE = 10

  if (page) {
    // Set start index to 10 * the page we type in endpoint
    const startIndex = PER_PAGE * +page
    // StartIndex and the upcoming shows updates when increasing page number in endpoint
    showData = showData.slice(startIndex, startIndex + PER_PAGE);
  }

  // If title query is applied in endpoint, toString since titles might be number
  if (titleSearchString) {
    showData = showData.filter((item) => {
      const itemTitle = item.title.toString().toLowerCase()
      return itemTitle.includes(titleSearchString)
    })
  }

  // Return data (filtered or not depending on endpoint used)
  res.json({
    totalPages: Math.floor(netflixData.length / PER_PAGE),
    showData
  })
})

// Change to params for type ?
app.get('/shows/types/:type', (req, res) => {
  const type = req.params.type
  const page = req.query.page;
  const PER_PAGE = 10
  let showData = netflixData

  if (type) {
    showData = showData.filter((item) => item.type.toLowerCase().replace(' ', '-') === type.toLowerCase())
  }

  if (page) {
    const startIndex = PER_PAGE * +page
    showData = showData.slice(startIndex, startIndex + PER_PAGE);
  }

  res.json({
    totalPages: Math.floor(netflixData.length / PER_PAGE),
    showData
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

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
