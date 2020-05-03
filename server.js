import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const path = require('path')
import netflixData from './data/netflix-titles.json'
import { filterMoviesOnYear, filterMoviesByCountry, filterMoviesByActor, mappedNetflix } from './filters'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/shows', (request, response) => {
  const actor = request.query.cast //?cast=Yoon Kye-sang
  const releaseYear = request.query.year //?year=2019
  const country = request.query.country //?country=South Korea
  let movieList = netflixData;

  movieList = filterMoviesOnYear(releaseYear, movieList);
  movieList = filterMoviesByCountry(country, movieList);
  movieList = filterMoviesByActor(actor, movieList);
    
  response.json(mappedNetflix(movieList))
  
})

app.get('/shows/:id', (request, response) => {
  const id = request.params.id
  const movie = netflixData.find((item) => item.show_id === +id)

  if (movie === undefined) {
    response.status(404).json(`This show (${id}) does not exist!`)
  }

  response.json(movie)
})

app.get('/shows/:id/cast', (request, response) => {
  const id = request.params.id
  const movieId = netflixData.find((item) => item.show_id === +id)

  if (movieId === undefined) {
    response.status(404).json(`This show (${id}) does not exist!`)
  }

  response.json(movieId.cast.split(", "))
})

app.get('/categories', (request, response) => {
  let category = [];

  netflixData.forEach((item) => {
    if (!category.includes(item.type)) {
      category.push(item.type)
    }
    else return
  })
 
  response.json(category)
})

app.get('/categories/:category', (request, response) => {
  const actor = request.query.cast //?cast=Yoon Kye-sang
  const releaseYear = request.query.year //?year=2019
  const country = request.query.country //?country=South Korea

  let filteredCategory = netflixData;

  const category = request.params.category
  filteredCategory = filteredCategory.filter((item) => item.type.toLowerCase() === category.toLowerCase())

  if (filteredCategory.length === 0) {
    response.status(404).json(`This category (${category}) does not exist!`)
    return
  }

  filteredCategory = filterMoviesOnYear(releaseYear, filteredCategory);
  filteredCategory = filterMoviesByCountry(country, filteredCategory);
  filteredCategory = filterMoviesByActor(actor, filteredCategory);

  response.json(mappedNetflix(filteredCategory))

})

app.use(function (req, res, next) {
  res.status(404).send(`Sorry can't find ${req.path}!`)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})






