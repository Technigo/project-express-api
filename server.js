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
/* console.log(topMusicData.length) */

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
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Get the whole dataset, all songs
// localhost:8080/songs
app.get("/songs", (req, res) => {
  res.send(topMusicData)
})

// Get a specific song id, returns an object. +id makes id a number data type
// localhost:8080/songid/4
app.get("/songid/:id", (req, res) => {
  const id = req.params.id
  const songFound = topMusicData.find(
    (song) => song.id === +id
  )
  res.send(songFound)
})

// Get the artist name, returns an array, artist after the colon is a variable
// localhost:8080/artist
app.get("/artist/:artist", (req, res) => {
  const artist = req.params.artist

  let artistName = topMusicData.filter((item) => item.artistName === artist)

  res.send(artistName)
})

// Get the genre, returns an array, genre after the colon is a variable
// localhost:8080/genre/pop
app.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre
  const showFeelGood = req.query.feelgood

  let songGenre = topMusicData.filter((song) => song.genre === genre)

  // Filter songs with valence over 70 
  // localhost:8080/genre/pop?feelgood=true WORKS!
  if (showFeelGood) {
    songGenre = songGenre.filter((song) => song.valence >= 70)
  }
  res.send(songGenre)
})

// Get the FeelGood tracks, returns an array, feelgood after the colon is a variable
app.get("/songs", (req, res) => {
  const feelgood = req.query.feelgood

  // Filter songs with valence over 70
  // localhost:8080/songs?feelgood=true DOES NOT WORK
  let feelGoodSongs = topMusicData.filter((songs) => songs.valence >= 70)

  res.send(feelGoodSongs)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
