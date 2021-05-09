/* eslint-disable camelcase */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'


const port = process.env.PORT || 3000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.send('Hello world')
})

// All books or query by average rating
app.get('/api/book', (req, res) => {
  const { average_rating } = req.query
  const books = booksData.filter((book) => book.average_rating >= average_rating)
  return res.json(books).status(200)
})
// Book by ID
app.get('/api/book/:bookId', (req, res) => {
  const { bookId } = req.params
  const books = booksData.filter((item) => item.bookID.toString() === bookId)
  if (books.length === 1) {
    return res.send(books[0]).status(200)
  } else {
    return res.status(404).send({ error: `No book found for bookId: ${bookId}` })
  }
})

// Add a new book
app.post('/api/book', (req, res) => {
  const newBook = req.body
  booksData.push(newBook)
  return res.json(newBook).status(201)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
 