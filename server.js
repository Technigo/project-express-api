import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import netflixData from './data/netflix-titles.json'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8081
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//Return all the data
app.get('/movies', (req, res) => {
  res.json(netflixData)
})

//Return a single movie/tv-show
app.get('/movies/:title', (req, res) => {
  const { title } = req.params
  //const showWon = req.query.won
  //let nominationsFromYear = data.filter((item) => item.year_award === +year)

  //if (showWon) {
  // nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  //}
  //res.json(showId)
  const movieFound = netflixData.includes(title)
  res.send(movieFound)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
