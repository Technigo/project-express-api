import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import titles from './data/netflix-titles.json'
// import songs from './data/top-music.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// get endpoint list
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// get all the titles
app.get('/titles', (req, res) => {
  res.json(titles)
})

// get title by id
app.get('/titles/id/:id', (req, res) => {
  const { id } = req.params
  const response = titles.find((title) => title.show_id === +id)
  res.status(200).json({ data: response })
})
// get the movies
app.get('/titles/movies', (req, res) => {
  const response = titles.filter((title) => title.type === 'Movie')
  res.status(200).json({ data: response })
})

// get the TV shows
app.get('/titles/tv-shows', (req, res) => {
  const response = titles.filter((title) => title.type === 'TV Show')
  res.status(200).json({ data: response })
})

// get titles for specific year
app.get('/titles/year/:year', (req, res) => {
  const { year } = req.params
  const response = titles.filter((title) => title.release_year === +year)
  if (response.length > 0) {
    res.status(200).json({ data: response })
  } else {
    res.status(200).send('No titles match this year')
  }
})

// search with any search term
app.get('/titles/search', (req, res) => {
  const { searchTerm } = req.query
  const response = titles.filter(
    (item) => item.description.toLowerCase().includes(searchTerm.toLowerCase()) 
      || item.title.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
      || item.cast.toLowerCase().includes(searchTerm.toLowerCase())
  )
  if (response.length > 0) {
    res.status(200).json({ data: response })
  } else {
    res.status(200).send('No titles match your search')
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
