import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import books from './data/books.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining the routes
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Return all the books (objects) from the array in books.json
app.get('/books', (req, res) => {
  console.log(books)
  res.json(books)
})

// Return the first half of the books (objects) from the array in books.json
app.get('/books1', (req, res) => {
  console.log(books.slice(0, 251))
  res.json(books.slice(0, 251))
})

// Return the second half of books (objects) from the array in books.json
app.get('/books2', (req, res) => {
  console.log(books.slice(251, 500))
  res.json(books.slice(251, 500))
})

// Return an individual book (an object), using :id as a placeholder for the bookID number
app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const bookId = books.filter((item) => item.bookID === +id)
  res.json(bookId)
})

// Return all the books (objects) from the array in books.json sorted by average rating (from the highest to lowest)
app.get('/books/rating', (req, res) => {
  const booksByRating = books.sort((a, b) => -(parseFloat(a.average_rating)-parseFloat(b.average_rating)))
  res.json(booksByRating)
})

// Return all the books (objects) from the array in books.json sorted by number of pages (from highest to lowest)
app.get('/books/pages', (req, res) => {
  const booksByPages = books.sort((a, b) => -(parseFloat(a.num_pages)-parseFloat(b.num_pages)))
  res.json(booksByPages)
})

// Return the books with a specific language code, using :language as a placeholder for language code
app.get('/books/language/:language', (req, res) => {
  const language = req.params.language
  const booksByLanguage = books.filter((item) => item.language_code === language)
  res.json(booksByLanguage)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
