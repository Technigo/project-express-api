import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Filtered data set to only use TV Shows
const data = netflixData.filter((show) => show.type === "TV Show")

// endpoint to all shows + query parameters
app.get('/shows', (req, res) => {
  const { year, country } = req.query

  if (year && country) {
    const showsfromYearandCountry = data.filter((show) => show.release_year === +year && show.country === country)
    res.json(showsfromYearandCountry)
  }

  if (year) {
    const showsFromYear = data.filter((show) => show.release_year === +year)
    res.json(showsFromYear)
  }

  if (country) {
    const showsFromCountry = data.filter((show) => show.country === country)
    res.json(showsFromCountry)
  }

  res.json(data)
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

  if (!show) {
    res.status(404).send(`No show with id number ${id}!`)
  }
  res.json(show)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
