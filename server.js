import express from 'express'
import cors from 'cors'

import netflixTitles from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hi! This is the root-endpoint for my Netflix API.')
})

// endpoint for all titles
app.get('/titles', (req, res) => {
  const { released, name } = req.query
  let titles = netflixTitles

  if (released) {
    titles = titles.filter(title => title.release_year === +released)
    res.json({ data: titles })
  }

  if (name) {
    titles = titles.filter(title => title.title.toString().toLowerCase() === name.toLowerCase())
    res.json({ data: titles})
  }

  res.json({ data: titles })
})

//endpoint for movies
app.get('/movies', (req, res) => {
  const movies = netflixTitles.filter((title) => title.type.toLowerCase() === 'movie')

  res.json({ data: movies })
})

//endpoint for tv shows
app.get('/tvshows', (req, res) => {
  const { seasons } = req.query
  let tvShows = netflixTitles.filter((title) => title.type.toLowerCase() === 'tv show')

  if (seasons) {
    tvShows = tvShows.filter((title) => title.duration.charAt(0) === seasons)
    res.json({ data: tvShows })
  } else {
    res.status(404).json({ error: 'Not found' })
  }

  res.json({ data: tvShows })
})

//param to get a single title
app.get('/titles/:id', (req, res) => {
  const { id } = req.params

  const titleId = netflixTitles.find((title) => title.show_id === +id)
  res.json({ data: titleId })
})



// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
