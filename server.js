import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'


const port = process.env.PORT || 8000
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/books', (request, response) => {
  const { author } = request.query
  if (author) {
    const filteredBooks = booksData.filter( book => book.authors.includes(author))
    response.json(filteredBooks)
  }

  response.json(booksData)
})

app.get('/books/:id', (request, response) => {
  const { id } = request.params
  const book = booksData.find( book => book.bookID === +id)
  if (!book) {
    response.status(404).send(`Sorry no book could be found with id number ${id}`)
  }
  response.json(book)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
