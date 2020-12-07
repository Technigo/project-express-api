import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import data from './data/christmas_billboard.json'

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
  res.send('Hello world')
})

// THIS END POINT WILL SHOW ALL THE DATA
app.get('/songs', (req, res) => {
  res.json(data.slice(0, 30))
})

// THIS ENDPOINT WILL SHOW DATA FROM SPECIFIC YEARS
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const showWon = req.query.win

  const songsFromYear = data.filter((item) => item.year === +year)
  
 // if (showWon) {
 //   nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  //}
  res.json(songsFromYear)
})

// THIS ENPOINT WILL ONLY SHOW DATA FROM THE TOP 10 SONGS
app.get('/songs/top-20', (req, res) => {
  const songsTopTen = data.filter((item) => item.week_position >= 1 && item.week_position <= 20)
  res.json(songsTopTen)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
