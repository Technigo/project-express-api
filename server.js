import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import listEndpoints from 'express-list-endpoints'

import movies from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// Middleware 
app.use(cors())
app.use(bodyParser.json()),

// Start route
app.get('/', (request, response) => {
  response.send(listEndpoints(app))
})
// return all movies 
app.get('/movies', (request, response) => {
  response.json(movies)
})
//return one single movie based on known ID
app.get('/id/:id', (request, response) => {
  const { id } = request.params 
  const filteredMovies = movies
    .find(movie => movie.show_id === +id
  )
filteredMovies ? response.json(filteredMovies) : response.status(404).send(`There is no movie with ID "${id}" in the system`)
})
//return movie based on year of release
app.get('/year/:year', (request, response) => {
  const year = request.params.year
  const releaseYear = movies.filter(
    item => item.release_year === +year
  )
  releaseYear.length !== 0
    ?  
      response.json({ length: releaseYear.length, data: releaseYear}) //json vs send?
    :  
      response.send({ length: releaseYear.length, data: releaseYear})
})
//return type of movies, filtered out to not show duplicates
app.get('/type/type', (request, response) => {
  const filterOutDuplicated = movies.map(item => item.type)
  const movieType = []
  filterOutDuplicated.forEach(item => {
    if (!movieType.includes(item)) {
      movieType.push(item)
    }
  })
  response.json({ length: movieType.length , data: movieType })
})
//return movie based on director, country or title
app.get('/movies/info/', (request, response) => {
  const { director, country, title } = request.query
  let data = movies

  if(director){
    data = data
      .filter(item => item.director.toLowerCase().includes(director.toLowerCase()))
  }
  if(country) {
    data = data 
      .filter(item => item.country.toLowerCase().includes(country.toLowerCase()))
  }
  if(title){
    data = data
      .filter(item => item.title.toString().toLowerCase().includes(title.toLowerCase()))
  }
  response.json({ length: data.length, data: data})
})
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
