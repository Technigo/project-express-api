import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

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
  res.send('Hello world')
})

//show all data on all shows
app.get('/shows', (req, res) => {
  res.json(netflixData)
})
//show list of all titles
app.get('/titles', (req, res) => {
  const listTitles = netflixData.map((titles) => titles.title)
  res.json(listTitles)
})

//show all data on one specific title
app.get('/titles/:title', (req, res) => {
  const title = req.params.title
  console.log({ title })
  const showName = netflixData.filter((name) => name.title === title)
  res.json(showName)
})

//filter on release year
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  console.log({ year })
  const releaseYear = netflixData.filter((item) => item.release_year === +year )
  res.json(releaseYear)
})

//filter on country
app.get('/countries/:country', (req, res) => {
  const country =req.params.country
  const countryOfOrigin = netflixData.filter ((place) => place.country === country)
  res.json(countryOfOrigin)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
