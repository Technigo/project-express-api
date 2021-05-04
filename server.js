import express, { request } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import topMusicData from './data/top-music.json'

//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// returns only songs with danceability of 70 or higher
app.get('/danceable', (req, res) => {   
  const danceabilityList = topMusicData.filter((item) => item.danceability >= 70)
  res.json(danceabilityList)
})

app.get('/songs', (req, res) => {   
  res.json(topMusicData)
})

// endpoint to get all songs from a specific genre 
app.get('/genre/:genre', (req, res) => {
  const genre = req.params.genre 
  const genreList = topMusicData.filter((item) => item.genre === genre)
  res.json(genreList)
})


// endpoint to get one movie
app.get('/song/:id', (req, res) => {  
  const { id } = req.params
  const title = topMusicData.find(title => title.id === +id)
  if (!title) {
    res.status(404).send(`No movies with id number: ${id}`)
  }
  res.json(title)
})

// Add middlewares to enable cors and json body parsing
//app.use(cors())
//app.use(bodyParser.json())

// Start defining your routes here
// app.get('/', (req, res) => {
//  res.send('Hello world')
// })

// Start the server
app.listen(port, () => {})
