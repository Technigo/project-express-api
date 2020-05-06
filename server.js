import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const listEndpoints = require('express-list-endpoints')

// Start defining your routes here

// Root endpoint
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

// Route for array of all books with pagination as default
app.get('/books', (req, res) => {
  const { page, sort, author, title } = req.query
  let booksList = booksData

  // sort books by rating using query, returns sorted booksList
  if (sort === 'rating_dsc') {
    booksList = booksList.sort((a, b) => (b.average_rating - a.average_rating))
  } else if (sort === 'rating_asc') {
    booksList = booksList.sort((a, b) => (a.average_rating - b.average_rating))
  }

  // find books by author using query, returns filtered booksList
  if (author) {
    booksList = booksList.filter((item) => item.authors.toString().toLowerCase().includes(author.toLowerCase()))
  }

  // find books based on words in title using query, returns filtered booksList
  if (title) {
    booksList = booksList.filter((item) => item.title.toString().toLowerCase().includes(title.toLowerCase()))
  }

  // slice used for pagination
  const startIndex = 10 * (+page - 1) || 0
  const endIndex = startIndex + 10
  const booksListPaginated = booksList.slice(startIndex, endIndex)

  // 404 when there are no books in the list
  if (booksListPaginated.length === 0) {
    res.status(404).json({ error: 'No books found, please try a different query' })
  }

  res.json({ books: booksListPaginated })
})

// Route for single book, filtered using book id
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find((item) => item.bookID === +id)

  // 404 when there is no book with path id
  if (!book) {
    res.status(404).json({ error: 'There is no book with that id' })
  }

  res.json(book)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
