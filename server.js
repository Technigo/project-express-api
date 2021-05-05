/* eslint-disable linebreak-style */
/* eslint-disable */

import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import netflixData from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// middlewares to enable cors and json parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
// endpoint to get list of endpoints
app.get('/', (request, response) => {
  response.send(listEndpoints(app))
})

// endpoint to get all movies
app.get('/movies', (request, response) => {
  response.json(netflixData)
})

// query parameters, filtering data
app.get('/movies/director', (request, response) => {

  const { director } = request.query
  const queriedMovies = netflixData.filter(movie => {
    return movie.director.toLowerCase().indexOf(director.toLowerCase()) !== -1
  }) 
  
  if (queriedMovies.length > 0) {
    response.json({ data: queriedMovies })
  } else {
    response.status(404).json({ error: 'Not found'})
  }
})

// endpoint to get one movie
app.get('/movies/:id', (request, response) => {
  const { id } = request.params
  const movie = netflixData.find( movie => movie.show_id === +id)
  
  if (movie) {
    response.json({ data: movie })
  } else {
    response.status(404).json({ error: 'Not found'})
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
