/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import topMusicData from './data/top-music.json'

const port = process.env.PORT || 8090
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/music', (req, res) => {
  const { artist, title, genre, popularity } = req.query
  let musicToSend = topMusicData

  if (artist) {
    musicToSend = musicToSend
      .filter((music) => music.artistName.toLowerCase().includes(artist.toLowerCase()))
  }

  if (title) {
    musicToSend = musicToSend
      .filter((music) => music.trackName.toString().toLowerCase().includes(title.toLowerCase()))
  }

  if (genre) {
    musicToSend = musicToSend
      .filter((music) => music.genre.toLowerCase().includes(genre.toLowerCase()))
  }

  if (popularity) {
    musicToSend = musicToSend
      .filter((music) => music.popularity.toString().includes(popularity.toString()))
  }
  res.json({ length: musicToSend.length, data: musicToSend })
})

app.get('/music/:id', (req, res) => {
  const { id } = req.params
  // eslint-disable-next-line no-shadow
  const music = topMusicData.find((item) => item.id === +id)
  if (music) {
    res.json(music)
  } else {
    res.status(404).send(`Song with id ${id} does not excist`)
  }
})

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})