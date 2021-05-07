import express from 'express'
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
// app.get('/movies/:title', (request, response) => {
//   const title = request.params
//   if (title) {
//     const filteredMovies = movies.filter(movie => movie.title.toLowerCase.toString().includes(title))
//     response.json(filteredMovies)
//   } else {
//     response.json(movies)
//   }
// }) 
  // const queriedMovie= movies.find(movie => movie.show_id === +id)
  // if (queriedMovie){
  //   response.json({ data: queriedMovie })
  // } else {
  //   response.status(404).send(`There is no movie "${id}" in the system`)
  // }
  // console.log(request.params)

  //return all movies 
  app.get('/movies', (request, response) => {
    response.json(movies)
  })
 //return one single movie based on known ID
  app.get('/id/:id', (request, response) => {
    const { id } = request.params //why in curly Bs?
    const filteredMovies = movies
      .find(movie => movie.id === +id
    )
    response.json(filteredMovies)
  })
// Return movie based on year of release
app.get('/year/:year', (request, response) => {
  const year = request.params.year
  const releaseYear = movies.filter(
    item => item.release_year === +year
  )
  releaseYear.length !== 0
    ?  
      response.json({ length: releaseYear.length, data: releaseYear}) 
    :  
      response.send({ length: releaseYear.length, data: releaseYear})
})

  app.get('/title/:title', (request, response) => {
    const title = request.params.title
    const movieTitle = request.query.title 
    let filteredMovieTitles = movies.filter((movie) => movie.title === title.includes(title))
    response.json(filteredMovieTitles)
  })
  


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
