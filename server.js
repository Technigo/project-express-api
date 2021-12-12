import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import booksData from './data/books.json'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

// Defining of routes starts here

app.get('/', (req, res) => {
  res.send(listEndpoints(app)) // All endpoints listed on start page '/'
})

app.get('/books', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < booksData.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }

  // Sorting books by title
  const { title } = req.params
  booksData.sort((a, b) => {
    let titleA = a.title.toLowerCase(),
      titleB = b.title.toLowerCase()

    if (titleA < titleB) {
      return -1
    }
    if (titleA > titleB) {
      return 1
    }
    return 0
  })

  results.results = booksData.slice(startIndex, endIndex)

  res.json(results)
})

app.get('/books/rating', (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  if (endIndex < booksData.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }

  // Sorting books by rating
  const { average_rating } = req.params
  const sortByRating = booksData.sort(
    (a, b) => b.average_rating - a.average_rating
  )

  results.results = sortByRating.slice(startIndex, endIndex)
  res.json(results)
})

app.get('/books/search', (req, res) => {
  const { title, authors, isbn } = req.query
  console.log(req.query)

  let filteredBooksData = booksData

  if (title) {
    filteredBooksData = filteredBooksData.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    )
  }

  if (authors) {
    filteredBooksData = filteredBooksData.filter(
      (item) => item.authors.toLowerCase().indexOf(authors.toLowerCase()) !== -1
    )
  }

  if (isbn) {
    filteredBooksData = filteredBooksData.filter(
      (item) => item.isbn.indexOf(isbn) !== -1
    )
  }

  res.json({
    response: filteredBooksData,
    success: true
  })
})

app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const bookIsbn = booksData.find((book) => book.isbn === +isbn)

  if (!bookIsbn) {
    res.status(404).send('No book with this ISBN was found.')
  } else {
    res.json(bookIsbn)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
