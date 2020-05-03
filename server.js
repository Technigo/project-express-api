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

// Add new GET route to get all books
app.get('/books', (req, res) => {
  res.json(booksData)
})

// Filter by ID
// How to handle if the ID doesnt exist?
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  let booksById = booksData.filter((item) => item.bookID === +id)
  res.json(booksById)
})

// Show average rating over x
app.get('/rating/:rank', (req, res) => {
  const rank = req.params.rank
  let booksByRating = booksData.filter((item) => item.average_rating >= rank)
  res.json(booksByRating)
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
