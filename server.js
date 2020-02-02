import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import goldenGlobesData from './data/golden-globes.json'
import netflixData from './data/netflix-titles.json'

console.log(goldenGlobesData.length)
console.log(netflixData.length)

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import topMusicData from './data/top-music.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// {
//   "year_film": 2009,
//   "year_award": 2010,
//   "ceremony": 67,
//   "category": "Best Motion Picture - Drama",
//   "nominee": "Avatar",
//   "film": "",
//   "win": true
// },

// Golden Globes

app.get('/nominations', (req, res) => {
  res.json(goldenGlobesData)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  // const showWon = req.query.won
  let nominationsFromYear = goldenGlobesData.filter((item) => item.year_award === +year)

  // if (showWon) {
  //   nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  // }

  res.json(nominationsFromYear)
})

// {
//   "show_id": 81193313,
//   "title": "Chocolate",
//   "director": "",
//   "cast": "Ha Ji-won, Yoon Kye-sang, Jang Seung-jo, Kang Bu-ja, Lee Jae-ryong, Min Jin-woong, Kim Won-hae, Yoo Teo",
//   "country": "South Korea",
//   "date_added": "November 30, 2019",
//   "release_year": 2019,
//   "rating": "TV-14",
//   "duration": "1 Season",
//   "listed_in": "International TV Shows, Korean TV Shows, Romantic TV Shows",
//   "description": "Brought together by meaningful meals in the past and present, a doctor and a chef are reacquainted when they begin working at a hospice ward.",
//   "type": "TV Show"
// },

// Netflix - Titles

app.get('/movies', (req, res) => {
  res.json(netflixData)
})

app.get('/releaseyear/:year', (req, res) => {
  const year = req.params.year
  let releaseYear = netflixData.filter((item) => item.release_year === +year)

  res.json(releaseYear)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
