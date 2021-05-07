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
// //return all movies 
// app.get('/movies', (request, response) => {
//   response.json(movies)
// })
// //return one single movie based on known ID
// app.get('/id/:id', (request, response) => {
//   const { id } = request.params 
//   const filteredMovies = movies
//     .find(movie => movie.show_id === +id
//   )
// filteredMovies ? response.json(filteredMovies) : response.status(404).send(`There is no movie with ID "${id}" in the system`)
// })
// // Return movie based on year of release
// app.get('/year/:year', (request, response) => {
//   const year = request.params.year
//   const releaseYear = movies.filter(
//     item => item.release_year === +year
//   )
//   releaseYear.length !== 0
//     ?  
//       response.json({ length: releaseYear.length, data: releaseYear}) //json vs send?
//     :  
//       response.send({ length: releaseYear.length, data: releaseYear})
// })
// //return type of movies available, filtered out to not show duplicates
// app.get('/type/type', (request, response) => {
//   const filterOutDuplicated = movies.map(item => item.type)
//   const movieType = []
//   filterOutDuplicated.forEach(item => {
//     if (!movieType.includes(item)) {
//       movieType.push(item)
//     }
//   })
//   response.json({ length: movieType.length , data: movieType })
// })

  app.get('/movies/info', (request, response) => {
    const { director, country } = request.query
    let data = movies

    if(director){
      data = movies
        .filter(item => item.director.toLowerCase().toString().includes(director.toLowerCase()))
    }
    if(country) {
      data = movies 
        .filter(item => item.country.toLowerCase().toString().includes(country.toLowerCase()))
    }
   response.json({ length: movies.length, data: movies})
  })


  // // //return titles based on query input 
  // app.get('/titles/titles', (request, response) => {
  //   const { title } = request.query
  //   // const movieTitle = request.query.title 
  //   const movieTitle = movies.filter((item => item.title.toString().toLowerCase().includes(title))) 
    
  //   movieTitle.length !== 0 
  //     ? 
  //       response.json({length: movieTitle.length, data: movieTitle})
  //     :
  //       response.status(404).send(`No movie with title "${title}" found`)
  // })
  
  // //return title 
  // app.get('/title/title', (request, response) => {
  //   const title = request.query.title
  //   if (title) {
  //     const filteredMovies = movies.filter(movie => movie.title.toString().includes(title))
  //     response.json(filteredMovies) 
  // }
  //   response.json(movies)
  // })
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
//Route for movie id
// app.get('/movies/:id', (request, response) => {
//   console.log(request.params) 
//   const { id } = request.params.id
//   const filteredMovies = movies.find(movie => movie.show_id === +id)
//   filteredMovies ? response.json(movie) : response.status(404).send(`There is no movie "${id}" in the system`)
// })

// app.get('/movies/director/:director', (request, response) => {
//   const director = request.params.director
//   if (director) {
//     const filteredMovies = movies.filter(director => movies.director.toLowerCase.toString().includes(director))
//     response.json(filteredMovies)
//   } else {
//     response.json(movies)
//   }
// })

// app.get('./movies/:releaseYear', (request, response) => {
//   //param for release year 
//   const releaseYear = request.params.release_year //does it have to have correct naming from json here?_
//   let fromReleaseYear = movies.filter((year) => year.release_year === +year)
//   releaseYear ? response.json(year) : response.status(404).send(`There are no movies released in year "${year}" found`)
//   response.json(fromReleaseYear)
// })


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
