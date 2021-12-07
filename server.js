import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import topMusicData from './data/top-music.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
//

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('I have forked and installed npm')
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
  console.log(
    `Server running on http://localhost:${port} its working now right`
  )
})
