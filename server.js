import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import topMusicData from './data/top-music.json'

const port = process.env.PORT || 8080
const app = express()


// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello, welcome to an API about popular Spotify tracks.')
})

// Endpoint 1, all the data with 50 popular songs on Spotify 
app.get('/songs', (req, res) => {
  res.json(topMusicData)
})

// Endpoint 2, sorting the data on music genre
app.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre
  const songGenre = topMusicData.filter((item) => item.genre === genre)
  res.json(songGenre)
})

// Endpoint 3, showing only one song identified by id
app.get('/songs/:id', (req, res) => {
  const id = req.params.id
  const singleSong = topMusicData.find((song) => song.id === +id)
    res.json(singleSong)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
