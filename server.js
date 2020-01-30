import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import topMusic from './data/top-music.json'

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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/top-music/', (req, res) => {
  res.send(topMusic)
})

app.get('/top-music/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send(topMusic.find(song => song.id === id))
})

app.get('/top-music/genre/:genre', (req, res) => {
  const genre = req.params.genre
  res.send(topMusic.filter(song => song.genre === genre))
})




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
