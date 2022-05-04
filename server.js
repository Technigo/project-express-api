import express from 'express'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const divideTitles = (titlesArray, pageNumber) => {
  titlesArray = titlesArray.slice(pageNumber * 10, (pageNumber + 1) * 10)
  return titlesArray
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/titles', (req, res) => {
  const { year, type, director, cast, country, page = 0 } = req.query
  let queriedTitles = netflixData

  if (year) {
    queriedTitles = queriedTitles.filter(
      (title) => title.release_year === +year
    )
  }
  if (type) {
    queriedTitles = queriedTitles.filter(
      (title) => title.type.toLowerCase() === type.toLowerCase()
    )
  }
  if (director) {
    queriedTitles = queriedTitles.filter((title) =>
      title.director.toLowerCase().includes(director.toLowerCase())
    )
  }
  if (cast) {
    queriedTitles = queriedTitles.filter((title) =>
      title.cast.toLowerCase().includes(cast.toLowerCase())
    )
  }
  if (country) {
    queriedTitles = queriedTitles.filter((title) =>
      title.country.toLowerCase().includes(country.toLowerCase())
    )
  }

  queriedTitles
    ? res.status(200).json({ data: divideTitles(queriedTitles, +page) })
    : res.status(404).json({ error: 'Not found' })
})

app.get('/titles/:id', (req, res) => {
  const { id } = req.params

  const queriedTitle = netflixData.find((title) => title.show_id === +id)
  queriedTitle
    ? res.status(200).json({ data: queriedTitle })
    : res.status(404).json({ error: 'Not found' })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
