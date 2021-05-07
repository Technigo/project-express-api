import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import topMusicData from './data/top-music.json'

//   PORT=8080 npm start
const port = process.env.PORT || 8080
const app = express()

// returns only songs with danceability of 70 or higher
app.get('/danceable', (req, res) => {   
  const danceabilityList = topMusicData.filter((item) => item.danceability >= 70)
  res.json(danceabilityList)
})

// Endpoint to get all songs
app.get('/songs', (req, res) => {   
  res.json(topMusicData)
})

// endpoint to get all songs from a specific genre 
app.get('/genre/:genre', (req, res) => {
  const { genre } = req.params 
  const genreList = topMusicData.filter((item) => item.genre.toLowerCase() === genre.toLowerCase())
  if (genreList.length < 1) {
    res.status(404).send(`No genre suitable: ${genre}`)
  }
  res.json(genreList)
})

// Endpoint to get songs from specific artist
app.get('/artist/', (req, res) => {
  const { artistName } = req.query 
  if (artistName) {
    const artistList = topMusicData.filter((item) => item.artistName.toLowerCase().includes(artistName))
    res.json(artistList)
  }
  res.json(topMusicData)

})

// Endpoint to get one song
app.get('/song/:id', (req, res) => {   
  const { id } = req.params
  const title = topMusicData.find((song) => song.id === +id)
  if (!title) {
    res.status(404).send({error: `No songs with id number: ${id}`})
  }
  res.json(title)
})

// Shows all my routes
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start the server
app.listen(port, () => {})
