import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Endpoint that show all books:
app.get('/books', (req, res) => {
  res.json(booksData)
})

// Endpoint that shows all authors in alphabetic order:
app.get('/books/authors/:authors/', (req, res) => {
  const listAuthors = booksData.map((item) => item.authors).sort()
  res.json(listAuthors)
})

// Endpoint that shows books with specific rating:
app.get('/books/rating/:rating', (req, res) => {
  const { rating } = req.params.rating
  const avarageRating = booksData.filter((item) => item.avarage_rating === +rating)
  res.json(avarageRating)
})

// Endpoint that shows book with specific id (for ex: /books/id/45)
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const getBook = booksData.find((book) => book.bookID === +id)

  if (!getBook) {
    res.status(404).json('Not found')
  } else {
    res.json({ data: getBook })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
