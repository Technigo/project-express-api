import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (request, response) => {
  response.send(`Hello, Welcome to Sandra's API for books`)
})

app.get('/books', (request, response) => {
  const { title, author } = request.query
  let filteredBooks = booksData
  if (title) {
    filteredBooks = filteredBooks.filter((book) => book.title.toString().includes(title))
  }
  if (author) {
    filteredBooks = filteredBooks.filter((book) => book.authors.includes(author))
  }
  response.json(filteredBooks)
})

app.get('/books/:id', (request, response) => {
  const { id } = request.params
  const book = booksData.find((book) => book.bookID === +id)
  if (book) {
    response.json(book)
  } else {
    response.status(404).send({
      message: 'This is an error!. No ID with that number!!!'
    })
  }
})

// Dummy endpoints
app.get('/authors/:authorName/books', (request, response) => {
  response.send()
})

app.get('/books/:id/authors', (request, response) => {
  response.send()
})

app.get('/books/language/:language', (request, response) => {
  response.send()
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
