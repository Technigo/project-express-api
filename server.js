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
  const { released, name, country, category, rating } = req.query
  let titles = netflixTitles

  if (released) {
    titles = titles.filter(title => title.release_year === +released)
  }

  if (name) {
    titles = titles.filter(title => title.title.toString().toLowerCase().replace(/\s/g, '').includes(name.toLowerCase().replace(/\s/g, '')))
  }

  if (country) {
    titles = titles.filter(title => title.country.toLowerCase().replace(/\s/g, '').includes(country.toLowerCase().replace(/\s/g, '')))
  }

  if (category) {
    titles = titles.filter(title => title.listed_in.toLowerCase().replace(/\s/g, '').includes(category.toLowerCase().replace(/\s/g, '')))
  }

  if (rating) {
    titles = titles.filter(title => title.rating.toLowerCase().replace(/-/g, '').includes(rating.toLowerCase().replace(/-/g, '')))
  }

  res.json({ data: titles })
})


//Ann-sofis lösning funkar INTE
/* app.get('/titles', (req, res) => {
  const { released, name, country, category } = req.query
  

  if (!released && !name && !country && !category) {
    res.status(404).send({ error: 'error error' })
    return 
  }

  let titles = netflixTitles

  if (released) {
    titles = titles.filter(title => title.release_year === +released)
  }

  if (name) {
    titles = titles.filter(title => title.title.toString().toLowerCase().replace(/\s/g, '').includes(name.toLowerCase().replace(/\s/g, '')))
  }

  if (country) {
    titles = titles.filter(title => title.country.toLowerCase().replace(/\s/g, '').includes(country.toLowerCase().replace(/\s/g, '')))
  }

  if (category) {
    titles = titles.filter(title => title.listed_in.toLowerCase().replace(/\s/g, '').includes(category.toLowerCase().replace(/\s/g, '')))
  }

  if (netflixTitles.length) {
  res.json({ data: titles })
  } else {
    res.status(404).send({ error: 'error error error' })
  }
}) */

//OK
//endpoint for movies
app.get('/movies', (req, res) => {
  const movies = netflixTitles.filter((title) => title.type.toLowerCase() === 'movie')

  res.json({ data: movies })

})

//OK
//endpoint for tv shows + query seasons
app.get('/tvshows', (req, res) => {
  const { seasons } = req.query
  let tvShows = netflixTitles.filter((title) => title.type.toLowerCase() === 'tv show')

  if (seasons) {
    tvShows = tvShows.filter((title) => title.duration.charAt(0) === seasons)
  } else {
    res.json({ data: tvShows })
  }

  if (tvShows.length) {
    res.json({ data: tvShows })
  } else {
    res.status(404).send({ error: `No tv show with ${seasons} seasons found` })
  }
 
})

//OK
//param to get a single title
app.get('/titles/:id', (req, res) => {
  const { id } = req.params
  const titleId = netflixTitles.find((title) => title.show_id === +id)

  if (!titleId) {
    res.status(404).send({ error: `No title with id ${id} found` })
  } else {
  res.json({ data: titleId })
  }

})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
