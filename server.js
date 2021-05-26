import express from 'express'
import cors from 'cors'

import listEndpoints from 'express-list-endpoints'
import topMusicData from './data/top-music.json'

// The port the app will run on 
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/top-music', (req, res) => {
  res.json(topMusicData)
})

app.get('/top-music/:id', (req, res) => {
  const { id } = req.params
  const trackId = topMusicData.find(track => track.id === +id)

  if (trackId) {
    res.json({ data: trackId })   
  } else {
    res.status(404).json({ error: `Sorry, we didn't find a track with id ${id}` })
  }

  res.json(trackId)
})

app.get('/genre', (req, res) => {
  const trackGenres = []
  topMusicData.forEach(track => trackGenres.push(track.genre))

  let uniqueGenres = [...new Set(trackGenres)]

  res.json({ data: uniqueGenres })
})


app.get('/tracks', (req, res) => {
  const { artistName } = req.query
  const { trackName } = req.query
  
  let filteredTracks = topMusicData

  if (artistName) {
    filteredTracks = filteredTracks.filter(track => {
      const currentArtistName = track.artistName.toLowerCase()
      return currentArtistName.includes(artistName.toLowerCase())
    })
  }

  if (trackName) {
    filteredTracks = filteredTracks.filter(track => {
      const currentTrackName = track.trackName.toLowerCase()
      return currentTrackName.includes(trackName.toLowerCase())
    })
  }

  res.json({ data: filteredTracks })
})

app.get('/tracks/recommended', (req, res) => {
  res.json('Wanna listen to recommended tracks? Coming soon!')
})

app.get('/tracks/trending', (req, res) => {
  res.json("Wanna know the latest music trends? Hold on, we're working on it!" )
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
