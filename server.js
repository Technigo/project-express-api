import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// 
// import goldenGlobesData from './data/golden-globes.json'
// import avocadoSalesData from './data/avocado-sales.json'
import booksData from './data/books.json'
// import netflixData from './data/netflix-titles.json'
// import topMusicData from './data/top-music.json'

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

app.get('/books', (req, res) => {
  res.json(booksData)
})

app.get('/authors', (req, res) => {
  const authorsName = booksData.filter((book) => book.authors)
  res.json(authorsName)
})

app.get('/ratings', (req, res) => {
  const booksTopRated = booksData.filter((book) => book.average_rating >= 4.5)
  booksTopRated.sort(function (a, b) {
    return b.average_rating - a.average_rating
  })
  res.json(booksTopRated)
})

app.get('/pages', (req, res) => {
  const booksUnderHundredPages = booksData.filter((book) => book.num_pages <= 100)
  booksUnderHundredPages.sort(function (a, b) {
    return a.num_pages - b.num_pages
  })
  res.json(booksUnderHundredPages)
})


// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
