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
  if (response) {
    res.json(response)
  } else {
    res.send(`Sorry, no title with id ${id}`)
  }
})
// get the movies
app.get('/titles/movies', (req, res) => {
  const movies = titles.filter((title) => title.type === 'Movie')
  res.json(movies)
})

// get the TV shows
app.get('/titles/tv-shows', (req, res) => {
  const tvShows = titles.filter((title) => title.type === 'TV Show')
  res.json(tvShows)
})

// get titles for specific year
app.get('/titles/year/:year', (req, res) => {
  const { year } = req.params
  const titlesByYear = titles.filter((title) => title.release_year === +year)
  res.json(titlesByYear)
})

// search with any search term
app.get('/titles/search', (req, res) => {
  const { searchTerm } = req.query
  // console.log('searchTerm ' + searchTerm)
  const searchResults = titles.filter(
    (item) => item.description.toLowerCase().includes(searchTerm.toLowerCase()) 
      || item.title.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
      || item.cast.toLowerCase().includes(searchTerm.toLowerCase())
  )
  res.json(searchResults)
})

// MUSIC
// List all genres
// app.get('/music/genres', (req, res) => {
//   let genres = songs.map((song) => song.genre)
//   let genresUnique = []
//   genres.forEach((item) => {
//     if (!genresUnique.includes(item)) {
//       genresUnique.push(item)
//     }
//   })
//   res.json(genresUnique)
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
