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

// route provides all endpoints
app.get('/endpoints', (req, res) => {
  res.json({
    response: listEndpoints(app),
    success: true
  })
})

// Endpoint for all books:
// search query title and author:
app.get('/books', (req, res) => {
  const { title, author } = req.query
  
  let books = booksData.sort((a, b) => a.bookID - b.bookID)

  if (title) {
    // checks if book title is a string (because some are not!)
    books = books.filter((book) => typeof book.title === "string")
    // checks for title
    books = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))
  }

  if (author) {
    // checks for author
    books = books.filter((book) => book.authors.toLowerCase().includes(author.toLowerCase()))
  }

  if (books.length === 0) {
    // displays 404 error message if author or title search has no results
    res.status(404).json('Not Found')
  } else {
    res.json(booksData)
  }
})

// Endpoint that shows all authors in alphabetic order:
app.get('/books/authors/:authors/', (req, res) => {
  const listAuthors = booksData.map((item) => item.authors).sort()
  res.json(listAuthors)
})

// Endpoint that shows book with specific id (for ex: /books/id/4)
app.get('/books/id/:id', (req, res) => {
  const { id } = req.params
  const getBook = booksData.find((book) => book.bookID === +id)

  if (!getBook) {
    res.status(404).json('Not found')
  } else {
    res.json({ data: getBook })
  }
})

// Endpoint that shows book with specific ISBN number:
app.get('/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params
  const filteredIsbn = booksData.find((item) => item.isbn === +isbn)

  if (!filteredIsbn) {
    res.status(404).send('Invalid ISBN, please try again!')
  } else {
    res.json({ data: filteredIsbn })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
