import express from 'express'
import cors from 'cors'

import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8081
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Filtered data set to only use TV Shows
const data = netflixData.filter((show) => show.type === "TV Show")

// root which lists all enpoints
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// endpoint to all shows + query parameters
app.get('/shows', (req, res) => {
  const { year, country } = req.query

  let showsToSend = data

  if (year) {
    showsToSend = showsToSend.filter((show) => show.release_year === +year)
    res.json(showsToSend)
  }

  if (country) {
    showsToSend = showsToSend.filter((show) => show.country === country)
    res.json(showsToSend)
  }

  res.json(showsToSend)
})

// endpoint to generate a random show from entire data set
app.get('/shows/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * data.length)
  const randomShow = data[randomIndex]
  res.json(randomShow)
})

// endpoint to get one certain show by ID
app.get('/shows/:id', (req, res) => {
  const { id } = req.params
  const show = data.find((show) => show.show_id === +id)

  if (show) {
    res.json({ data: show })
  } else {
    res.status(404).json({ message: `No show with id number ${id}!` })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
