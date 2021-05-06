import express, { response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import listEndpoints from 'express-list-endpoints'

import movies from './data/netflix-titles.json'

const port = process.env.PORT || 8080
const app = express()

// Middlewares 
app.use(cors())
app.use(bodyParser.json()),

// Start route
app.get('/', (request, response) => {
  response.send(listEndpoints(app))
})

// app.get('/movies', (request, response) => {
//  const { title } = request.query

//  const queriedMovies = movie.filter(movie => {
//    return movie.title.toLowerCase().indexOf(movie.toLowerCase() !== -1)
//  })
 
//   response.json( data: queriedMovies )
// })

app.get('/movies/:id', (request, response) => {
  const { id } = request.params
  if (title) {
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase.toString().includes(title))
    response.json(filteredMovies)
  } else {
    response.json(movies)
  }

  const queriedMovie= movies.find(movie => movie.show_id === +id)
  if (queriedMovie){
    response.json({ data: queriedMovie })
  } else {
    response.status(404).send(`There is no movie "${id}" in the system`)
  }
  console.log(request.params)
})

// app.get('/movies/:show_id', (request, response) => {
//   console.log(request.params)
//   const { show_id } = request.params
//   const movie = movies.find(movie => movie.show_id === +show_id )
//   // if(!movie){
//   //   error message
//   // }
//   response.json(movie)
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
