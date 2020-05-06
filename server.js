import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import topMusicData from './data/top-music.json'

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
  res.send('Hello world, my first backend!')
})


// Show tops songs 
// Can filter on queries
app.get('/song', (req, res) => {
  const genre = req.query.genre
  const popularity = req.query.popularity

  let filteringMusic = topMusicData

  // Filter on genre
  if (genre) {
    filteringMusic = filteringMusic.filter(song => {
      const genreTitle = song.genre
      return genreTitle.includes(genre)
    }
  )}

  // Filter on popularity, high or low
  if (popularity) {
    if (popularity === 'high') {
      filteringMusic.sort((a, b) => b.popularity - a.popularity)
    } else if (popularity === 'low') {
      filteringMusic.sort((a, b) => a.popularity - b.popularity)
    }
  } 

  res.json(filteringMusic)
})

// Shows specific song with info
app.get('/song/:id', (req, res) => {
  const id = req.params.id

  let showSongs = topMusicData.filter((song) =>
    song.id === +id)

  res.json(showSongs)
})



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
