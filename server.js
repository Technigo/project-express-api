import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Endpoints = /shows & /titles/title & year/year & cast/cast & genre/listed_in & country/country&type=Movie or TV Show')
})

app.get('/shows', (req, res) => {
  res.json(data)
})

app.get('/titles/:title', (req, res) => {
  const title = req.params.title

  let showTitle = data.filter((item) => item.title.toString().toLowerCase() === title.toLowerCase())
  if (showTitle.length > 0) {
    res.json(showTitle)
  } else {
    res.status(404).json({ message: `${title} not found` })
  }
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showsFromYear = data.filter((item) => item.release_year === +year)
  res.json(showsFromYear)
})

app.get('/cast/:cast', (req, res) => {
  const cast = req.params.cast
  const showsCast = data.filter((item) => item.cast.toLowerCase().includes(cast.toLowerCase()))
  res.json(showsCast)
})

app.get('/genre/:listed_in', (req, res) => {
  const genre = req.params.listed_in
  const showsGenre = data.filter((item) => item.listed_in.toLowerCase().includes(genre.toLowerCase()))
  res.json(showsGenre)
})

app.get('/country/:country', (req, res) => {
  const country = req.params.country
  const showType = req.query.type

  let netflixShowsFromCountry = data.filter((item) => item.country.toLowerCase() === country.toLowerCase())

  if (showType) {
    netflixShowsFromCountry = netflixShowsFromCountry.filter((item) => item.type.toLowerCase().replace(' ', '_') === showType.toLowerCase().replace(' ', '_'))
  }
  res.json(netflixShowsFromCountry)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})



