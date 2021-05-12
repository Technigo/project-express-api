import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
}) 

app.get('shows', (req, res) => {
  res.json({ data: netflixData })
})

app.get('/shows/search', (req, res) => {
  const { director, title }  = req.query
  let queriedShows = netflixData

  if (director) {
    queriedShows = queriedShows.filter(show => show.director.toLowerCase().includes(director.toLowerCase()))
  }

  if (title) {
    queriedShows = queriedShows.filter((show) => show.title.toString().toLowerCase().includes(title.toLowerCase()))
  }

  if (queriedShows.length === 0 ) { 
    res.status(404).json({ error: 'Not found' })
  } else {
    res.status(200).json({ length: queriedShows.length, data: queriedShows})
  }
})

app.get('/shows/countries', (req, res) => {
  const { country } = req.query

  const queriedByCountry = netflixData.filter((show) => show.country.toLowerCase() === country.toLowerCase())
  
  if (queriedByCountry.length === 0 ) { 
    res.status(404).json({ error: 'Not found' })
  } else {
    res.status(200).json({ length: queriedByCountry.length, data: queriedByCountry })
  }
})

// endpoint to get one show based on id param
app.get('/shows/:id', (req, res) => {
  const { id }  = req.params
  const movieId = netflixData.find(movie => movie.show_id === +id)

  if (movieId) {
    res.status(200).json({ data: movieId });
  } else {
    res.status(404).json({ error: 'This movie can not be found' });
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
