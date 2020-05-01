import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import booksData from './data/books.json'

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

// Root endpoint
app.get('/', (req, res) => {
  res.send(
    'Available book API endpoints: /books, /books/:id, /min_pages/:pages, /min_rating/:rating')
})

// Route for array of all books with pagination as default
app.get('/books', (req, res) => {
  let page = parseInt(req.query.page)
  const startIndex = 10 * (page - 1) || 0
  const endIndex = startIndex + 10
  const bookList = booksData.slice(startIndex, endIndex)

  res.json(bookList)

})

// Route for single book, filtered using book id
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const book = booksData.find((item) => item.bookID === +id)

  if (!book) {
    return res.status(404).json({ error: 'There is no book with that id' })
  }

  res.json(book)
})

// Route for books based on min_pages. Accepting filter via query for max_pages, returning array of books between min and max no of pages
app.get('/min_pages/:pages', (req, res) => {
  const minPages = req.params.pages
  const maxPages = req.query.max_pages
  let numPages = booksData.filter((item) => item.num_pages >= +minPages)

  if (maxPages) {
    numPages = numPages.filter((item) => item.num_pages <= +maxPages)
  }

  res.json(numPages)
})

// Same concept as route for pages but for rating
app.get('/min_rating/:rating', (req, res) => {
  const minRating = req.params.rating
  const maxRating = req.query.max_rating
  let bookRating = booksData.filter((item) => item.average_rating >= +minRating)

  if (maxRating) {
    bookRating = bookRating.filter((item) => item.average_rating <= +maxRating)
  }

  res.json(bookRating)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
