import express from 'express'
import cors from 'cors'

// Importing data from Books API
import booksData from './data/books.json'

// Defining the port the app will run on
const port = process.env.PORT || 8080
const app = express()

// Middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Routes

// Endpoint to get all books or filter by author
// http://localhost:8080/books
// http://localhost:8080/books?author=tolkien
app.get('/books', (req, res) => {
  const { author } = req.query
  if (author) {
    const booksByAuthor = booksData.filter(book => book.authors.toLowerCase().includes(author.toLowerCase()))
    res.json(booksByAuthor)
  }
  res.json(booksData)
})

// Endpoint to one book by ID
// http://localhost:8080/books/1
app.get('/books/:id', (req, res) => {
  const { id } = req.params
  const book = booksData.find(book => book.bookID === +id)
  if (!book) {
    res.status(404).send(`Sorry, no book with ID ${id} was found`)
  }
  res.json(book)
})

// Starting the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on my http://localhost:${port}`)
})
