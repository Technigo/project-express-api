import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import netflixData from './data/netflix-titles.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


// Start defining your routes here

//_ is a placeholder for req 
app.get('/', (_, res) => {
  res.send(listEndpoints(app))
})

//Endpoint to get all the movies
app.get('/shows', (req, res) => {
  const { title, cast, country, director } = req.query

  //Filters so the user can search the items in the query
  if (title) {
    const filteredTitleList = netflixData.filter(show => show.title.toString().includes(title))
    res.json(filteredTitleList)
  } else if (cast) {
    const filteredCastList = netflixData.filter(show => show.cast.toString().includes(cast))
    res.json(filteredCastList)
  } else if (country) {
    const filteredCountryList = netflixData.filter(show => show.country.toString().includes(country))
    res.json(filteredCountryList)
  } else if (director) {
    const filteredDirectorList = netflixData.filter(show => show.director.toString().includes(director))
    res.json(filteredDirectorList)
  }
  res.json(netflixData)
})

//Endpoint to get only movies
app.get('/movies', (_, res) => {
  const typeMovies = netflixData.filter(show => show.type === "Movie")
  res.json(typeMovies)
})

//Endpoint to get only TV-shows
app.get('/tv-shows', (_, res) => {
  const typeTvShow = netflixData.filter(show => show.type === "TV Show")
  res.json(typeTvShow)
})

//Endpoint to get one title
app.get('/shows/title/:title', (req, res) => {
  const { title } = req.params
  const showTitle = netflixData.find(show => show.title === title)
  if (!showTitle) {
    res.status(404).send(`No show with the title ${title} exists`)
  }
  res.json(showTitle)
})

//Endpoint to get one movie by id
app.get('/shows/id/:id', (req, res) => {
  const { id } = req.params
  const show = netflixData.find(show => show.show_id === +id)
  if (!show) {
    res.status(404).send(`No show with id number ${id} exists`)
  }
  res.json(show)
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
