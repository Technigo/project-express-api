/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8090
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here

// Endpoint to get all music
app.get('/music', (req, res) => {
  // get artist from query
  const { artist, title } = req.query
  let musicToSend = topMusicData

  if (artist) {
    musicToSend = musicToSend
      .filter((music) => music.artistName.toLowerCase().includes(artist.toLowerCase()))
  }

  if (title) {
    musicToSend = musicToSend
      .filter((music) => music.trackName.toString().toLowerCase().includes(title.toLowerCase()))
  }
  res.json({ length: musicToSend.length, data: musicToSend })
})

app.get('/music/:id', (req, res) => {
  // Use the id to find the music we want info from 
  // same id from music.id as from the id param in endpoint
  const { id } = req.params
  // eslint-disable-next-line no-shadow
  const music = topMusicData.find((item) => item.id === +id)
  if (music) {
    res.json(music)
  } else {
    res.status(404).send(`Song with id ${id} does not excist`)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})