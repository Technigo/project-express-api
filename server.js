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

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (request /*Incoming*/, response /*Outgoing*/) => {
  //Any code we want
  //Database connections
  //Data lookups
  //Third third api request
  response.send('Good morning, have a wonderful day')
})

// All top music 
app.get('/topmusic', (req, res) => {
  res.json(topMusicData)
})

// All artists
app.get('/topmusic/artists', (request, response) => {
  response.json(topMusicData.map(item => item.artistName))
})

// All tracks
app.get('/topmusic/tracks', (request, response) => {
  response.json(topMusicData.map(item => item.trackName))
})

// Search by id 
app.get('/topMusicData/:id', (request, response) => {
  const id = request.params.id
  const topmusicID = topMusicData.find((item) => item.id === +id)
  response.json(topmusicID)

})

// Search by trackname
app.get('/tracks/:trackName', (request, response) => {
  // console.log(request.params)
    const trackName = request.params.trackName
    const songs = topMusicData.find((song) => song.trackName === trackName)
    response.json(songs)
    console.log(`Found ${JSON.stringify(songs)}`)
  })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
