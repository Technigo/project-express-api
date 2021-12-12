import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import listEndpoints from 'express-list-endpoints'

import topMusicData from './data/top-music.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// my routes
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.get('/top', (req, res) => {
  res.json(topMusicData)
})
app.get('/top/:id', (req, res) => {
  const { id } = req.params

  const trackId = topMusicData.find((trackName) => trackName.id === +id)

  if (!trackId) {
    res.status(404).send('No artist found')
  } else {
    res.json(trackId)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
})
