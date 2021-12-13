import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

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
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.json(topMusicData)
})

app.get('/music', (req, res) => {
  const { artist, genre } = req.query

  let musicToSend = topMusicData

  if (artist) {
    musicToSend = musicToSend.filter(
      (item) =>
        item.artistName.toLowerCase().indexOf(artist.toLowerCase()) !== -1
    )
  }

  if (genre) {
    musicToSend = topMusicData.filter(
      (item) => item.genre.toLowerCase().indexOf(genre.toLowerCase()) !== -1
    )
  }

  res.json(musicToSend)
})

app.get('/endpoints', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/music/id/:id', (req, res) => {
  const { id } = req.params

  const musicId = topMusicData.find((music) => music.id === +id)

  if (!musicId) {
    res.status(404).json('No music found with that id...')
  } else {
    res.status(200).json(musicId)
  }
})

app.get('/music/artists/:artist', (req, res) => {
  const { artist } = req.params

  const artistByName = topMusicData.find(
    (item) => item.artistName.toLowerCase() === artist.toLowerCase()
  )

  if (!artistByName) {
    res.status(404).json('No artists found with that name...')
  } else {
    res.status(200).json(artistByName)
  }
})

app.get('/music/track/:track', (req, res) => {
  const { track } = req.params

  const trackByName = topMusicData.find(
    (item) => item.trackName.toLowerCase() === track.toLowerCase()
  )

  if (!trackByName) {
    res.status(404).json('No tracks found with that name...')
  } else {
    res.status(200).json(trackByName)
  }
})

app.get('/music/genre/:genre', (req, res) => {
  const { genre } = req.params

  const genreByName = topMusicData.find((item) => item.genre === genre)

  if (!genreByName) {
    res.status(404).json('No genre found with that name...')
  } else {
    res.status(200).json(genreByName)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
