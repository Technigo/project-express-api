import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// import goldenGlobesData from './data/golden-globes.json'


// If you're using one of our datasets, uncomment the appropriate import below
// to get started!

// import goldenGlobesData from './data/golden-globes.json'
// console.log(goldenGlobesData.length)

// import avocadoSalesData from './data/avocado-sales.json'
// import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
import topMusicData from './data/top-music.json'

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
  res.send('Hello world, my first backend!')
})


// Show tops songs 
// Can filter on genres included in query
app.get('/song', (req, res) => {
  const genre = req.query.genre

  let filteringMusic = topMusicData

  if (genre) {
    filteringMusic = filteringMusic.filter(song => {
      const genreTitle = song.genre
      return genreTitle.includes(genre)
    }
  )}
  res.json(filteringMusic)
})

// Shows specific song with info
app.get('/song/:id', (req, res) => {
  const id = req.params.id

  let showSongs = topMusicData.filter((song) =>
    song.id === +id)

  res.json(showSongs)
})


// app.get('/nominations', (req, res) => {
//   res.json(goldenGlobesData)
// })

// app.get('/year/:year', (req, res) => {
//   const year = req.params.year
//   const showWon = req.query.won
//   console.log(showWon)
//   let nominationsFromYear = goldenGlobesData.filter((item) => 
//   item.year_award === +year)

//   if (showWon) {
//     nominationsFromYear = nominationsFromYear.filter((item) =>
//     item.win)
// }

//   res.json(nominationsFromYear)
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
