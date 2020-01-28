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

// GET ALL DATA
app.get('/shows', (req, res) => {
  res.send(netflixData)
})

// GET A SPECIFIC SHOW
// Find() searches through child elements (children of shows?)
// HOW TO USE THE STATUS CODE 404?
app.get('/shows/:id', (req, res) => {
  const id = req.params.id
  const showId = netflixData.find((item) => item.show_id === +id)
  if (showId) {
    res.json(showId)
  } else {
    res.send('Show not found')
  }
})

// GET RELEASE YEAR 
app.get('/years/:year', (req, res) => {
  const year = req.params.year
  console.log({ year })
  let releaseYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releaseYear)
  console.log(releaseYear.length)
})

// GET TYPE OF SHOW (TV SHOW | MOVIE)
// app.get('/types/:type', (req, res) => {
//   // Variable to get data from selected type (for the route placeholder :type)
//   const type = req.params.type
//   console.log({ type })
//   // Variable to filter out selcted type
//   let typeOfShow = netflixData.filter((item) => item.type === type)
//   // Return the filtered type
//   res.json(typeOfShow)
// })

// GET GENRES
// Create array for listed_in values?
// Map the listed_in array?
// app.get('/genres/:genre', (req, res) => {
//   const genre = req.params.genre
//   const showGenre = netflixData.filter((item) => item.listed_in === genre)
//   res.json(showGenre)
// })

// START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
