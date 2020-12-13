import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import booksData from './data/books.json'

const ERROR_404 = 'ERROR: Could not find'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Welcome to my first API! ")
})

app.get('/books', (req, res) => {
  let filteredBooks = booksData
  const { title, minRating, maxRating } = req.query

  if (title) {
    filteredBooks = filteredBooks.filter((book) => {
      const bookTitle = `${book.title}`.toLowerCase()
      return bookTitle.includes(title.toLowerCase())
    })
  }
  if(minRating) {
    filteredBooks = filteredBooks.filter(book => book.average_rating >= minRating)
  }
  if(maxRating){
    filteredBooks = filteredBooks.filter(book => book.average_rating <= maxRating )
  }

  res.send(filteredBooks.slice(0, 30))
})

app.get('/books/page/:page', (req, res) => {
  const { page } = req.params
  // start = 0 on first page then add 30 books/page
  const start = page === 0 ? 0 : 1 + 30 * page
  const end = 30 * (page + 1)

  if (start > booksData.length) {
    res.status(404).json(ERROR_404)
  } else {
    res.send(booksData.slice(start, end))
  }
})

app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)

  if (!book) {
    res.status(404).json(ERROR_404)
  } else {
    res.json(book)
  }
})

app.get('/books/:title', (req, res) => {
  const { title } = req.params
  const filteredBooks = booksData.filter((book) => {
    const bookTitle = `${book.title}`.toLowerCase()
    return bookTitle.includes(title.toLowerCase())
  })
  if (filteredBooks.length === 0) {
    res.status(404).json(ERROR_404)
  } else {
    res.send(filteredBooks)
  }
})

app.get('/books/authors/:authors', (req, res) => {
  const { authors } = req.params
  const filteredBooks = booksData.filter((book) => {
    const bookAuthors = `${book.authors}`.toLowerCase()
    return bookAuthors.includes(authors.toLowerCase())
  })
  if (filteredBooks.length === 0) {
    res.status(404).json(ERROR_404)
  } else {
    res.send(filteredBooks)
  }
})

app.get('/books/rating/:rating', (req, res) => {
  const { rating } = req.params
  const averageRating = booksData.filter((book) => {
  })
  res.send(rating)
})





















app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
