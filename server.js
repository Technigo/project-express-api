import express, { request, response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

// Defines the port the app will run on. Defaults to 8080
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

//Endpoint to get all books
app.get('/books', (request, response) => {
  response.json(booksData)
})

//Endpoint to get one book
app.get('/books/:bookid', (request, response) => {
  const { bookid } = request.params
  const book = booksData.find(book => book.bookID === +bookid)
  if (!book) {
    response.status(404).send(`Sorry, book ${bookid} dosen't exist`)
  }
  response.json(book)
})

//Endpoint to get a specifik author/authors
app.get('/books/:author', (request, response) => {
  const { author } = request.params
  if (author) {
    const authorsList = booksData.filter(book => book.authors.includes(author))
    response.json(authorsList)
  }
  res.json(booksData)
})

// Start the server
app.listen(port, () => {
})
