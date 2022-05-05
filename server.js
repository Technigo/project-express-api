import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import listEndpoints from 'express-list-endpoints'

import netflixDatas from './data/netflix-titles.json'
// console.log(netflixDatas)

// Defines the port the app will run on. Defaults to 8080, but can be overrtitleden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

//parseInt or number or + will converrt string to numbers

// Add mtitledlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})
// Geting my first request
app.get('/shows', (req, res) => {
  res.json(netflixDatas)
})

app.get('/shows/name/:title', (req, res) => {
  const { showTitle } = req.params
  const netflixTitle = netflixDatas.find(
    (netflixData) =>
      netflixData.showTitle.toLowerCase() === showTitle.toLowerCase(),
  )
  console.log('movies', netflixTitle)
  if (!netflixTitle) {
    res.status(404).json({
      data: 'Not found',
      success: false,
    })
  } else {
    res.status(200).json({
      data: netflixTitle,
      success: true,
    })
  }
})
// Filter on movies or tv shows
app.get('/shows/:type', (req, res) => {
  const { type } = req.params
  const showTypes = netflixDatas.filter(
    (netflixData) => netflixData.type.toLowerCase() === type.toLowerCase(),
  )
  if (!showTypes) {
    res.status(404).json({
      data: 'Not found',
      success: false,
    })
  } else {
    res.status(200).json({
      data: showTypes,
      success: true,
    })
  }
})
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const releaseYear = netflixDatas.filter((show) => show.release_year === +year)
  res.json(releaseYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
