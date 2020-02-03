import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import topMusic from './data/top-music.json'
import netflixTitles from './data/netflix-titles.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Added for Heroku to work
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
// To show the available end-points to the user
const listEndpoints = require('express-list-endpoints')

// Start defining your routes here
app.get('/', (req, res) => {
  // res.send('Hello world')
  res.send(listEndpoints(app))
})

app.get('/api', (req, res) => {
  
  res.send(listEndpoints(app))
})

app.get('/top-music/', (req, res) => {
  res.send(topMusic)
})

app.get('/top-music/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send(topMusic.find(song => song.id === id))
})

/** A nicer solution than this would be with query params (like netflix titles below) */
app.get('/top-music/by-genre/:genre', (req, res) => {
  const genre = req.params.genre
  res.send(topMusic.filter(song => song.genre === genre))
})


app.get('/netflix-titles/', (req, res) => {
  let results = []

  const actor = req.query.actor
  
  if (actor) {
    results = netflixTitles.filter(title => title.cast.indexOf(actor) !== -1)
  } else {
      results = netflixTitles
  }
  res.json(results)
})

app.get('/netflix-titles/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send(netflixTitles.find(title => title.show_id === id))
})





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
