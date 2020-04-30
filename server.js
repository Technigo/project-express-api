import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data/books.json'

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

// Route for array of all books
app.get('/', (req, res) => {
  res.json(data)
})

// Route for single book, filtered using book id
app.get('/book/:id', (req, res) => {
  const id = req.params.id
  const bookId = data.filter((item) => item.bookID === +id)
  res.json(bookId)
})

// Route for books based on min_pages. Accepting filter via query for max_pages, returning array of books between min and max no of pages
app.get('/min_pages/:pages', (req, res) => {
  const minPages = req.params.pages
  const maxPages = req.query.max_pages
  let numPages = data.filter((item) => item.num_pages >= +minPages)

  if (maxPages) {
    numPages = numPages.filter((item) => item.num_pages <= +maxPages)
  }

  res.json(numPages)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
