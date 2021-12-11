import express from 'express'
import cors from 'cors'
import topMusicData from './data/top-music.json'
import { restart } from 'nodemon'
import listEndpoints from 'express-list-endpoints'


const port = process.env.PORT || 5000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())


// Start defining your routes here
app.get('/', (req, res) => {
  res.send(topMusicData)
})

app.get('/endpoints', (req,res) => {
  res.send(listEndpoints(app))
})

// app.get('/tracks', (req, res) => {
//   res.json(topMusicData)
// })


app.get('/tracks', (req, res) => {
  const { artistname, trackname, popularity } = req.query

  let topMusicDataToSend = topMusicData

  if (artistname) {
    topMusicDataToSend = topMusicDataToSend.filter(
      (item) => item.artistName.toLowerCase().indexOf(artistname.toLowerCase()) !== -1
      )
  }

  if (trackname) {
    topMusicDataToSend = topMusicDataToSend.filter(
      (item) => item.trackName.toLowerCase().indexOf(trackname.toLowerCase()) !== -1
      )
  }

  res.json ({
    response: topMusicDataToSend,
    success: true,
  })
})


app.get('/tracks/id/:id', (req, res) => {
const { id } = req.params
const songId = topMusicData.find(song => song.id === +id)

if (!songId) {
  res.status(404).send('Sorry, no track with that id')
} else {
 res.json(songId)
}
})


app.get('/tracks/genre/:genre', (req, res) => {
  const genre = req.params.genre
  console.log('test')
  const trackGenre = topMusicData.filter((item) => item.genre === genre)
  res.json(trackGenre)
})


app.get('/tracks/trackname/:trackname', (req, res) => {
  const { trackname } = req.params

  const trackName = topMusicData.find(item => item.trackName === trackname)

  if (!trackName) {
    res.status(404).json ({
      response: 'No track with that name',
      success: false,
    })
  } else {
    res.status(200).json({
      response: trackName,
      success: true,
    })
  }
})


app.get('/tracks/artistname/:artistname', (req, res) => {
  const { artistname } = req.params

  const artistName = topMusicData.find(item => item.artistName === artistname)

  if (!artistName) {
    res.status(404).json ({
      response: 'No artist with that name',
      success: false,
    })
  } else {
    res.status(200).json({
      response: artistName,
      success: true,
    })
  }
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
