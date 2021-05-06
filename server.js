import express, { response } from 'express'
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
// Route for movie title 
app.get('/movies/:title', (request, response) => {
  const title = request.params
  if (title) {
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase.toString().includes(title))
    response.json(filteredMovies)
  } else {
    response.json(movies)
  }
}) 
  // const queriedMovie= movies.find(movie => movie.show_id === +id)
  // if (queriedMovie){
  //   response.json({ data: queriedMovie })
  // } else {
  //   response.status(404).send(`There is no movie "${id}" in the system`)
  // }
  // console.log(request.params)

// Route for movie id
app.get('/movies/:id', (request, response) => {
  const { id } = request.params.id
  const filteredMovies = movies.find(movie => movie.show_id === +id)
  filteredMovies ? response.json(movie) : response.status(404).send(`There is no movie "${id}" in the system`)
})

// app.get('/movies/:director', (request, response) => {
//   const director = request.params.director
//   if (director) {
//     const filteredMovies = movies.filter(director => movie.director.toLowerCase.toString().includes(director))
//     response.json(filteredMovies)
//   } else {
//     response.json(movies)
//   }
// })

app.get('./movies/:release_year', (request, response) => {
  const releaseYear = reuqest.params.release_year
  let fromReleaseYear = movies.filter((year) => year.release_year === +year)
  releaseYear ? response.json(year) : response.status(404).send(`There are no movies released in year "${year}" found`)
  response.json(fromReleaseYear)
})

//release_year

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
