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

// Returns the whole dataset, all songs
// Slice amount per page
// localhost:8080/songs
// localhost:8080/songs?page=1
app.get("/songs", (req, res) => {
  // ?? to specify a default value
  const page = req.query.page ?? 0

  // 10 is default value
  const pageSize = req.query.pageSize ?? 10

  // Calculate startIndex
  const startIndex = page * pageSize

  // Calculate endIndex, +pageSize makes it a number
  const endIndex = startIndex + +pageSize

  // Slice results
  const songsPerPage = topMusicData.slice(startIndex, endIndex)

  // Return 404 if no result
  if (songsPerPage === 0) {
    // Send 404 error to client  
    res.status(404).send({ error: "No results found" })

    // Do not continue to execute code in this endpoint
    return
  }

  // Returnobject with information and result
  const returnObject = {
    pageSize: pageSize,
    page: page,
    maxPages: parseInt(topMusicData.length / pageSize),
    reults: songsPerPage
  }
  res.send(returnObject)
})

// Returns a specific song id, returns an object. +id makes id a number data type
// localhost:8080/songid/4
app.get("/songid/:id", (req, res) => {
  const id = req.params.id
  const songFound = topMusicData.find(
    (song) => song.id === +id
  )
  res.send(songFound)
})

// Returns the artist name, returns an array, artist after the colon is a variable
// localhost:8080/artist/Shawn Mendes
app.get("/artist/:artist", (req, res) => {
  const artist = req.params.artist

  let artistName = topMusicData.filter((item) => item.artistName === artist)

  res.send(artistName)
})

// Returns the genre, returns an array, genre after the colon is a variable
// localhost:8080/genre/pop
app.get("/genre/:genre", (req, res) => {
  const genre = req.params.genre
  const showFeelGood = req.query.feelgood

  let songGenre = topMusicData.filter((song) => song.genre === genre)

  // Filter songs with valence over 70 
  // Returns songs with a hight feelgood value
  // localhost:8080/genre/pop?feelgood=true 
  if (showFeelGood) {
    songGenre = songGenre.filter((song) => song.valence >= 70)
  }
  res.send(songGenre)
})

// Returns the FeelGood tracks, returns an array
// localhost:8080/songs2?feelgood=true 
app.get("/songs2", (req, res) => {
  const feelgood = req.query.feelgood

  // Filter songs with valence over 70
  let feelGoodSongs = topMusicData

  if (feelgood === "true") {
    feelGoodSongs = topMusicData.filter((songs) => songs.valence >= 70)
  }
  res.send(feelGoodSongs)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
