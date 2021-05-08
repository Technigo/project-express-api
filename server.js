import express, { query } from 'express'
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
  const { director, title, genres, southkorea }  = req.query
  let queriedShows = netflixData

  if (director) {
    queriedShows = queriedShows.filter(show => show.director.toLowerCase().includes(director.toLowerCase()))
  }

  if (title) {
     queriedShows = queriedShows.filter((show) => show.title.toString().toLowerCase().includes(title.toLowerCase()))
  }

  if (genres) {
    const genresDuplicated = queriedShows.map(show => show.listed_in)
    let genresUnique = []
      genresDuplicated.forEach(show => {
        if (!genresUnique.includes(show)) {
          genresUnique.push(show)
        }
      })
  }

  if (southkorea) {
    queriedShows = queriedShows.filter((show) => show.country.toLowerCase() === "South Korea".toLowerCase()) //not sure one can do this on an actual string?
  }

  if (queriedShows.length === 0 ) { 
    res.status(404).json({ error: 'Not found' })
  } else {
    res.status(200).json({ length: queriedShows.length, data: queriedShows, genresUnique})
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
