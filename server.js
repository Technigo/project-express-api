

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// // If you're using one of our datasets, uncomment the appropriate import below
// // to get started!
// // 
// import goldenGlobesData from './data/golden-globes.json'

// // import avocadoSalesData from './data/avocado-sales.json'
// // import booksData from './data/books.json'
import netflixData from './data/netflix-titles.json'

console.log(netflixData.length)
// // import topMusicData from './data/top-music.json'

// // Defines the port the app will run on. Defaults to 8080, but can be 
// // overridden when starting the server. For example:
// //
// //   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// // Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// // Start defining your routes here
app.get('/', (req, res) => {
  res.send('')
})

app.get('/titles', (req, res) => {
  res.json(netflixData)
})

app.get('/titles/:id', (req, res) => {
  const id = req.params.id
  const titleId = netflixData.filter((item) => item.show_id === +id)
  res.json(titleId)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const releasesFromYear = netflixData.filter((item) => item.release_year === +year)
  res.json(releasesFromYear)
})

app.get('/type/:movie', (req, res) => {
  const isMovie = netflixData.filter((item) => item.type === 'Movie')
  res.json(isMovie)
})

app.get('/type/:tvshow', (req, res) => {
  const isTvShow = netflixData.filter((item) => item.type === 'TV Show')
  res.json(isTvShow)
})


// // Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})