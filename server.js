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

// Endpoint to get all books
app.get('/books', (req, res) => {
  const { author } = req.query
  if (author) {
    const filteredBooks = booksData.filter(book => book.authors.includes(author))
    res.json(filteredBooks)
  }
  res.json(booksData)
})

// Endpoint to one book
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)
  if (!book) {
    res.status(404).send(`Sorry, no book with ID ${id} was found`)
  }
  res.json(book)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on my http://localhost:${port}`)
})
