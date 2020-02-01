import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// PORT SETUP
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example: PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// MIDDLEWARES 
// To enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// ROOT ENDPOINT
app.get('/', (req, res) => {
  res.send('API for Netflix shows, available endpoints: /shows, /:id, /types/:type, ?page=X for pagination')
})

// GET ALL DATA WITH PAGINATION OR FILTERED WITH TITLE IN QUERY
// req = request-object, res = result-object
app.get('/shows', (req, res) => {
  // For qeury page
  const page = req.query.page
  // For title search
  const titleSearchString = req.query.title
  // For type search
  const typeSearchString = req.query.type
  // All data
  let filteredShows = netflixData
  // Set 10 shows per page
  const PER_PAGE = 20

  if (page) {
    // Set start index to 10 * the page we type in endpoint
    const startIndex = PER_PAGE * +page
    // StartIndex and the upcoming shows updates when increasing page number in endpoint
    filteredShows = filteredShows.slice(startIndex, startIndex + PER_PAGE)
  }

  if (titleSearchString) {
    filteredShows = filteredShows.filter((item) => {
      const itemTitle = item.title.toString().toLowerCase() // toString since titles might be number
      return itemTitle.includes(titleSearchString)
    })
  }

  if (typeSearchString) {
    filteredShows = netflixData.filter((item) => item.type.toLowerCase().replace(' ', '-') === typeSearchString.toLowerCase())
  }

  // Return data and total pages of data
  res.json({
    totalPages: Math.floor(filteredShows.length / PER_PAGE),
    filteredShows
  })
})

// GET DATA FILTERED ON TYPE
// app.get('/shows/types/:type', (req, res) => {
//   const type = req.params.type
//   const page = req.query.page;
//   const PER_PAGE = 20
//   let filteredShows = netflixData

//   if (type) {
//     filteredShows = filteredShows.filter((item) => item.type.toLowerCase().replace(' ', '-') === type.toLowerCase())
//   }
//   if (page) {
//     const startIndex = PER_PAGE * +page
//     filteredShows = filteredShows.slice(startIndex, startIndex + PER_PAGE)
//   }
//   res.json({
//     totalPages: Math.floor(filteredShows.length / PER_PAGE),
//     filteredShows
//   })
// })

// GET A SPECIFIC SHOW
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
