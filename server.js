import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080
const app = express()

// Middlewares 
app.use(cors())
app.use(express.json())

// Route to return the entire json
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/titles', (req, res) => {
  const { title, director, releaseyear } = req.query
  let titles = netflixData

  if (title) {
    titles = titles
      .filter((item) => item.title.toString().toLowerCase().replace(/\s+/g, '') === title.toLowerCase().replace(/\s+/g, ''))
  }
  if (director) {
    titles = titles
      .filter((item) => item.director.toString().toLowerCase().replace(/\s+/g, '') === director.toLowerCase().replace(/\s+/g, ''))
  }
  if (releaseyear) {
    titles = titles
      .filter((item) => item.release_year === +releaseyear)
  }

  res.json({ length: titles.length, data: titles })
})

// Route to return a single movie/tvshow object, when request is an exact Url
app.get('/titles/:title', (req, res) => {
  const { title } = req.params
  const findShow = netflixData.find((show) => show.title.toString().toLowerCase().replace(/\s+/g, '') === title.toLowerCase().replace(/\s+/g, ''))
  
  if (findShow) {
    res.status(200).json({ data: findShow })
  } else {
    res.status(400).json({ error: 'Title not found, check your spelling or try another title' })
  }
})

// Route to search for titles from a certain country
app.get('/countries/:country', (req, res) => {
  const { country } = req.params

  const searchCountry = netflixData.filter((item) => {
    return item.country.toString().toLowerCase().replace(/\s+/g, '').indexOf(country.toLowerCase().replace(/\s+/g, '')) !== -1
  })
  res.json({ Country: searchCountry })
})
 
// Route to filter out all movies
app.get('/movies/:movie', (req, res) => {
  const { movie } = req.params

  const allMovies = netflixData
    .filter((item) => item.type.toString().toLowerCase() === movie.toString().toLowerCase())

  res.json(allMovies)
})

// Route to filter out all TV Series
app.get('/tvshows/:tvshow', (req, res) => {
  const { tvshow } = req.params

  const allTVshows = netflixData
    .filter((item) => item.type.toString().toLowerCase().replace(/\s+/g, '') === tvshow.toString().toLowerCase().replace(/\s+/g, ''))

  res.json(allTVshows)
})
 
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Hello, Server running on http://localhost:${port}`)
})
