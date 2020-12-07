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

// The entire array
app.get('/topmusicData', (req, res) => {
  res.json(topMusicData)
})

// The id 
app.get('/topMusicData/:id', (request, response) => {
  console.log(request.params)
  const id = request.params.id
  const topmusicID = topMusicData.find((item) => item.id === +id)
  response.json(topmusicID)
  console.log(`Found ${topmusicID}`)
})
//   const id = request.params.id;
//   const topmusicID = topMusicData.find((item) => item.id === id)
//   console.log(`Found ${topmusicID}`)
//   response.json(topmusicID)
// })
 
app.get('/topMusicData/:trackName', (request, response) => {
  // console.log(request.params)

  // const { trackName } = request.query;
  // const name = topMusicData.filter((item) => item.songname.toString().includes(trackName) === trackName)
  // response.json(name)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
